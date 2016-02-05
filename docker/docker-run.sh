#!/bin/bash
read -p "Project's path: " projectPath
read -p "Host Port: " hostPort
read -p "Docker Image Name: " imageName

docker run -v $projectPath:/src -d -p $hostPort:3000 $imageName
