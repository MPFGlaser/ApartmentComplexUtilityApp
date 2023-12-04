# Security Report

A brief security report based on the [OWASP Top 10 of 2021.](https://owasp.org/Top10/#welcome-to-the-owasp-top-10-2021)

## A01:2021-Broken Access Control

The backend denies access to resources/endpoints unless specified that they are public. The principle of least privilege is applied in the architecture.
Bypassing access control checks by modifying the URL is not possible.
Access to one's own resources is permitted, only when logged in as the correct user.
POST, PUT, and DELETE endpoints have the same protection as GET endpoints, where applicable.
Administrative actions or requesting sensitive data can only be done while authenticated.
Tampering with the JWT should not be possible, unless the private key used to sign it is compromised. The JWT is signed using RSA256, which is considered secure.
CORS is not configured currently, but it should be configured to only allow requests from the frontend.
It is not possible to request authenticated resources without being authenticated, nor is it possible to request privileged resources without being privileged.

## A02:2021-Cryptographic Failures

HTTPS/TLS is used to encrypt all traffic between the frontend and the backend. The backend should be configured to only accept HTTPS traffic, however.
The JWT is signed using RSA256, which is considered modern and secure, with sufficiently long, randomly generated keys.
Randomness is used as intended, without any modifications.

## A03:2021-Injection

User input is validated and sanitised before moving beyond the endpoint. Database queries are made indirectly by using Sequelize as an ORM, which prevents SQL injection.

## A04:2021-Insecure Design

Security is taken into account from the start of the software design process. The principle of least privilege is applied in the architecture.
Misuse cases should be written, however, to validate the security of the architecture. In addition to that, more testing should be implemented overall.
Thought should be given to limiting resource consumption by the user/service.

## A05:2021-Security Misconfiguration

The settings of cloud services used must be verified to be secure. Unneccesary/unused dependencies should be removed. Care must be taken to not disclose stack traces or other sensitive information to the user in case of errors or warnings.
The server should set security headers. Dependencies/software must be kept up-to-date.

## A06:2021-Vulnerable and Outdated Components

ACUA is kept on the bleeding edge of LTS updates. The latest LTS release of Node.js is used and Dependabot is utilised to keep dependencies up-to-date and free of known (and fixed) vulnerabilities.

## A07:2021-Identification and Authentication Failures

Rate-limiting should be applied to prevent credential stuffing and/or brute forcing. A password policy should be in place to prevent weak or well-known passwords. Passwords are hashed and salted using a modern and secure algorithm. A secure mechanism must be used to reset passwords. Multi-factor authentication must be available, and preferably required for privileged users. Sessions should be correctly invalidated.

## A08:2021-Software and Data Integrity Failures

While dependencies come from the npmjs repository, they are scanned for vulnerabilities (that are already known) using SonarCloud. The pipeline in GitHub can only be edited by the developer and only uses known-good components/plugins.

## A09:2021-Security Logging and Monitoring Failures

There is currently no logging in place of auditable events. Logs that are created, are not monitored for suspicious activity. Logs are only stored locally. No pen-testing is done, nor are there mechanisms that trigger alerts upon detection.

## A10:2021-Server-Side Request Forgery

Data is validated and sanitised, and only allowlisted URL schemas and ports are allowed. No HTTP redirects are used. Network-level logging is in place already, and the firewall denies access by default.

## Advice

Below, in no particular order, a list of advised actions based on the report above is given.

- Set up CORS configuration to only allow requests from the frontend.
- Double-check data validation & sanitation.
- Write misuse cases.
- Implement more testing.
- Implement resource limiting.
- Set up security headers.
- Set up MFA & mandate for privileged users.
- Set up logging mechanisms.
- Set up alerts for suspicious activity.
- Perform vulnerability testing.
