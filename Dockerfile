FROM node:10.15.3-alpine

WORKDIR /app
COPY ./app/package.json /app
RUN npm install --save-dev

EXPOSE 9000
