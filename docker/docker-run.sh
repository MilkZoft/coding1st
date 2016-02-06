#!/bin/bash
read -p "Host Port: " hostPort
read -p "Docker Image Name: " imageName

projectPath="$(dirname "$(pwd)")"

docker run -v $projectPath:/src -d -p $hostPort:3000 $imageName
