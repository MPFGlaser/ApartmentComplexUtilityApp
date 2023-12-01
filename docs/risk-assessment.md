# Risk Assessment

## Introduction

In this document, possible risks for the ACUA project will be identified and assessed. The CIA triad is used in order to categorise both the risks and the mitigations. The CIA triad consists of the following three categories:
Confidentiality, Integrity, and Availability. <br>
Lastly, potential threats will be identified and categorised as either external, internal, or environmental.

## Table of Contents

- [Risk Assessment](#risk-assessment)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [CIA Triad](#cia-triad)
    - [Confidentiality](#confidentiality)
      - [Data Encryption](#data-encryption)
      - [Access Control](#access-control)
      - [Privacy Policies](#privacy-policies)
    - [Integrity](#integrity)
      - [Data Validation](#data-validation)
      - [Version Control/Deployments](#version-controldeployments)
      - [Checksums \& Hashing](#checksums--hashing)
    - [Availability](#availability)
      - [Redundancy](#redundancy)
      - [Load Balancing](#load-balancing)
      - [Disaster Recovery](#disaster-recovery)
  - [Threats](#threats)
    - [External](#external)
    - [Internal](#internal)
    - [Environmental](#environmental)

## CIA Triad

### Confidentiality

Confidentiality is an important aspect when working with personal data. A project such as ACUA handles personal data such as names and addresses. This data should not be accessible to anyone who is not authorised to do so. When combining the data from multiple users, conclusions could be drawn about the users, such as their relationship status, when looking if multiple tenants have the same address.

#### Data Encryption

To ensure that data is not accessible to unauthorised persons, data should be encrypted. This means that even if the data is intercepted, it cannot be read. <br>
Data should at the very least be encrypted in transit, using industry-standard practices such as TLS/HTTPS. <br>

#### Access Control

ACUA should work on the principle of minimum privilege. This means that users should only have access to the data that they need to do their job. For example, a tenant should not be able to see the data of other tenants. <br>
To ensure this functions properly, access should be denied by default on all data/resources. Only after authenticating and having the proper authorisation (role), should access be granted. <br>
To further ensure that access is only granted to authorised persons, two-factor authentication should be available to use. This should be _strongly recommended_ for tenants, and _required_ for any actors that have access to sensitive data, i.e., building management and building staff.

#### Privacy Policies

ACUA should only request (and store) the bare minimum data needed about users in order to function. Users should be made aware of what data is being stored, and why. This should be outlined in a clear, concise, and easy to understand privacy policy. <br>
Furthermore, users should have the ability to request an export of their data, and the ability to request the deletion of their data as per the GDPR. <br>
If operating outside of the EU, steps should be taken to ensure that the data is in compliance with all laws and regulations in the country or countries of operation.

### Integrity

Ensuring integrity of both the data and the application is important. Data should not be able to be modified by unauthorised persons, nor should the application be able to be modified by unauthorised persons. <br>

#### Data Validation

Data should be validated before being stored. This ensures that the data is in the correct format, and that it is not malicious. <br>
While validation can be used on the client-side, this is only to improve the user experience. Validation should always be performed on the server-side as well, as client-side validation can be bypassed. <br>
To ensure valid data, backend systems should implement data validation. One way to do this is to use a schema to validate the data. This can be done using a schema language such as JSON Schema. With the help of code libraries, input can be compared to the schema to ensure its validity. Invalid data should be rejected. <br>
To reduce the chance of SQL injection attacks, an ORM (Object Relational Mapper) should be used. This ensures that input is not directly used in SQL queries, but is instead mapped to objects. <br>

#### Version Control/Deployments

To ensure that the application only has authorised changes, the version control repository/host should be set up in such a way that only authorised persons can make changes. <br>
This can be achieved by requiring commits to be signed using GPG, and by requiring pull requests to be reviewed and approved by at least one other authorised person. <br>
To ensure working code on the production environment, the DTAP (Development, Testing, Acceptance, Production) structure should be used. This means that code is reviewed and tested twice before being deployed to production. First in the testing environment specific to a pull request/feature, then in the acceptance environment where all features are combined before rolling out to production. <br>

#### Checksums & Hashing

To ensure that the application has not been tampered with, checksums for the application and its components could be used. By verifying the checksum of the application before deployment with a known-good checksum, it can be ensured that the application has not been tampered with between the approvement process and the deployment. <br>

### Availability

Ensuring availability of the application to the users is important. If the application is not available, users cannot use it. Not being able to use the application could result in a loss of revenue for the business because customers may become dissatisfied and leave. <br>

#### Redundancy

Business-critical systems should be redundant. This means that if one system fails, another system can take over. This ensures that the application is still available to the users. <br>
This can be achieved by using multiple instances of the application, and by using multiple instances of the database. <br>
An example of how to achieve this is a Kubernetes cluster with multiple replicas of the application and a database cluster with multiple replicas of the database. <br>
These replicas could exist on multiple Kubernetes nodes in datacentres spread across multiple locations. It does, however, require the control plane of the Kubernetes cluster to be redundant and highly available as well. <br>
In the case of database redundancy, read-replication could be a strategy to apply. This means that the database is replicated to multiple nodes, and that reads are distributed across these nodes. This ensures that if one node fails, the other nodes can still be used for reads. Write operations will still be made to a single node, which should be highly available. <br> In this instance, no new data can be added until the problem is resolved, but data can be retrieved and the application can still be used in a limited capacity. <br>

#### Load Balancing

To ensure that the application can handle the load, load balancing should be used. This means that requests are distributed across multiple instances of the application or microservice. <br>
In addition to this, auto-scaling could be utilitised, where the Kubernetes control plane keeps track of the load on the application using metrics such as CPU and memory usage. If the load increases, more instances of the application are spun up. If the load decreases, instances are spun down. <br>

#### Disaster Recovery

In the event of a disaster, the application should be able to recover. This means that the application should be able to be restored to a working state as quickly as possible. <br>
This can be achieved by having a backup of the application and its data. This backup should be stored **in a different location** than the application itself. Ideally, the 3-2-1 backup strategy should be applied. This means that there are 3 backups, on 2 types of media (e.g., hard drives and magnetic tape), with 1 backup stored off-site.<br>
Backups should be **made regularly**, and should be **tested** to ensure that they can be restored. <br>
In the case of a well-set up Kubernetes cluster with the infrastructure as code, it should be sufficient to only back up the database. This is because the application can be redeployed using the infrastructure as code. <br>
In either case, a written procedure should be in place to ensure that the application can be restored as quickly as possible. This procedure should be tested/verified and practiced regularly to ensure that it works as intended. <br>

## Threats

### External

**Data Breach**

Unauthorised persons could gain access to the data. This could be done by exploiting a vulnerability in the application, or by exploiting a vulnerability in the infrastructure. <br>
To mitigate this, the application should be tested for vulnerabilities regularly. This can be done by having a security researcher perform a penetration test on the application and have the application be audited regularly.<br>

**Social Engineering**

Social engineering is the act of manipulating people into performing actions or divulging confidential information. This could be done by impersonating a person of authority, or by impersonating a person that the target trusts. <br>
To mitigate this, employees should be trained to recognise social engineering attacks. This training should be provided regularly to ensure that employees are up to date with the latest developments. <br>

**Supply Chain Attack**

A supply chain attack is an attack that exploits a vulnerability in a third-party component. This could be a library, a framework, or a dependency. <br>
To mitigate this, dependencies should be kept up to date. If a vulnerability is found in a dependency, it should be patched as soon as possible. <br>
Alternatively, each dependency could be vetted internally and hosted on an internal repository. This ensures that the dependencies are not modified by an unauthorised person. This does come at the cost of time and convenience, though.

### Internal

**Disgruntled/Rogue Employee**

An employee having a bad day or involved in an internal conflict could cause damage to the application or its data. This could be done by deleting data, or by introducing malicious code. <br>
To mitigate this, the principle of least privilege should be applied. This means that employees should only have access to the data that they need to do their job. <br>
Furthermore, logging should be in place to ensure that any changes made to the application or its data can be traced back to the employee that made the change. <br>
Lastly, a recovery procedure should be in place to ensure a smooth recovery in the event of an incident. This procedure should be tested and verified regularly. <br>

**Human Error**

Human error is a common cause of incidents. This could be caused by a lack of training, or by a lack of knowledge. <br>
To mitigate this, training should be provided to employees. This training should be provided regularly to ensure that employees are up to date with the latest developments. <br>
Furthermore, the principle of least privilege should be applied. This means that employees should only have access to the data that they need to do their job. <br>
This helps to ensure that human error is kept to a minimum. <br>

### Environmental

**Natural Disaster**

Localised natural disasters such as earthquakes, floods, and fires could cause damage to the datacentre where the application is hosted and its data is stored. <br>
This can be mitigated by ensuring the application and its data live in multiple datacentres in different locations. <br>
An exception to this is a worldwide disaster such as a nuclear war, in which case there are bigger problems to worry about. <br>

**Power Outage**

A power outage could cause the application to become unavailable. This could be caused by a power outage in the datacentre, or by a power outage in the building where the application is being used. <br>
To mitigate this, the application should be hosted in multiple datacentres in different locations. This ensures that if one datacentre loses power, the application can still be accessed from another datacentre. <br>
If deemed worth the cost, the choice could be made to go with a specific hosting provider that ensures back-up power in case of a power outage. <br>
