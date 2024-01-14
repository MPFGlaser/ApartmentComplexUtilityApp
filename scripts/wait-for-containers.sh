for i in {1..30}; do
  locationdb_health=$(docker compose -f ./e2e/docker-compose.yaml ps --format json locationdb | grep -q '"Health":"healthy"' && echo true || echo false)
  ticketdb_health=$(docker compose -f ./e2e/docker-compose.yaml ps --format json ticketdb | grep -q '"Health":"healthy"' && echo true || echo false)

  if [ "$locationdb_health" = "true" ] && [ "$ticketdb_health" = "true" ]; then
    break
  fi

  sleep 10
done

# Fail the workflow if both containers are not healthy after retries
if [ "$locationdb_health" != "true" ] || [ "$ticketdb_health" != "true" ]; then
  exit 1
fi
