FROM node:12.2.0-alpine

WORKDIR /usr/app

COPY package*.json index.js .env ./

RUN npm install

COPY ./serverside ./serverside

EXPOSE 8181
CMD [ "node", "index.js" ]