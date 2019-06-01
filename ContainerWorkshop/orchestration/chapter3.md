
### Kubernetes primitives

The basic building blocks of Kubernetes are objects, or so called Kubernetes primitives. In order to understand
more easily the architecture of Kubernetes and the demo, we're now going to talk about a few of these primitives.

## Pods

Pods, as in a pod of whales or a pea pod, are collections of containers with shared storage/network.

![alt text](pods.png)

Decoupling applications into multiple containers makes it easier to scale horizontally and reuse containers. For instance,
a web application stack might consist of three separate containers, each with its own unique image, to manage the web application,
database, and an in-memory cache in a decoupled manner.

The cool thing about Kubernetes is that you can put your app in one container and you can also have a second containerised application,
such as a database, which sits next to the other one in what is called a pod. Therefore, a pod is a group of containers and 
those containers see each other as localhost. You can have your app running by itself, nginx running by itself and they
will know about each other as if they were the same entity.

Applications within a Pod also have access to shared volumes, which are defined as part of a Pod and are made available to be mounted into each application’s filesystem.
In terms of Docker constructs, a Pod is modelled as a group of Docker containers with shared namespaces and shared filesystem volumes.

Pods are ephemeral entities, this means that if a pod dies, then all the information stored on it will be lost.
Each pod is assigned a uniqued ID, and is scheduled on a node, where it will stay until its termination or deletion. 
If a Node dies, the Pods scheduled to that node are scheduled for deletion, after a timeout period. A given Pod is not
“rescheduled” to a new node; instead, it can be replaced by an identical Pod,  with even the same name if desired, but with a new UID.

Each pod gets assigned an IP address, and the containers within it all share that IP address.

![alt text](pods_overview.png)

## Nodes

Nodes can be either virtual or physical machines, for example VMs, or your local machine. Each Node can have multiple
pods running on it. The pods are managed, and scheduled across the Nodes of a cluster by the Kubernetes master. 

Think of a node as a machine which has a specific set of resources you have assigned to it. Each node therefore has a capacity
measure which describes its resources: CPU, memory, and the number of pods that can be scheduled onto it.

We are going to go through a few demos soon where we'll be using minikube. Minikube allows us to create a Kubernetes
cluster on our machine which means it can only run a single node. A single node is not very useful, the purpose of
Kubernetes is to pool together multiple nodes to form a more powerful machine. In order to create a multi-node cluster, you will have
to sign-up for a cloud provider and use their Kubernetes service.

![alt text](nodes_overview.png)

A cluster contains multiple nodes, and designates a single node to be the master node. The Kubernetes master runs on this
node and is responsible for maintaining the desired state of the cluster. Whenever you deploy an application on Kubernetes,
you're actually telling the master to start the containers. When you interact with Kubernetes, such as by using kubectl
command-line interface, you're communicating with your cluster's Kubernetes master.

Every Kubernetes Node runs at least:
- Kubelet, a process responsible for communication between the Kubernetes Master and the Node; it manages the Pods and
the containers running on a machine.
- A container runtime (like Docker) responsible for pulling the container image from a registry, unpacking the container,
and running the application.

## Deployments

A deployment is similar to a recipe. As soon as you have your applications in containers, that is your ingredients, you
may now think of how to set them up. 

In order to create anything in Kubernetes you need to create a yaml file which contains your setup. This may look a bit
weird initially, but the only thing you need to provide is a file containing declarative statements.

Deployments provide declarative updates for Pods and ReplicaSets. You describe a desired state in a Deployment object.
The Kubernetes documentation provides the following example of a Deployment. It creates a ReplicaSet to bring up three nginx Pods:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```

A ReplicaSet’s purpose is to maintain a stable set of replica Pods running at any given time. As such, it is often used 
to guarantee the availability of a specified number of identical Pods.

In this config we have the replicas set to three, if there are ever not three replicas, because, for instance a pod fails,
or someone accidentally deletes one, Kubernetes steps in and brings it back up. We have also specified the name of the image
we're using, and the port to expose.

It's important to remember that a deployment will always update the container if there is any difference.

To create this Deployment you would run the following command:

```bash
kubectl apply -f https://k8s.io/examples/controllers/nginx-deployment.yaml
```
To see the deployment status run:
```bash
kubectl get deployments
```

## Service

Now that you've deployed your app, you need a way of exposing them.

The way to expose them classically is through a proxy, or a load-balancer, and that usually points
to your servers and you’re good to go. In Kubernetes, the way that that’s done is through something called a service.
A service is basically the analog of a load-balancer.

Kubernetes pods can be scaled in and out, and can die at any time if a node restarts or dies. This leads to a problem: 
if some set of Pods (let’s call them backends) provides functionality to other Pods (let’s call them frontends) inside 
the Kubernetes cluster, how do those frontends find out and keep track of which backends are in that set?

Kubernetes services are an abstraction which defines a logical set of Pods and a policy by which to access them - 
sometimes called a micro-service. As an example, consider an image-processing backend which is running with 3 replicas. 
Those replicas are fungible - frontends do not care which backend they use. While the actual Pods that compose the backend
set may change, the frontend clients should not need to be aware of that or keep track of the list of backends themselves.
The Service abstraction enables this decoupling.

A Service in Kubernetes is a REST object, similar to a Pod. Like all of the REST objects, a Service definition can be 
POSTed to the apiserver to create a new instance. For example, suppose you have a set of Pods that each expose port 9376 and carry a label "app=MyApp".

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 9376
```

This specification will create a new Service object named “my-service” which targets TCP port 9376 on any Pod with the "app=MyApp" label.
This Service will also be assigned an IP address (sometimes called the “cluster IP”).

There are different types of services, but we'll one talk about the LoadBalancer service.

Continue to [Chapter 4](chapter4.md)
