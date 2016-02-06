# Ubuntu machine.
FROM ubuntu:latest

# Contact Support.
MAINTAINER Carlos Santana <carlos@milkzoft.com>

# Installing nodejs 5.X.
RUN apt-get update
RUN apt-get install -y build-essential curl
RUN curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
RUN apt-get install -y nodejs

RUN mkdir -p /app
RUN mkdir -p /app/src
RUN mkdir -p /app/logs

# Copying only package.json to avoid re-install modules when this file has changed.
COPY ./package.json app/

# Installing all NPM dependencies.
RUN cd app

# Installing pm2 to restart node server every time a file has changed.
RUN npm install -g pm2

# Copying all the content to the /app folder inside docker image.
COPY . /app

# Selecting our workdir.
WORKDIR app/

# Executing command npm start.
CMD ["pm2", "start", "pm2.json", "--no-daemon"]
