# Documentation

All work-in-progress documentation will live in this directory. Once something is finalised, it will be _copied_ to the wiki as well. This allows version control on the docs, while also allowing the wiki to be a more user-friendly place to find information.

## Architecture

### C4 Model for ACUA

The C4 model (currently a system context (C1) and container (C2) diagram) for ACUA can be found here:

[C4 Model for ACUA](c4model.md)

### Messaging

A description of the messaging system used by ACUA can be found here:

[Messaging](messaging.md)

### Technology Choices (& Justfications)

To read about the technology choices made for this project, click [here](technology_choices.md).

### Technology Impact Cycle Tool (TICT)

A "Quick Scan" has been performed on the ACUA project using the [TICT tool](https://tict.io/). This helps to identify possible pitfalls or ethical issues within the project. The results of this scan can be found [here](./TICT/TICT_quick_scan.pdf).

## Deployment

The application is deployed onto a Kubernetes cluster using the Github Actions workflow. This workflow is triggered on each pull request, on the main branch, and on releases. This ensures a DTAP (Development, Testing, Acceptance, Production) structure in the project.
To ensure no downtime, a rolling update strategy is used. It is configured in such a way that a pod will not go offline until a new one (with an updated version) is online and confirmed to be working using the health check.

To read about the plans for future deployments, click [here](deployment.md).

### Templating

To allow for different environments, templating using Helm is utilised within this project.

## UI Design

Some very rough wireframes have been created for the UI of ACUA. These can be found [here](./media/wireframes/wireframes.png).

## Risk Assessment

A risk assessment has been made for this project. It can be found [here](./risk_assessment.md).

## GDPR Check

In order to ensure that the ACUA project is GDPR compliant, a GDPR check has been performed. This check can be found [here](./gdpr.md).

## OWASP Top 10

To ensure that the most commonly found mistakes are not made in ACUA, the OWASP Top 10 list was consulted. While this is by no means an exhaustive list, it does cover the most common vulnerabilities as mentioned before. The results of this can be found [here](./owasp-top-10.md).

## Misuse Cases

Some misuse cases have been identified for ACUA. These can be found [here](./misuse-cases.md).

## Security Requirements

Based on the above documents, some security requirements have been identified. These can be found [here](./security-requirements.md).

## Load Testing

To read about the load testing performed on ACUA, click [here](./loadtest.md).

## CI/CD

The CI/CD pipeline makes use of GitHub Actions. It has several steps, described in [this document](./cicd.md).
