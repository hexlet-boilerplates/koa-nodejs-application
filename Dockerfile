FROM node:13.12

RUN apt-get install -yq libsqlite3-0
RUN npm install -g npm-check-updates

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]
