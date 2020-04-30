# sh path..
#!/usr/bin/env bash

# Builds and pushes Docker images to DockerHub

TAG=$1
TAG=${TAG:-"v3"}

cd ../services/api-gateway
docker build -t p-node-kubernetes_api-gateway:$TAG .
# docker push p-node-kubernetes_api-gateway

cd ../user-api
docker build -t p-node-kubernetes_user-api:$TAG .
# docker push risingstack/webinar-ms-user-api

# sh docker-push.sh
# docker-compose up -d
# docker-compose down
# docker ps |  grep api-gateway
# docker exec -t -i 96f49c308ca3 ls
# helm install api-gateway --generate-name
#
#
#
#
#
#
#
