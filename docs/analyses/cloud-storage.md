# Cloud Storage Technology Analysis

## Introduction

There are many ways to handle file storage in a cloud environment, notably BLOB, or Binary Large OBject storage. Since the application needs to store images on repair requests. This analysis will look at various possible solutions for this problem and pick the most suitable one.

## Requirements

- Store files securily, accesssible by the application.
- No vendor lock-in.

## Comparison

### Azure Blob Storage

Easy to integrate and set up, considering the application is hosted on Azure.

### Amazon S3

Widely used, but not on the same host as the application.

### DigitalOcean Spaces

Also an option, but not on the same host as the application.

### Open source, S3-compatible storage

There are many open source S3-compatible storage solutions, such as MinIO, which allow for self-hosting. It might not be the best option in all cases, but when vendor lock-in is a concern, it is a good option.

## Conclusion

I will go with MinIO or another open source S3-compatible storage solution, since it allows for self-hosting, which helps avoid vendor lock-in. If the application does migrate to AWS some day, it will be easy to migrate the data to AWS S3.
