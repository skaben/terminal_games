FROM node:10.15.3-alpine

WORKDIR /app

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

COPY ./vue/package.json \
     ./vue/.babelrc \
     ./vue/index.html \
     ./vue/webpack.config.js /app/

ENV HOST=0.0.0.0 \
    CHOKIDAR_USEPOLLING=true

RUN npm install --save-dev

EXPOSE 8080
