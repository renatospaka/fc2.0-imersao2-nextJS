FROM node:15.5.0-alpine3.12

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app
