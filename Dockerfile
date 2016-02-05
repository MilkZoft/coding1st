FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y nodejs nodejs-legacy npm
RUN apt-get clean

COPY ./package.json src/

RUN cd src && npm install

COPY . /src

WORKDIR src/

RUN npm install -g hotnode

CMD ["npm", "start"]