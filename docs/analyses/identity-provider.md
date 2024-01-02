# Identity Provider Analysis

As became evident over the course of developing ACUA, building everything from scratch is not ideal or feasible within the time constraints of this project. Therefore, I will be using an identity provider to handle authentication and authorization. This analysis will look at various possible solutions for this problem and pick the most suitable one.

## Requirements

- Easy to implement
- Free or very cheap
- Roles
- No vendor lock-in (bonus)
- MFA (bonus)

## Comparison

### Keycloak

Keycloak is an open source identity provider. It has a rich feature set, including roles and MFA. It is also free to use (depending on where it is hosted). However, it requires the most setup of the three options in this analysis, which is not ideal. It does, however, prevent vendor lock-in.

### Auth0

Auth0 is widely covered in online tutorials and has a free tier. However, to make use of roles, you need to upgrade to a paid plan, which is outside of the scope of this project.

### Firebase Authentication

Firebase Authentication is richly documented and integrates well with the Google Cloud Platform. It's free to use in a limited quantity, and when enabling the (paid) Identity Platform, it also supports MFA. Furthermore, roles are supported in the free tier. Unfortunately, you're bound to Google when using it.

## Conclusion

Due to time constraints, I will be using Firebase Authentication for this project, due to my familiarity with the Google Cloud Platform. If I had more time, I would have chosen Keycloak, due to its open source nature and lack of vendor lock-in.
