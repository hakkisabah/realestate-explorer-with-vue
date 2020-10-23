FROM node:12.2.0-alpine

WORKDIR /app

COPY package*.json wdio.local.conf.js wdio.sauce.conf.js wdio.shared.conf.js babel.config.js .env ./

RUN npm install

COPY ./public ./public
COPY ./src ./src
COPY ./tests ./tests

EXPOSE 8080

