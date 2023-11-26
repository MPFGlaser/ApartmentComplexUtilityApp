#!/bin/bash

# Install yq if it is not already installed
if ! command -v yq &> /dev/null; then
    echo "yq could not be found, installing..."
    pip3 install yq
fi

# Print the usage message
usage() {
    echo "Usage: $0 <registry> <appname> [extra tag]"
    echo "Example: $0 registry.example.com my-app stable"
    exit 1
}

# Set the registry, app name, and extra tag
registry=$1
appname=$2
extratag=$3

# Set path to app and Chart.yaml
path="./apps/$appname"
chartpath="./helm/$appname/Chart.yaml"

# Check if the registry and app name were provided
if [ "$registry" == "" ]; then
    echo "Error: Registry URL is required"
    usage
    exit 1
fi

if [ "$appname" == "" ]; then
    echo "Error: App name is required"
    usage
    exit 1
fi

# Read the version from the Chart.yaml file
version=$(yq -r '.appVersion' "$chartpath")

# Example: registry.example.com/my-app
imagename="$registry/$appname"

# Build the Docker image
docker build -t "$imagename:${version}" -f "$path/Dockerfile" .

# Tag the Docker image
docker tag "$imagename:${version}" "$imagename:latest"

if [ "$extratag" != "" ]; then
    docker tag "$imagename:${version}" "$imagename:${version}-${extratag}"
    docker tag "$imagename:${version}" "$imagename:${extratag}"
fi

# Push the Docker image
docker push --all-tags "$imagename"
