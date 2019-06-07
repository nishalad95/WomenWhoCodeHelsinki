# Part 9: 

- __Demo:__ Nodejs "To-Do" app

Now it's your turn!

Taking what you have learnt so far from the first workshops, your challenge is to dockerize the Nodejs app and successfully run it in a container.

Don't worry if you're not familiar with Nodejs, we're here to help!

- Start by cloning this repo to get access to the node app

```bash
git clone git@github.com:nishalad95/WHCHelsinkiWorkshop.git
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
$ docker run --rm  -p3000:3000 node_todo
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

You can check out more docker commands in the docker cheat sheet: [Docker Cheatsheet](Dockercheatsheet.md)

Or continue to [Part 10](ContainerSummary.md)