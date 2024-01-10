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
- Cloud Autoscaling API
- Cloud SQL Admin API
- Identity Toolkit API
- IAM Service Account Credentials API
- Token Service API
- Cloud Resource Manager API
- App Engine Admin API
- Artifact Registry API
- Backup for GKE API
- BigQuery API
- BigQuery Migration API
- BigQuery Storage API
- Certificate Manager API
- Cloud AI Companion API
- Cloud Datastore API
- Cloud OS Login API
- Cloud Pub/Sub API
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

- Owner

A gcloud service account with the following roles on the gcloud project:

- Cloud SQL Editor
- Firebase Admin SDK Administrator Service Agent
- Firebase Authentication Admin
- Pub/Sub Publisher
- Pub/Sub Subscriber
- Pub/Sub Viewer

## Setup

Install all dependencies

```sh
npm ci
```

Set up the docker environment for development

```sh
docker-compose -f docker-compose-dev.yaml up
```

Set up gcloud cli (download and install from [here](https://cloud.google.com/sdk/docs/install))

```sh
gcloud auth login
```

Set the project

```sh
gcloud config set project mpfg-acua
```

Set up the Application Default Credentials

```sh
gcloud auth application-default login
```

Set the quota project

```sh
gcloud auth application-default set-quota-project mpfg-acua
```

Follow the steps [here](https://firebase.google.com/docs/admin/setup#testing_with_gcloud_end_user_credentials) to set up an OAuth 2.0 client ID for the Firebase Admin SDK, since it doesn't support end user credentials. \
Download the key, name it `oauth2.0-client.key.json` and place it in the root directory of the project.

Set the impersonated service account

```sh
gcloud auth application-default login --client-id-file=./oauth2.0-client.key.json
```

Start the gcloud pubsub emulator

```sh
gcloud beta emulators pubsub start --project=mpfg-acua-dev
```

Set up the gcloud pubsub emulator environment variables. Run this in the terminal you wish to use to run the project, or alternatively, add it to your `.bashrc` or `.zshrc` file.

```sh
$(gcloud beta emulators pubsub env-init)
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
npx nx serve auth-service
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
