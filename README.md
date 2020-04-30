# Microservices​ ​with​ ​Node.js​ ​and​ ​Kubernetes​

Demonstrating a HTTP based microservices and API gateway with Kubernetes, Helm, Swagger, docker compose, nodemon, multi stage builds  - started from https://github.com/RisingStack/webinar-kubernetes-api-gateway

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
