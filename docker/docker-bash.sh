#!/bin/bash
echo "Type Docker Container:"
read dockerContainer

docker exec -it $dockerContainer bash
