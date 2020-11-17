FROM node:12

WORKDIR /usr/src/app/web

COPY package*.json ./

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]