#!/bin/bash

# Start all microservices
nohup npx nx run-many --target=serve --all --exclude=acua &

# Wait for all microservices to start
npx wait-on http://localhost:3100/health && printf "location-service is healthy\n"
npx wait-on http://localhost:3200/health && printf "ticket-service is healthy\n"
npx wait-on http://localhost:3300/health && printf "user-service is healthy\n"

# Run e2e tests
npx nx e2e acua-e2e

# Stop all microservices
pkill -f "run-many --target=serve --all --exclude=acua" || true

# Wait until all instances of the command are killed
while pgrep -f "npx nx run-many --target=serve --all --exclude=acua" > /dev/null; do sleep 1; done
