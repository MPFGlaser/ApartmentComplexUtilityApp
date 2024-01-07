FROM node:lts-alpine

WORKDIR /

COPY ./dist/apps/ticket-service ./

RUN npm ci --ignore-scripts

# Install postgresql driver
RUN npm install --save --ignore-scripts pg pg-hstore

USER node

ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "main.js"]
