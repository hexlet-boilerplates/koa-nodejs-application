FROM node

RUN apt-get install -yq libsqlite3-0
WORKDIR /code
