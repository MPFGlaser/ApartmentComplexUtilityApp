# Deployment (in the future)

Currently, the application is deployed to Kubernetes in a very simple way. A pipeline is triggered on each commit to the main branch or pull request, and the current version is deployed to the cluster. This is not ideal, as it does not allow for testing or acceptance environments. In the future, this will be changed to a DTAP (Development, Testing, Acceptance, Production) structure. <br>
During the process of setting this up, a DTAP structure was created and tested. However, it turned out that the setup was too time-consuming and complex given the learning outcomes and time constraints of this project. As such, the current setup will be used for the duration of this project. <br>
The DTAP structure was facilitated by Helm templates, where the values for each environment were stored in a separate file. This allowed for easy switching between environments, and allowed for easy configuration of each environment. <br>
