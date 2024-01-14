#!/bin/bash

# Start all microservices
npx nx run-many --target=serve --all --exclude=acua &

# Wait for all microservices to start
npx wait-on http://localhost:3100/health
npx wait-on http://localhost:3200/health
npx wait-on http://localhost:3300/health

# Run e2e tests
npx nx e2e acua-e2e
