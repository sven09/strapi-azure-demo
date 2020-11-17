FROM node:12

WORKDIR /usr/src/app/adminconsole

COPY package*.json ./

RUN yarn install

EXPOSE 3000

CMD ["npm", "start"]