FROM node:10.15.3-alpine

WORKDIR /app
COPY ./app /app
RUN npm install
RUN npm run build

EXPOSE 9000
