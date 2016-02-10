# Ubuntu machine.
FROM ubuntu:latest

# Contact Support.
MAINTAINER Carlos Santana <carlos@milkzoft.com>

# Installing nodejs 5.X.
RUN apt-get update
RUN apt-get install -y build-essential curl && \
    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash - && \
    apt-get install -y nodejs && \
    apt-get install -y mysql-server && \
    mkdir -p /app && \
    mkdir -p /app/src && \
    mkdir -p /app/logs && \
    cd app

# Copying only package.json to avoid re-install modules when this file has changed.
COPY ./package.json app/

# Installing pm2 to restart node server every time a file has changed.
RUN npm install -g pm2

# Copying all the content to the /app folder inside docker image.
COPY . /app

# Selecting our workdir.
WORKDIR app/

# Dumping MySQL Database
VOLUME ["/etc/mysql", "/var/lib/mysql"]
RUN /app/docker/mysql/mysql-setup.sh

EXPOSE 3306

# Executing command npm start.
CMD ["pm2", "start", "pm2.json", "--no-daemon"]
