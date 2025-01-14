# Part 4: Launching a Kubernetes Cluster with minikube


Minikube allows you to try out Kubernetes on your local machine. It spins up a VM in which it runs a single-node Kubernetes cluster.
You can find more details about it here: https://github.com/kubernetes/minikube

#### Step1: Launch Minikube
First of all let's make sure minikube is installed, we can verify that by getting the version:

```bash
$ minikube version
```

To get a cluster running you simply have to type:
```bash
$ minikube start
```

You can choose to assign resources to the VM, and you may specify the version of Kubernetes to use. By default minikube
will assign 2GB of memory to the VM. 
```bash
$ minikube start --memory=400 --kubernetes-version=v.14.0
```

You can now interact with the cluster by using the Kubernetes CLI tool called kubectl:
First thing you can do is look at the node you have created:
```bash
$ kubectl get nodes
NAME        STATUS      ROLES       AGE     VERSION
minikube    Ready       master      2m      v.14.0
```

#### Step 2: Deploy nginx
As there's only one node running in the cluster, the node will also be the master node. We can now deploy a container to the Kubernetes cluster from the CLI:
```bash
$ kubectl run nginx-deployment --image=nginx --port=80
```

To check the status of the deployment use the following command:
```bash
$ kubectl describe deployment nginx-deployment
NAME                READY      UP-TO-DATE       AVAILABLE     AGE
nginx-deployment    1/1        1                1             2m          
```

TIP: The "get" verb can be used to list the status of resources: 
```bash
$ kubectl get services
$ kubectl get all
```

You can also check the status of the deployment by verifying if the pods have been started:
```bash
$ kubectl get pods
NAME                                 READY      STATUS       RESTARTS     AGE
nginx-deployment-668774d484-zkbzc    1/1        Running      0            3m40s  
```

#### Step 3: Deploy a service

To enable the NGINX Ingress controller, run the following command:

```minikube addons enable ingress```

Now that the container is running we need a way of accessing it. We can use the NodePort service which is going to open
a port to the container:
```bash
$ kubectl expose deployment nginx-deployment --port=80 --type=NodePort
```

You should be able to curl the container:

```bash
$ curl localhost
```
TIP: Use **kubectl describe <object_type> <object_name>** to get a thorough description of an object.

Continue to [Part 5](../OrchestrationWorkshop3/KubernetesArchitecture.md)
