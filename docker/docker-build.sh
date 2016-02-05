#!/bin/bash
read -p "Type Docker Image Name: " dockerImage

echo "Creating $dockerImage image..."

docker build -t $dockerImage ../
