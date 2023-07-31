FROM node:16
RUN apt-get install -y

WORKDIR /usr/geolocation

COPY --chown=node:node ./src ./src
COPY --chown=node:node ./.sequelizerc ./.sequelizerc
COPY --chown=node:node package*.json ./

RUN npm install -g nodemon
RUN npm install

EXPOSE 3000
USER node

CMD [ "npm", "run", "startDev" ]
