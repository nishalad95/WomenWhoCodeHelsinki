
## What is orchestration and what is this thing called Kubernetes?

“Kubernetes is an open-source system for automating deployment, scaling and management of containerised applications.”

![alt text](kube_logo.png)


The previous definition is vague and might initially be quite confusing. We are going to talk about Kubernetes in
terms of what it does and why it came to be in the first place. We will then use it and see how it can be useful
for ourselves. At the end of the orchestration section we will return to the definition to see if we can understand it further.


### What kinds of problems does Kubernetes try to solve?

Users expect your application to be always available. This can be really challenging in situations such as deploying apps 
or rolling out updates. In the past maintenance, upgrades, and security patches would cut into the uptime of the application.

Developers expect to be able to deploy updates to their code multiple times per day. That is perfectly normal, it’s 
our job. You wouldn’t want to implement a bunch of features and then not be able to deploy or test your code until an 
update patch.

Containerization packages software to help serve these goals, enabling applications to be released and updated easily,
quickly, and without downtime. Kubernetes helps you make sure those containerized application run when and where you want,
and helps them find the resources and tools they need to work. 

### How did Kubernetes come to be?

Let’s explore the trends that have given rise to containers, the need for container orchestration and how it’s created
the space for Kubernetes for dominance and growth.

The growth of technology into every aspect of our lives has placed an immense demand on software and software developers.
This pressure has spurred innovation and standardisation. Due to constantly growing customer demands, the way in which software
is developed and deployed into production has fundamentally changed.

As software systems become more complicated, this complication has driven software to be divided into smaller pieces such 
as microservices. These smaller pieces of software each need to be packaged, built, deployed, and accessed by other pieces 
of software around them to function as a whole. These small pieces of software can be deployed on demand in containers
in order to provide the same functionality as a monolithic service.

The need for container orchestration arose from the breakdown of monolithic services into smaller services. Kubernetes
allows us to run and coordinate these services across a cluster of machines.

The microservices architecture promotes the division of a service into a collection of sub-services. There are clear 
benefits in keeping logically distinct software modules separate. You can develop, deploy, scale, and maintain each sub-service
without affecting other parts of the system. However, a completely decoupled system doesn't exist, as its components need
to communicate with each other. For example, an online shop needs to access information from a database, handle user input,
and communicate with a billing system. Containers are used to encapsulate these distinct sub-services and Kubernetes allows
us to decide how these containers run and interact with each other.

### Kubernetes Adoption

Since container orchestration is a new domain, the technologies involved are still evolving. Because of its maturity,
Kubernetes has the backing of nearly every major cloud provider through the Cloud Native Computing Foundation, also known 
as the CNCF. 

CNCF is dedicated to making cloud native computing universal and sustainable. It focuses on setting the industry standards.
It is responsible for mediating the interaction between cloud platforms and Kubernetes. It was formed in 2015 to promote
containers and to foster an open-source community. Its founding members include Google, RedHat, Docker, and others.

![alt text](cncf.png)

Just as containerisation has changed how software is developed and packaged, container orchestration is changing how containers are
deployed and managed. Kubernetes evolved from Google's decade of experience with containers, and it was due to their 
internal need for autonomous container management that container orchestration came to be.

The success of Kubernetes can be partly attributed to its open source nature. The project has grown through the CNCF and 
the public community into what it is today. Kubernetes has gained the trust and commitment of its users largely by avoiding
vendor lock-in. This allows users to easily switch vendors while still enjoying the same service.

## Use Cases

Most companies are going to see fluctuations in the traffic they receive.

Imagine a pizza company that's open 24/7. The pizza restaurant is paying a flat rate for a fixed amount of traffic. 
One busy Sunday the whole country is staying home to watch a sports event, such as ice hockey, and everyone is trying to order pizza. 

As more people use their website, the slower it becomes, until it can't deal with any more requests. Customers get angry, leave bad reviews,
and the restaurant loses out on sales and reputation.

Instead of paying for a fixed amount of traffic, the pizza restaurant decides to use Kubernetes. As demand grows, they spin up
more containers to cope with the usage, and when demand drops the containers are spun down. They can now cope with variations
in traffic while only paying for the traffic they are experiencing.
 
Using Kubernetes also allows them to reduce the cost of their day to day service, as the number of sales is lower throughout 
the day compared to their lunch, and evening sales. 

If you're interested you can find real-life use cases of various companies here: https://kubernetes.io/case-studies/.

Continue to [Chapter 2](chapter2.md)
