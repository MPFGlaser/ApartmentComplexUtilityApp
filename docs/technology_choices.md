# Technology Choices (& Justfications)

## Frontend

### React

I chose to use React as a frontend for this project because it is easy to work with, has lots of community support, and is very popular. I have used React in the past, and I have found it to be a very good framework for building user interfaces. Another reason for choosing React is because I already have some experience with it, and I wanted to focus on building a good backend for this project.

## Backend

### Node.js + Express

I wanted to learn more about Node.js/TypeScript development this semester, so choosing Node.js as the runtime for my project was an easy choice. I chose Express as the web framework for my project because it is very popular, and I have used it in the past. I also wanted to learn more about Express, so this project was a good opportunity to do so. <br>
Express also has the advantage of being lightweight, which is a plus considering I will have to write many different services for this project.

### PostgreSQL

Considering most, if not all of my data will be relational, I chose to go with PostgreSQL. I already have some experience with it, so getting things up and running was a breeze.

### Sequelize

I chose Sequelize as my ORM due to my previous experience with it.

## Messaging

### Kafka

This project will use Kafka as its message broker, mostly due to it seeming to be the default from the workshops and lesson materials provided by Fontys. Another reason is that my teachers seem to be knowledgable in Kafka, so I can ask them for help if I need it.

## Monorepo Management

### NX

I chose NX since it fits with the all-TypeScript (or JavaScript) approach I am taking with this project. It has the distinct advantage of the `nx affected` command, which helps me run only the test/build jobs on packages that were affected by my changes. This is a huge time-saver, and will help with keeping separate versions for each services' docker image.

## Cloud Provider & Services

Preventing vendor-lock in is important to me, so I chose to use Kubernetes as my container orchestration tool. This way, I can easily switch cloud providers if I want to. Especially compared to serverless cloud functions and the like. <br>

### Cloud Provider (Kubernetes)

I chose Azure as my cloud provider because it is the "recommended default" at Fontys, as they advertise the free credit on the portal, as well as giving workshops on it. This means I can get help from both students and teachers if I run into any problems. <br>
An analysis of the different available providers can be found [here](./analyses/cloud-host.md).

### Cloud Storage

I chose to use MinIO as my cloud storage solution because it is open source, and it is S3-compatible. This means that if I ever want to migrate to AWS, it will be easy to do so. If I choose not to migrate to AWS, it will still be robust. In the end, it avoids vendor lock in. <br>
An analysis of the different available providers can be found [here](./analyses/cloud-storage.md).

### Update 2024-01-02

Due to the time constraints of this project, combined with the knowledge I already have of the Google Cloud Platform, I have decided to switch to GCP. This means that I will be using Google Kubernetes Engine instead of Azure Kubernetes Service. <br>
Cloud storage, if implemented, will use Google Cloud Storage buckets instead of MinIO/S3, and authentication/identity management will be handled by Firebase Authentication.

### Identity Provider

I chose to use Firebase Authentication due to its low cost and big featureset. While I am not happy with the vendor lock-in, it is the most sensible choice time-wise. <br>
The analysis of the different available providers can be found [here](./analyses/identity-provider.md).
