# Cloud host analysis

## Introduction

To host the application, a cloud host is needed. Specifically, a Kubernetes host is needed. This could be a VPS or bare metal server on which Kubernetes can be installed, but more convenient (time-wise) is one that offers a Kubernetes cluster as a service. The latter is called a managed Kubernetes service. Many cloud providers offer such a service, including Google Cloud Platform (GCP), Amazon Web Services (AWS), Microsoft Azure, and DigitalOcean. The following paragraphs show a comparison of the managed Kubernetes services offered by these providers.

## Requirements

The following requirements are considered when choosing a cloud host:

**Non-functional**

- **Cost**: The cost of the cloud host should be as low as possible, while still meeting the other requirements.
- **Documentation**: The cloud host should be easy to use, which includes extensive documentation where relevant. This way it does not take too much time to set up and maintain.
- **Performance**: The cloud host should be able to handle the expected load of the application.
- **Availability**: The cloud host should be available as much as possible, so that the non-functional requirement of availability is met.
- **Scalability**: The cloud host should be able to scale up and down, at least in theory, so that the non-functional requirement of scalability is met.
- **Location**: The cloud host should be located in the EU, preferably in or close to The Netherlands, the main market of the application, so that the non-functional requirement of performance is met.

**Functional**

- **Managed Kubernetes**: The cloud host should offer a managed Kubernetes service, so that the non-functional requirement of ease of use is met.
- **Accessible from external tools**: It is important that the Kubernetes API can be accessed from external tools, in this case, GitHub Actions, because that pipeline has already been set up.
- **Support for monitoring**: The cloud host should support monitoring tools such as Prometheus, ideally out of the box.

## Comparison

The following paragraphs show a comparison of the managed Kubernetes services offered by the cloud providers mentioned above.
Pricing is based on a minimum setup of 1 node with as little resources as possible.

### Google Cloud Platform (GKE)

Google offers a $300 in credit for new customers to try out GKE. It also has a free tier for GKE of $74.40/month, with pay-as-you-go when exceeding the limit. The pricing seems to be comparable to Azure, Amazon and Azure. The documentation seems extensive. Being one of the big cloud providers, there are lots of options to choose from with regards to performance and availability - provided you have the money to spend. The data centres are located in Belgium, Finland, Germany, The Netherlands to name a few, and more outside of the EU. <br>
Google offers a managed Kubernetes service, which is called GKE. It is accessible from external tools, such as GitHub Actions. It also supports monitoring tools such as Prometheus, out of the box, along with a visualisation tool called Grafana. <br>

### Amazon Web Services (EKS)

Amazon does not seem to offer free credit, and according to their calculator, the cheapest, 1 cluster setup would cost $0.10/hour, which is $73/month. There is documentation available for the platform Being one of the big cloud providers, there are lots of options to choose from with regards to performance and availability - provided you have the money to spend. The data centres are located in Ireland, Germany, Sweden, and more outside of the EU. <br>
Like Azure and Google, Amazon offers a managed Kubernetes service, which is called EKS. It is accessible from external tools, such as GitHub Actions. It also supports monitoring tools such as Prometheus, out of the box, along with a visualisation tool called Grafana. <br>

### Azure (AKS)

Azure offers a $100 credit for students, which is a nice bonus over the others. Its pricing seems to be comparable to Google. Azure also offers a free/very cheap test/dev tier. The documentation seems extensive and the management portal keeps offering tutorials and tips. Being one of the big cloud providers, there are lots of options to choose from with regards to performance and availability - provided you have the money to spend. While the names of the regions are somewhat vague (e.g. "West Europe"), further reading sheds light on the exact locations of the data centres. West Europe, for example, is located in The Netherlands. <br>
Azure offers a managed Kubernetes service, which is called AKS. It is accessible from external tools, such as GitHub Actions. It also supports monitoring tools such as Prometheus, out of the box, along with a visualisation tool called Grafana. <br>
Lastly, Azure seems to be the "recommended default" at Fontys, as they advertise the free credit on the portal, as well as giving workshops on it. This means I can get help from both students and teachers if I run into any problems. <br>

### DigitalOcean (DOKS)

DigitalOcean profiles itself as a cheaper alternative to the big three, with prices starting from €24/month for a 2 CPU cluster, emphasising that bandwidth is free (4.000 GiB/month) whereas the big three charge for it. You do have to pay for a Load Balancer, though. DigitalOcean also offers $200 in credit for the first 60 days for new accounts, which would be applicable in this situation. The documentation seems extensive and the management portal is easy to use. The performance and availability options are limited, but the cheapest option should be sufficient for this project. The data centres are located in Amsterdam, Frankfurt, and more outside of the EU. They offer a range of configurations and promise a high uptime percentage of 99.95%. <br>
DigitalOcean offers a managed Kubernetes service, which is called DOKS. It is accessible from external tools, such as GitHub Actions. It also supports monitoring tools such as Prometheus, but unlike Azure, it's not a one-click install. Tools such as Prometheus can be installed by using a Helm chart, which is documented on the DigitalOcean website. <br>

## Conclusion

It's difficult to say which is the best option here, as they are all very close to each other, with DigitalOcean being on the cheaper side (at the cost of customisability and available managed services). Other than that, they're very similar, which is a logical outcome from a competitive market. Only Amazon seems to be a bit more expensive _in this specific instance_, due to not offering a free tier/free credit.
That leaves Azure and Google as the two most viable options. Since Azure is the "recommended default", I will go with them, but in the end it doesn't matter _that_ much.

## Sources

https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/#geographies <br>
https://medium.com/@elliotgraebert/comparing-the-top-eight-managed-kubernetes-providers-2ae39662391b <br>
https://www.digitalocean.com/products/kubernetes <br>
https://aws.amazon.com/eks/pricing/ <br>
https://cloud.google.com/kubernetes-engine?hl=en <br>
