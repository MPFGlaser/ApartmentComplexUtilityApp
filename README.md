# ApartmentComplexUtilityApp

This repository will host the Apartment Complex Utility App, also known as ACUA.
It is a microservice-based application in which tenants can make repair requests, reserve amenities, set timers, and receive notifications. Building staff and building managers can, of course, manage these things.
The purpose of this project is to educate myself about enterprise-grade software, microservice architectures and all that comes with it, such as deployments to Kubernetes.

## Pre-requisites

A Firebase project with the following services enabled:

- Authentication (with Identity Platform)

A gcloud project with the following APIs enabled:

<details>
<summary> APIs </summary>

- Compute Engine API
- Cloud Logging API
- Cloud Monitoring API
- Container File System API
- Kubernetes Engine API
- Cloud DNS API
- Identity Toolkit API
- Cloud Autoscaling API
- Cloud SQL Admin API
- IAM Service Account Credentials API
- Cloud Pub/Sub API
- Cloud Resource Manager API
- Token Service API
- Cloud AI Companion API
- App Engine Admin API
- Artifact Registry API
- Backup for GKE API
- BigQuery API
- BigQuery Migration API
- BigQuery Storage API
- Certificate Manager API
- Cloud Datastore API
- Cloud OS Login API
- Cloud Runtime Configuration API
- Cloud SQL
- Cloud Storage
- Cloud Storage API
- Cloud Testing API
- Cloud Trace API
- Container Registry API
- FCM Registration API
- Firebase App Distribution API
- Firebase Cloud Messaging API
- Firebase Dynamic Links API
- Firebase Hosting API
- Firebase Installations API
- Firebase Management API
- Firebase Remote Config API
- Firebase Remote Config Realtime API
- Firebase Rules API
- Global Edge Cache Service
- Google Cloud APIs
- Google Cloud Storage JSON API
- Identity and Access Management (IAM) API
- Mobile Crash Reporting API
- Network Connectivity API
- Network Services API
- Service Management API
- Service Usage API

</details>

A Google account that has the following roles on the gcloud project:

- Firebase Admin
- Firebase Authentication Admin
- Owner
- Service Account Token Creator

A gcloud service account with the following roles on the gcloud project:

- Cloud SQL Editor
- Firebase Admin
- Firebase Admin SDK Administrator Service Agent
- Firebase Authentication Admin
- Pub/Sub Publisher
- Pub/Sub Subscriber
- Pub/Sub Viewer
- Service Account Token Creator

## Setup

Install all dependencies

```sh
npm ci
```

Set up the docker environment for development

```sh
docker-compose -f docker-compose-dev.yaml up
```

Set up firebase cli (download and install from [here](https://firebase.google.com/docs/cli))

```sh
firebase init
```

Install and initialise the firebase emulator suite. You'll need 'Authentication' and 'Pub/Sub' enabled.

```sh
firebase init emulators
```

**For each app individually**

Some apps might have environment variables that have to be set up. Check each in the `/apps` directory for a `dotenv.example` file. If you find one, copy its contents to a `.env` file in the app's root directory and adjust to your liking.

## Running

To run an app in the monorepo, run the following command, substituted by the name of the app (as found in `/apps`)

```sh
npx nx serve $app-name
```

Example:

```sh
npx nx serve ticket-service
```

To run multiple apps at once, use:

```sh
nx run-many --target serve --maxParallel=100
```

The `--maxParallel` flag is used to override the default maximum of 3 apps. The `--exclude` flag can be used to exclude apps from the command.

To serve all apps at once, use:

```sh
nx run-many --target serve
```
