FROM node:10

RUN apt-get install -yq libsqlite3-0
WORKDIR /code
