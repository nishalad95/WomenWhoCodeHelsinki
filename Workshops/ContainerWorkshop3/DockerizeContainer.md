# Part 9: 

- __Demo:__ Nodejs "To-Do" app

Now it's your turn!

Taking what you have learnt so far from the first workshops, your challenge is to dockerize the Nodejs app and successfully run it in a container.

Don't worry if you're not familiar with Nodejs, we're here to help!

- Start by cloning this repo to get access to the node app

```bash
git clone https://github.com/nishalad95/WHCHelsinkiWorkshop
```

- Change directory to the node app
```bash
cd WHCHelsinkiWorkshop/demo-node-todo
```

- Open the Dockerfile using vim (or an editor of your choice)
```bash
vim Dockerfile
```

- Press 'i' to go into insert mode to edit the file

- Save and quit the file when you're done by pressing the following:
```bash
ESC 
```
```bash
:wq + Enter
```

- Use the `docker build` and `docker run` commands to test if you have successfully containerized the app. You can tag your app by doing the following:

```bash
docker build -t demo_node_todo .
```

```bash
docker run demo_node_todo
```

<details><summary>ANSWER: how to run the app</summary>
<p>
  
```bash
$ docker run --rm  -p3000:3000 demo_node_todo
```

</p>
</details>


>_Debug: Is there anything missing?_

<details><summary>ANSWER: how to curl the todo app</summary>
<p>
  
```bash
$ curl --header "Content-Type: application/json" -X POST --data '{"learn":"docker"}' localhost:3000/todos
```

</p>
</details>

When you can successfully launch the container & POST "todos" to your app - congratulations!! You've successfully containerized an application. :-)

Now that we've got the container and verified it that it is ready to go in "production", let's go and publish the image of our container to Docker Registry, so you can now pull it from any machine and run it. This way, you can be sure that irrspective of the platform where you are going to run your container on, the application will behave exactly the same.

Let's list all the images that we currently have:

```bash
$ docker image ls
REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
demo_node_todo            latest              e95264bd14fd        7 hours ago         905MB
<none>                    <none>              f8952ed90443        8 hours ago         824MB
madalinapatrichi/catnip   latest              240a20634ffe        8 hours ago         700MB
busybox                   latest              64f5d945efcc        4 weeks ago         1.2MB
node                      10.15.3             5a401340b79f        4 weeks ago         899MB
hello-world               latest              fce289e99eb9        5 months ago        1.84kB
prakhar1989/catnip        latest              c984660fe008        10 months ago       700MB
python                    3-onbuild           292ed8dee366        11 months ago       691MB
ubuntu                    12.04               5b117edd0b76        2 years ago         104MB
prakhar1989/static-site   latest              f01030e1dcf3        3 years ago         134MB
```

Rename the image of your app container with the appropriate name so the docker cli knows where to the Docker Registry to push it to:

```docker tag demo_node_todo madalinapatrichi/myapp```

You can do another docker image list command to see the new image created. If you look closely at the `Image ID` field, you can see that the hash is the same. THis means that no extra memory has been used.

Now we can push the image to our own repo:

```docker push madalinapatrichi/myapp```

You can check out more docker commands in the docker cheat sheet: [Docker Cheatsheet](Dockercheatsheet.md)

Or continue to [Part 10](ContainerSummary.md)
