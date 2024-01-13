FROM postgres:16-alpine

RUN addgroup -S nonroot \
  && adduser -S nonroot -G nonroot

USER nonroot

COPY ticketdb-seed.sql /docker-entrypoint-initdb.d/
