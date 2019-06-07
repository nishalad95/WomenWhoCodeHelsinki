# Part 17: Deploying containers using YAML files

In this tutorial we'll be using a tool called curl. cURL is a command line tool for sending and getting data, it supports various
data transfer protocols. It's kind of like a browser, but on the command line.

#### Step 1: Create a deployment
We're going to use a similar deployment yaml to the one we looked at in chapter 3. 
Copy the following deployment into a yaml file and name it deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 1
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

To create the deployment write the following command:

```bash
$ kubectl create -f deployment.yaml
deployment.apps/nginx-deployment created
```

You can then check the status of the deployment:

```bash
$ kubectl get deployment
NAME                READY      UP-TO-DATE       AVAILABLE     AGE
nginx-deployment    1/1        1                1             2m  
```

#### Step 2: Create a NodePort Service

The Service selects all applications with the label nginx. As multiple replicas, or instances, are deployed, they will be automatically load balanced based on this
common label. The Service makes the application available via a NodePort.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-svc
  labels:
    app: nginx
spec:
  type: NodePort
  ports:
  - port: 80
    nodePort: 30080
  selector:
    app: nginx
```

All Kubernetes objects are deployed in a consistent way using kubectl. We are now going to create the service, and check its creation status.

```bash
$ kubectl create -f service.yaml
$ kubectl get service nginx-svc
``` 

You can then get to the nginx container by curling localhost on the NodePort. This should print out the nginx welcome page.
```bash
$ curl localhost:300080
```

#### Step 3: Update a Deployment file

We are going to increase the number of replicas to 3 and redeploy the deployment. Change the number of replicas, save the file and type the following:

```bash
$ kubectl apply -f deployment.yaml
```

Another two pods will be scheduled:

```bash
$ kubectl get pods
NAME                                READY      STATUS   RESTARTS    AGE
nginx-deployment-76BF496DF-bqqvn    1/1        Running  0           30s  
nginx-deployment-76BF496DF-dbhzq    1/1        Running  0           4m  
nginx-deployment-76BF496DF-ntsgr    1/1        Running  0           30s  

```

All the pods have the same selector, that is all of them are matched by the "nginx" label. Therefore, you can curl any of them
and any of the containers may be the one processing your request:

```bash
$ curl localhost:300080
```

Continue to [Part 7](KubernetesSummary.md)
