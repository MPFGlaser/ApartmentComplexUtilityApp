# ApartmentComplexUtilityApp

This repository will host the Apartment Complex Utility App, also known as ACUA.
It is a microservice-based application in which tenants can make repair requests, reserve amenities, set timers, and receive notifications. Building staff and building managers can, of course, manage these things.
The purpose of this project is to educate myself about enterprise-grade software, microservice architectures and all that comes with it, such as deployments to Kubernetes.

## Setup

Install all dependencies

```sh
npm ci
```

Set up the docker environment for development

```sh
docker-compose -f docker-compose-dev.yaml up
```

**For each app individually**

Some apps might have environment variables that have to be set up. Check each in the `/apps` directory for a `dotenv.example` file. If you find one, copy its contents to a `.env` file in the app's root directory and adjust to your liking.

## Running

To run an app in the monorepo, run the following command, substituted by the name of the app (as found in `/apps`

```sh
npx nx serve $app-name
```

Example:

```sh
npx nx serve auth-service
```
