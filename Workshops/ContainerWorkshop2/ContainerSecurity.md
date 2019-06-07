# Part 8: Docker Tips, Troubleshooting, Container Security

## Useful tips

This page gives you some extra tips and aspects to consider when using containers more frequently as well as when containers are integrated and used with other services.

* Other useful commands
* Configuring `docker ps` output
* Cleaning up
* Starting up a container
* Shutting down a container
* Health checks

### Other useful commands:

Here are some stock commands that everyone should know when using Docker:

For example docker load is useful when restoring a container from a backup, and running docker history will show you the effect that each command has on the overall size of the file.

| Command                               | Description                                   |
| :-------------------------------------|:----------------------------------------------|
| docker pull python:2.7                | Pull image from DockerHub                     | 
| docker images                         | Shows all images                              | 
| docker rmi python:2.7                 | Remove an image                               | 
| docker ps                             | Shows all containers                          | 
| docker build -t <image_name>          | Create your own image                         | 
| docker logs -f <container_name>       | Check the logs of container                   | 
| docker load -i <CONTAINER_FILE>.tar   | Restoring docker container                    | 
| docker rm $(docker ps –a -q)          | Deletes all containers but fails on the ones running | 
| docker history [OPTIONS] IMAGE        | Shows the effect of each command on overall size of file |  



### Configure docker ps Output:

One common mistake that a lot of people do when first starting out with docker is that when they run `docker ps` to view all containers (or you can `docker container ls`) everything is automatically outputted on the terminal and so if you have been running many containers with long commands all this output, including important information about the process, goes off the end of the screen.

The default output of `docker ps` looks like:

```
$ docker ps

CONTAINER ID		IMAGE		COMMAND			……
247wh3jddee0		nginx		“nginx –g daemon”	……
```

The output takes up too much room! This can get annoying!

However you can fix it! If you put in the `–format` flag you can put in a template such that you can control what `docker ps` outputs!

Take a look at the code below:

```
$ docker ps --format \
	“table {{.Names}}\\t{{.Image}}\\t{{.Status}}”

NAMES			IMAGE		STATUS
web			nginx		Up 20 minutes
```

Here I’ve stated that in the output I want 3 fields, the `NAMES` field, the `IMAGE` field and `STATUS` field. When I run this it all fits onto the screen.

Now of course you don’t want to be writing `–format` every time you type `docker ps`. Another alternative to speed this up even further is to create an alias for this command in the docker config file. Your docker executeable will have its own config file located at `~/.docker/config.json`.

You can open up this config file and create an alias for this template, I’ve called mine `psFormat`:

```
$ cat ~/.docker/config.json
{……
	“psFormat”: “table {{.Names}}\\t{{.Image}}\\t{{.Status}}”
}
```

Now you can execute `docker ps --format psFormat` and see the same output! And the cool thing is you can have as many alias' as you want!

### Cleaning up:

Sometimes when you execute `docker images` to view what images you have, you might see you’ve got these `<none>` tags that look strange. This happens when you update a tag, as the reference tag to that image is no longer pointing there and it no longer has a name associated to that image, but instead is pointing to another image.

These images are known as 'dangling' images and one thing we can do is to get rid of these unwanted images. 

One way to do this is to execute `docker rm <imageID>` to remove unwanted images. But you can quickly see that this is quite a lengthy process especially when you have the find the docker image ID for many dangling images.

A quicker way to do this is to run `docker image prune`, but before executing this command ensure that you are not deleting any wanted images. You can also see how much space is freed up by cleaning up dangling images.

```
$ docker image prune
WARNING! This will remove all dangling images
Are you sure you want to continue? [y/N] y
Deleted images:
deleted:
23j2j3kmcerkeddne09eea3goed232nfks..
……
Total reclaimed space: 3GB
```

A similar process can be done to cleaning up dangling and stopped containers. `docker container prune` is much quicker than `docker rm <container_name>`, especially when you have many stopped containers. Before executing this command you must ensure that you are not deleting any wanted containers.

```
$ docker container prune
WARNING! This will remove all stopped containers
Are you sure you want to continue? [y/N] y
Deleted Containers:
deleted:
23j2j3kmcerkeddne09eea3goed232nfks..
……
Total reclaimed space: 300MB

```

### Starting up a container:

When starting up containers, it is good practice that each container starts up independently. One container should not have to depend on another to start up.

Quite often your application may be dependent on another service, like a database for example. But if your application container comes up and your database isn’t up and running, you don’t want your container to crash. The expected behaviour you want is to have your container wait for the database and that way it won’t matter the order in which the containers come up in. 

It is good practice to write this in your application code or start up script; to ensure that the container will back off and wait for any dependencies to be up and running. This may require additional code to poll against the dependency.

### Shutting down a container:

At the other end of spectrum when you want to stop a container using the `docker stop` command, The Docker daemon will send a `SIGTERM` signal to the container. If the container does not respond to that `SIGTERM` within 10s, Docker will then hard kill that container with a `SIGKILL`.

Now that’s bad. You really want your container to respond to the `SIGTERM` as your application then gets a chance to tidy up after itself and perform a clean shutdown. Your application will be able to close any network connections securely, any open sockets, write data to a database successfully, output to a log successfully etc. 

A clean shutdown of your container is really important and essentially means your application needs to receive signals properly. In order to implement clean shutdown, one tool you can use is called `tini` which is a nice utility and takes care of forwarding signals to shell processes. To access `tini` click [here](https://github.com/krallin/tini).

### Health Checks:

Docker also provides tools to assist with the entire lifecycle of your application. Health checks are really useful and they are used by docker to automatically check the health status of a container environment.

Have a look at this Dockerfile showing a really simple nginx container:

```
FROM nginx

RUN apt-get update && apt-get install –y curl
HEALTHCHECK --interval=10s –timeout=3s \
	CMD curl –f http://localhost/ || exit 1

```

This says that everyone 10 seconds run the `curl` command to check that the webpage running on localhost will return a http status code: `200 OK`, meaning that everything is running as normal, but if the webpage doesn't retern a 200 status code then return a `1`.

Once you start your container you can see the health status in the output, run a `docker ps` to the see the output. Some of the fields you may see include:

```bash
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS                   PORTS                    NAMES
9f89662fc56a        howchoo/docker-flask   "python app.py"          2 minutes ago       Up 2 minutes (healthy)   0.0.0.0:5555->5000/tcp   docker-flask

```

Notice under __STATUS__, the status is Up with (healthy) next to it. The health status appears only when a health check is configured.

One other useful way to access the health is through scripts and listen on the Docker event API. If you see your container marked as unhealthy, then you can stop traffic going to that container.

#### Basic Example:

You'll need 2 shells for this:

Shell 1: Listening for events:
```bash
$ docker events
```

Shell 2: Start and Stop containers:
```bash
$ docker create --name test alpine:latest top
$ docker start test
$ docker stop test
```

Shell 1: (Again .. now showing events):
```bash
2019-01-05T00:35:58.859401177+08:00 container create 0fdb48addc82871eb34eb23a847cfd033dedd1a0a37bef2e6d9eb3870fc7ff37 (image=alpine:latest, name=test)
2019-01-05T00:36:04.703631903+08:00 network connect e2e1f5ceda09d4300f3a846f0acfaa9a8bb0d89e775eb744c5acecd60e0529e2 (container=0fdb...ff37, name=bridge, type=bridge)
2019-01-05T00:36:04.795031609+08:00 container start 0fdb...ff37 (image=alpine:latest, name=test)
2019-01-05T00:36:09.830268747+08:00 container kill 0fdb...ff37 (image=alpine:latest, name=test, signal=15)
2019-01-05T00:36:09.840186338+08:00 container die 0fdb...ff37 (exitCode=143, image=alpine:latest, name=test)
2019-01-05T00:36:09.880113663+08:00 network disconnect e2e...29e2 (container=0fdb...ff37, name=bridge, type=bridge)
2019-01-05T00:36:09.890214053+08:00 container stop 0fdb...ff37 (image=alpine:latest, name=test)
```

To exit the `docker events` command, use `CTRL+C`.

You can also filter events by time and event criteria. For more information on the Docker events API click [here](https://docs.docker.com/engine/reference/commandline/events/).

### Statistics:

TODO: docker logs

## Container Security:

`docker exec`

TODO: add in helpful links to docker docs and other sites

### Layers

Each container is an image with a readable/writeable layer on top of a bunch of read-only layers. These layers (also called intermediate images) are generated when the commands in the Dockerfile are executed during the Docker image build.

Layers are neat because they can be re-used by multiple images saving disk space and reducing time to build images while maintaining their integrity. You can also cache certain layers in order to make subsequent builds faster.

![alt text](../../InstructorNotes/Images/dockerfile_layers.png)

Continue to [Part 9](../ContainerWorkshop3/DockerizeContainer.md)