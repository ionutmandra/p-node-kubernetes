# Microservices​ ​with​ ​Node.js​ ​and​ ​Kubernetes​

Demonstrating a HTTP based microservices and API gateway with Kubernetes, Helm, Swagger, docker compose, nodemon, multi stage builds  - started from https://github.com/RisingStack/webinar-kubernetes-api-gateway

## Docker
```
# compose start stop
  docker-compose up -d
  docker-compose down
  docker-compose restart
# find api-gateway pod
  docker ps |  grep api-gateway
  docker ps -f name=api-ga
# inspect 
  docker image inspect
# inspect container files
  docker exec -t -i 96f49c308ca3 ls
# layers
  docker history 39f9d4fa32d7 || size
  https://github.com/wagoodman/dive
# logs
  docker logs [containerid]
# remove images
  docker images -f dangling=true
  docker system prune -a
  docker rmi -f img
```
