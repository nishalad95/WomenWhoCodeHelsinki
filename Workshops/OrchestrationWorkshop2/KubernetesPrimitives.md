# Part 15: Kubernetes primitives

The basic building blocks of Kubernetes are objects, or so-called Kubernetes primitives. We're going to talk about a 
few of these primitives now in order to understand the architecture of Kubernetes and the demo more easily.

#### Pods

Pods, as in a pod of whales or a pea pod, are collections of containers with shared storage/network.

![alt text](../../InstructorNotes/Images/pods.png)

Decoupling applications into multiple containers makes it easier to scale horizontally and reuse containers. For instance,
a web application stack might consist of three separate containers, each with its own unique image, to manage the web application,
database, and an in-memory cache in a decoupled manner.

The cool thing about Kubernetes is that you can separate your application into multiple containers but have them act as 
if they are sharing the same filesystem. A collection of containers used in this way is a pod.
Pods, and the containers within them, all share an IP address assigned to them. Two apps running independently in a pod
will know about each other as if they were the same entity.

Applications within a Pod also have access to shared volumes, which are defined as part of a Pod and are made available 
to be mounted into each application’s filesystem.
The following is an example from the Kubernetes documentation of two containers with a shared Volume called shared_data.


```yaml
apiVersion: v1
kind: Pod
metadata:
  name: two-containers
spec:

  restartPolicy: Never

  volumes:
  - name: shared-data
    emptyDir: {}

  containers:

  - name: nginx-container
    image: nginx
    volumeMounts:
    - name: shared-data
      mountPath: /usr/share/nginx/html

  - name: debian-container
    image: debian
    volumeMounts:
    - name: shared-data
      mountPath: /pod-data
    command: ["/bin/sh"]
    args: ["-c", "echo Hello from the debian container > /pod-data/index.html"]
```

In terms of Docker constructs, a Pod is modelled as a group of Docker containers with shared namespaces and shared filesystem volumes.

Pods are ephemeral entities, this means that if a pod dies, then all the information stored on it will be lost.
Each pod is assigned a unique ID and is scheduled on a node, where it will stay until its termination or deletion. 
If a Node dies, the Pods originally scheduled to that node are instead scheduled for deletion after a timeout period. A given Pod is not
“rescheduled” to a new node; instead, it can be replaced by an identical Pod, optionally with the same name, but with a new UID.


![alt text](../../InstructorNotes/Images/pods_overview.png)

#### Nodes

Nodes can be either virtual or physical machines. Each Node can have multiple
pods running on it. The pods are managed, and scheduled across the Nodes of a cluster by the Kubernetes master. 

![alt text](../../InstructorNotes/Images/nodes_overview.png)

Think of a node as a machine which has a specific set of resources you have assigned to it. Each node then has a capacity
measure which describes its resources: CPU, memory, and the number of pods that can be scheduled onto it.

We are going to go through a few demos soon where we will use minikube. Minikube allows us to create a Kubernetes
cluster on our machine. Because of this we will only be able to run a single node, which is not very useful by itself, 
but when pooled with other nodes using Kubernetes forms a more powerful machine. In order to create a multi-node cluster, 
you would have to sign-up for a cloud provider and use their Kubernetes service.

A cluster contains multiple nodes, with one node designated as the master node. The Kubernetes master runs on this
node and is responsible for maintaining the desired state of the cluster. Whenever you deploy an application on Kubernetes,
you're actually telling the master to start the containers. When you interact with Kubernetes, such as by using kubectl
command-line interface, you're communicating with your cluster's Kubernetes master.

Every Kubernetes Node runs:
- Kubelet, a process responsible for communication between the Kubernetes Master and the Node; it manages the Pods and
the containers running on a machine.
- A container runtime (like Docker) responsible for pulling the container image from a registry, unpacking the container,
and running the application.

#### Deployments

A deployment is similar to a recipe, where the applications running in containers are the ingredients, and the instructions
are contained in a yaml file.

In order to create anything in Kubernetes you need to write a yaml file containing your setup. This may initially look strange,
but the only thing you need to provide is a file containing declarative statements about your objects.

Deployments provide declarative updates for Pods and ReplicaSets. The yaml file describes a desired state in a Deployment object.
The Kubernetes documentation provides the following example of a Deployment. In it a ReplicaSet is created to bring up three
nginx Pods.

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

In this config we have the replica count set to three. If ever there are fewer than three replicas, for instance because of pod failure,
or if someone accidentally deletes one, Kubernetes steps in and brings it back up. We have also specified the name of the image
we're using (nginx:1.7.9), and the port to expose the containers on (containerPort: 80).

It's important to remember that a deployment will always update the container if there is any difference between the desired state
and the actual state of the Pod.

#### Service

Now that you've deployed your app, you need a way of making it accessible from the outside world.

Typically, an app would be exposed via a proxy or load-balancer which then points to your servers.
In Kubernetes, however, you can use services, which are basically the Kubernetes' analog of a load-balancer. When your
service is setup you're good to go.

Kubernetes pods can be scaled up and down, and can die at any time if a node restarts or dies. This leads to a problem:
suppose you have two sets of pods - frontend and backend pods. Somehow, one set of pods needs to keep track of the other
pods.

Kubernetes services are an abstraction which defines a logical set of Pods and a policy by which to access them.
 
For example, consider an image-processing backend which is running with 3 replicas. 
Those replicas are replaceable - frontend pods do not care which backend pods they communicate with. While the actual Pods that compose the backend
set may change, the frontend clients should not need to be aware of the backend pods themselves.
The Service abstraction enables this decoupling.

A Service in Kubernetes is a REST object, similar to a Pod. Like all of the REST objects, a Service definition can be 
POSTed to the apiserver to create a new instance. For example, suppose you have a set of Pods that each expose port 9376 and carry a label "app=myPizzaApp".

```yaml
apiVersion: v1
kind: Service
metadata:
  name: pizza-service
spec:
  selector:
    app: myPizzaApp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 9376
```

This specification will create a new Service object called “pizza-service” which targets TCP port 9376 on any Pod with the "app=myPizzaApp" label.
This Service will also be assigned an IP address, sometimes called the “cluster IP”. Therefore you can now access any
of the Pods with the "myPizzaApp" label on the service's IP address and port 80.

There are three main Services:

- ClusterIP - exposes the service within the cluster IP space, this means that the service will only be reachable from the cluster.

- NodePort - exposes the service on each Node's IP at a static port. It automatically creates a ClusterIP service, to which 
the NodePort service will route. You can then contact the NodePort service, from outside the cluster at `NodeIP:NodePort`.

- Load Balancer - exposes the service to the outside world. It can be created by using a cloud provider's load balancer. 
  NodePort and ClusterIP, will automatically be created.


Continue to [Part 4](Minikube.md)
