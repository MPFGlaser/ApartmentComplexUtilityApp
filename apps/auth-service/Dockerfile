FROM node:lts-slim

RUN addgroup -S nonroot \
  && adduser -S nonroot -G nonroot

USER nonroot

WORKDIR /

COPY ./dist/apps/auth-service ./

RUN npm ci --ignore-scripts

# Install postgresql driver
RUN npm install --save --ignore-scripts pg pg-hstore

ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "main.js"]
