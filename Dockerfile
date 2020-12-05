FROM node:12-alpine

ENV PORT 1337
ENV HOST 0.0.0.0
ENV NODE_ENV production

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY strapi/package*.json /usr/src/app/
COPY strapi/yarn.lock /usr/src/app/
RUN yarn install

# Bundle app source
COPY strapi/ /usr/src/app

RUN yarn build
EXPOSE 1337

CMD [ "yarn", "start" ]