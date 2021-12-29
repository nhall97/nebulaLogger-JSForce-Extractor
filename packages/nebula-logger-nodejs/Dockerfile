FROM node:8.12.0-alpine AS base

WORKDIR /packges/nebula-logger-nodejs

FROM base AS dependencies

COPY . .

EXPOSE 3000

RUN npm install