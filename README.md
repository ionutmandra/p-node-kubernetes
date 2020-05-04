# Microservices​ ​with​ ​Node.js​ ​and​ ​Kubernetes​

Demonstrating a HTTP based microservices and API gateway with Kubernetes, Helm, Swagger, docker compose, nodemon, multi stage builds  - started from https://github.com/RisingStack/webinar-kubernetes-api-gateway

## Local development

Nodemon + docker compose + volume bind mounts -> containers use controllers api code from outside container -> live changes

## Logging
### Disk location for logs, when using docker for desktop on Mac:
Assume container id = 09e3cc062441 (either started with Docker Compose either K8s deployment)

To find location on disk for the log file do `docker inspect -f {{.LogPath}} 09e3cc062441` -> /var/lib/docker/containers/09e..7b9/09e..e27b9-json.log

As containers are run in a vm (Docker desktop), do a full screen into the vm: `screen ~/Library/Containers/com.docker.docker/Data/vms/0/tty`

Now, look at you log file `cat ../var/lib/docker/containers/09e...7b9/09e...e27b9-json.log`
  
## Production images TODO

Multi stage build -> smaller production image


## Docker
```
docker compose
  docker-compose up -d
  docker-compose down
  docker-compose build
docker info
  docker root dir
  linux vm C:\Users\Public\Documents\Hyper-V\Virtual Hard Disks\MobyLinuxVM.vhdx
containers
  build
    docker run -p 3000:3000 -d im-awsecsnode1
    docker build -t im-awsecsnode1 .
    docker push
  explore container file system
    docker exec -t -i e35d050ddc07 ls
  filter
    docker ps -f name=api-ga
    docker ps |  grep api-gateway
  logs
    docker logs [containerid]
  stop
    docker stop [CONTAINER ID] //it's container id not image
  view only running containers
    docker ps
  view all containers
    docker ps -a
images
  inspect
    docker image inspect
  layers size
    docker history 39f9d4fa32d7 || size
  list
    docker image ls
  remove unused 
    docker images -f dangling=true
    docker system prune -a
    docker rmi -f img
  tag
    docker tag mvccoreecs:latest 198909063343.dkr.ecr.us-east-1.amazonaws.com/mywebmvc 
    docker tag reverseproxy:latest 198909063343.dkr.ecr.us-east-1.amazonaws.com/reverseproxy:latest
```

## Kubernetes
```
general
  Users/username/.docker/.kube
  cheatshhet https://kubernetes.io/docs/reference/kubectl/cheatsheet/
api
  kubectl api-versions
  list object types
      In a namespace
          kubectl api-resources --namespaced=true
      Not in a namespace
          kubectl api-resources --namespaced=false 
cluster
  kubectl config get-contexts #get clusters
  kubectl config current-context
  kubectl config use-context docker-for-desktop
  kubectl cluster-info
dashboard 
  installs a pod into a new ns kubernetes-dashboard
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta1/aio/deploy/recommended.yaml
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
    kubectl proxy
      starts dashboard + (http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/.)
    kubectl get secrets                                  # get for 1 namespace
    kubectl get secrets                 -n kubernetes-dashboard #get for specific
    kubectl describe secret secret1     -n kubernetes-dashboard # use token to login to dashboard
logs 
  kubectl logs POD_NAME
nodes
  kubectl get nodes
  kubectl get node --field-selector=metadata.name=docker-desktop -o json | jq .items[].metadata.name
  kubectl describe node <insert-node-name-here>
namespaces    
  kubectl get ns
  kubectl get pods --namespace=<insert-namespace-name-here> //perop
  kubectl config set-context --current --namespace=<insert-namespace-name-here> //set namespace once
  kubectl get pods --namespace=<insert-namespace-name-here>    // set namespace each time   
  kubectl create namespace 
pods
  kubectl get pods --all-namespaces
  kubectl describe pods
  kubectl get pods --all-namespaces -o jsonpath="{..image}" |\
          tr -s '[[:space:]]' '\n' |\
          sort |\
          uniq -c
  kubectl get pod compose-api-57ff65b8c7-2m565 --namespace=docker
  field selectors
      kubectl get pods --field-selector status.phase=Running
  label filter (LIST and WATCH)
      kubectl get pods -l environment=production,tier=frontend
  start bash in container. Opens console like we were in container. Exit with exit
      kubectl exec -ti $POD_NAME bash   
  env var print
      kubectl exec my-nginx-3800858182-e9ihh -- printenv | grep SERVICE
      kubectl exec $POD_NAME env   
  others
      kubectl exec -it api-gateway-77785f69b5-5qs4b sh
      kubectl exec api-gateway-77785f69b5-5qs4b curl 10.98.65.114/healthz  
secrets   
  kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')
  kubectl -n kube-system describe secret //list all secretes
services  
  expose a  new service. can access it with curl localhost:portFromExpose
      kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080 
  restart
      step1 kubectl scale deployment api-gateway --replicas=0; 
      step2 kubectl scale deployment api-gateway --replicas=2;
quotas
  kubectl describe quota
replica sets
  kubectl get rs
create users roles
  kubectl create -f xxx.yaml
Watch
  kubectl get pods --watch
```

## TODOS:
- JAEGER tracing
- K8s bind mounts for local dev
- Multistage build
- Service Mesh
- GRPC
- Cloud deploy
- Automated tests
