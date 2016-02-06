#!/bin/bash
read -p "Host Port: " hostPort
read -p "Docker Image Name: " imageName

projectPath="$(dirname "$(pwd)")"
containerName="$imageName-container"

docker run --name $containerName -v $projectPath:/app -d -p $hostPort:3000 $imageName
