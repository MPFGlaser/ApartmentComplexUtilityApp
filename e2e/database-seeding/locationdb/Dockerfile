FROM postgres:16-alpine

RUN addgroup -S nonroot \
  && adduser -S nonroot -G nonroot

USER nonroot

COPY locationdb-seed.sql /docker-entrypoint-initdb.d/
