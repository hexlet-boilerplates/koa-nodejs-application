FROM node:8.7

RUN apt-get install -yq libsqlite3-0
WORKDIR /code
