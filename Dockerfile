# Ubuntu machine
FROM ubuntu:latest

# Contact Support
MAINTAINER Carlos Santana <carlos@milkzoft.com>

# Installing node.
RUN apt-get update
RUN apt-get install -y build-essential curl
RUN curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
RUN apt-get install -y nodejs

# Copying only package.json to avoid re-install modules when this file has changed.
COPY ./package.json src/

# Installing all NPM dependencies.
RUN cd src && npm install

# Installing hotnode to restart node server every time a file has changed.
RUN npm install -g hotnode

# Copying all the content to the /src folder inside docker image.
COPY . /src

# Selecting our workdir.
WORKDIR src/

# Executing command npm start.
CMD ["npm", "start"]
