# CI/CD

The CI/CD pipeline makes use of GitHub Actions. It has several steps, described below.

## pr-version-bump.yml

Checks each affected project for a change in the `vesion` file. If there is no change compared to the main branch, the check fails.

## cicd.yml

This workflow consists of two stages, CI and CD.

### CI

Checks formatting, lints and tests the project, then builds the docker images for the affected projects and pushes the images to the GitHub Container Registry.

### CD

Deploys the application to the Kubernetes cluster run on the GKE. It gets the correct credentials using the gcloud cli, setsd the secrets, then deploys the manifests.

## e2e.yml

Starts a docker-compose stack that runs the database, then runs the firebase emulator, which in turn starts the backend services and the frontend for testing. Afterwards, the testing report is uploaded as an artifact.
