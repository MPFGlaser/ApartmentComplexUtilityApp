FROM node:lts-slim

WORKDIR /

COPY ./dist/apps/auth-service ./

RUN npm ci

# Install postgresql driver
RUN npm install --save pg pg-hstore

ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "main.js"]
