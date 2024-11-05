
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install react-cookie
RUN npm install

COPY . .

RUN npm run build

FROM alpine:3.12

RUN apk add --no-cache bash

WORKDIR /app

COPY --from=build /app/build /app

CMD ["tail", "-f", "/dev/null"]
