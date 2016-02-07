#!/bin/bash
echo "Type Docker Image Name:"
read dockerImage
echo "Creating $dockerImage image..."

docker build -t $dockerImage ../
