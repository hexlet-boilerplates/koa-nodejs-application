FROM node:13.12

RUN apt-get update && apt-get install -yq make

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

CMD ["bash", "-c", "make db-setup && npm start"]
