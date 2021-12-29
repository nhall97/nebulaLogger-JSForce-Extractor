FROM node:8.12.0-alpine AS base

WORKDIR /services/etl-express-server

FROM base AS dependencies

# We only copy the dependencies we need
#COPY packages/package1 packages/package1
#COPY packages/package3 packages/package3

COPY . .

# The global package.json only contains build dependencies
#COPY package.json .

EXPOSE 3000

RUN npm install 

CMD npm start