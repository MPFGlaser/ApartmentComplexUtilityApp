# Security requirements

Based on the analysis done in the various documents linked below, various security requirements have been identified. These requirements are listed in this document.

## Based on

- [GDPR Check](./gdpr.md)
- [OWASP Top 10](./owasp-top-10.md)
- [Misuse Cases](./misuse-cases.md)
- [Risk Assessment](./risk-assessment.md)

## Requirements

- Rate limiting for login attempts.
- Rate/resource limiting for requests.
- Password policy that ensures strong passwords (industry standard).
- MFA option, required for privileged users.
- Secure password reset mechanism (industry standard).
- Secure session management (industry standard).
- Logging of auditable events.
- Monitoring of logs for suspicious activity.
- Data validation and sanitation on all user input.
- Static code analysis for vulnerabilities.
- Dependency scanning for vulnerabilities.
- CORS configuration should be set up to only allow requests from the frontend.
- Misuse cases should be tested, just like use cases.
- (nice to have): check password **hashes** against known password leaks, e.g. via haveibeenpwned.com.
