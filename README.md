# WHCHelsinkiWorkshop

Welcome to the WHC Finland Container Workshop! 

#### The Growth of the tech industry:
The growth of technology into every aspect of our lives and days has created an immense demand on software, the companies and organisations that sell and deliver software based products, & the use of software in their businesses. This pressure has spurred innovation and standardisation. The needs and stakes are so high, it has fundamentally changed how software is developed and deployed into production.

#### Microservices:
As software systems become more complicated, this complication has driven software to be divided into smaller pieces, known as microservices. These smaller pieces of software each need to be packaged, built, deployed and accessed by other pieces of software around them to function as a total system. They can be deployed into containers that allow them to run on the same machine virtual or real, but making it appear to the software that it is the only process running.

![alt text](/InstructorNotes/Images/microservices-vs-monolithic.jpg)

##

![alt text](/InstructorNotes/Images/Microservice-Architecture.png)

#### Containers:
Typically, interesting and useful software depends on other software around it to do its job. There are definite benefits in keeping logically distinct software separate from each other. You can develop, deploy, scale and maintain each small piece without too much fuss between the other parts of the system, when it’s not all on the same module. However, at some point, different parts of the application likely need to communicate with each other to do something interesting. For example, an API may need to communicate with business logic it needs, in turn to access information in the database. Containers themselves keep logically distinct pieces of software separate, so they can be built, deployed, maintained, managed and scaled on their own.

#### Docker:
It is currently safe to say that Docker is the dominant leader in both technology and an adoption in containers. While others exist in the space, their dominance is so great, when you mention containers, it is almost synonymous with Docker. Other players exist in niche application however some movement around standardisation is occurring. Although it is only at the beginning, the Dockerfile standard is essentially today’s standard. And the DockerHub repository has defined a dominant way of hosting versions of a container between developers.

![alt text](/InstructorNotes/Images/Docker3.png)

### Container Orchestration

So what happens if you have a whole bunch of containers running different applications across a distributed network and you want to create and deploy more of them. Docker ican be scaled up at production and this can be done by a process known as 'Container Orchestration'. The De Facto standard for container orchestration is Kubernetes.

Kubernetes is a container cluster management system, used for deploying a large number of containers across a distributed network. It was designed by Google to be an Open Source tool and is very DevOps focused, so it’s good for agile development methodologies. (We will learn more about Kubernetes later!)

![alt text](/InstructorNotes/Images/kubernetes.png)


#### Let's get started!
If you look at the Docker community, one of the reasons why it's had such success over the six years is that the community is so active and willing to share knowledge. Just like today, with all of you attending this workshop! With that in mind, over the next few hours, we're going to do our bit to share knowledge on containers.

Throughout this workshop we're going to take you through Docker containers, the architecture behind how they work and how fit into the computing stack, we'll also take you through some hands-on tutorials and introduce you to container orchestration at the end!

There are a mixture of commands and theory within this workshop, so you can follow along and don't forget to ask your instructors for help!


 ### Agenda:

* Container Theory
    * Container Architecture
    * Why are containers useful?
    * Terminology
    * Docker Security & troubleshooting

* Container Workshops:
    * Hello World with Busybox
    * Static sites & Dockerizing web app
    * Building a more complex Dockerfile

* Orchestration Workshop:
    * Intro to Kubernetes
    * Minikube example

Click [here](https://github.com/nishalad95/WHCHelsinkiWorkshop/blob/master/Workshops/ContainerWorkshop1/ContainerTheoryPart1.md) to begin!