#!/bin/bash

check_docker_health() {
  local name=$1
  # local health=$(docker inspect --format='{{.State.Health.Status}}' $name)
  local health=$(docker compose -f ./e2e/docker-compose.yaml ps --format json $name | grep -q '"Health":"healthy"' && echo true || echo false)

  if [[ $health == 'true' ]]; then
    return 0
  else
    return 1
  fi
}

wait_for_docker() {
  local name=$1
  local retry_seconds=5
  local max_retries=60

  for ((i=1;i<=max_retries;i++)); do
    if check_docker_health $name; then
      echo "$name is healthy"
      return 0
    else
      echo "Waiting for $name to be healthy ($i/$max_retries)"
      sleep $retry_seconds
    fi
  done

  echo "Failed to wait for $name to be healthy"
  return 1
}

wait_for_docker locationdb
wait_for_docker ticketdb
