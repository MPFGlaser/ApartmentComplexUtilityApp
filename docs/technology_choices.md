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
