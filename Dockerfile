FROM ubuntu:latest

# Installing node.
RUN apt-get update
RUN apt-get install -y nodejs nodejs-legacy npm

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
