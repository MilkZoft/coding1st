#!/bin/bash
echo "Host Port:"
read hostPort

echo "Docker Image Name:"
read imageName

projectPath="$(dirname "$(pwd)")"
containerName="$imageName-container"

docker run --name $containerName -v $projectPath:/app -d -p $hostPort:3000 $imageName
