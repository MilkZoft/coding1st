#!/bin/bash
echo "Removing all Docker Containers & Images"

docker rm -f $(docker ps -a -q)
docker rmi -f $(docker images -q)
