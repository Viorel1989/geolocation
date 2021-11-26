FROM node:16-stretch-slim
RUN apt-get update && apt-get install -y dumb-init

WORKDIR /usr/geolocation

COPY --chown=node:node ./src ./src
COPY --chown=node:node ./.sequelizerc ./.sequelizerc
COPY --chown=node:node package*.json ./

RUN npm install -g nodemon
RUN npm install

EXPOSE 3000
USER node

CMD [ "dumb-init", "nodemon" ]
