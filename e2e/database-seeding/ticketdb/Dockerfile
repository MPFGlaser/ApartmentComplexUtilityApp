FROM postgres:16-alpine

RUN addgroup -S nonroot \
  && adduser -S nonroot -G nonroot \
  && chown -R nonroot:nonroot /var/lib/postgresql/data


USER nonroot

COPY ticketdb-seed.sql /docker-entrypoint-initdb.d/
