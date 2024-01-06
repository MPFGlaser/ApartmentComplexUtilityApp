#!/bin/bash

# Set directory to the location of this script
cd "$(dirname "$0")"

kubectl apply -f ./namespace.yaml \
-f ./service-account.yaml \
-f ./ingress.yaml \
-f ./acua.yaml \
-f ./location-service.yaml \
