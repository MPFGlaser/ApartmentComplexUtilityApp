# Load testing

To load test ACUA, an Artillery script was created. In fact, multiple script were created in order to test how the different scripts would behave.

## Scripts

All scripts have a warmup phase, a continous load phase, and a spike phase. The warmup phase is used to get the pods up and running, and to get the Kubernetes autoscaler to scale up the pods. The continous load phase is used to test the pods under a constant load. The spike phase is used to test how the pods would behave under a sudden increase in load.

### 1. Basic script

Data: `./data/loadtest/report-1cpu-scaling.json`

This script simply loaded the `/` page (landing page), the `/tickets` page, and the `/edit-profile` page without any authentication on the frontend. This resulted in the microservices not being called, because no authentication on the `/tickets` and `/edit-profile` pages meant that the frontend would immediately redirect the user to the `/login` page.

As a result of the increased load on the frontend pod, the Kubernetes autoscaler responded by providing more pods to handle the load.
![Autoscaler](./media/loadtest/Screenshot%202024-01-16%20at%2015-57-02%20acua%20–%20Deployment%20details%20–%20Kubernetes%20Engine%20–%20ACUA%20–%20Google%20Cloud%20console.png)

The data, shown in `./data/loadtest/report-1cpu-scaling.json`, shows that the median response time is 320.6 ms on the `/` endpoint. Not ideal. Calls to the other routes sometimes showed a higher response time, while on certain moments it would show a similar number as the `/` endpoint. Later on, with more pods available, the median response time would drop to around 46 ms. Considerably better compared to the single or few pods that would get overwhelmed by the load at the start of the test.

### 2. Playwright script

Since Artillery supports using the Playwright automation engine, it was the obvious choice to use it for measuring the parts of the application that required authentication to access. \
The tests themselves were easy enough to set up, especially with Playwright's `codegen` feature. This feature allows you to record your actions in a browser, and then generate the code for it. \
Initially, the ticket-service had only 1 serving pod, with no autoscaling. This resulted in horrible loading times and lots of `502` errors being sent to the client. Out of the total 1.663.655 http requests sent, 739.311 of them returned a `502` error code. That's 44% of all requests. \
Because of this, and some unsupported features in the Playwright integration in Artillery, such as not being able to use the `expect()` function to verify the page content is as expected, the Playwright script was left for what it was.

### 3. Load testing with a hardcoded token

While definitely not ideal for larger-scale testing on an enterprise application, this script was used to test the frontend and the `ticket-service`. \
At first, only the frontend had an autoscaler, and the `ticket-service` had only 1 serving pod. This resulted in the frontend being able to handle the load, but the `ticket-service` being overwhelmed. \
Like with the Playwright-based script, the failure rate was around 44%, if not more at times. The median response time for the `ticket-service` was 9 seconds (!). \
With an autoscaler on the `ticket-service`, as well as 5 minimum replicas, the failure rate dropped to 0.1%, and the median response time dropped to 3 seconds under heavy load. Not ideal, but much better than before.

![Autoscaler](./media//loadtest/Screenshot%202024-01-16%20at%2023-11-13%20ticket-service%20–%20Deployment%20details%20–%20Kubernetes%20Engine%20–%20ACUA%20–%20Google%20Cloud%20console.png)
_The `ticket-service` having trouble with high load_

## Possible causes

The slow response time is highly likely to be caused by the configuration of the kubernetes cluster. More specifically, the resources allocated to the pods. Pods were given the bare minimum of resources at first, at 1 replica, no auto-scaling, and 100mCPU and 128MiB of memory to reduce costs. \
During testing, this was increased to 1 CPU and 256MiB of memory, with auto-scaling enabled for both the frontend and the `ticket-service`. The `ticket-service` also got a minimum of 5 replicas.

In addition to the kubernetes cost-savings, the Cloud SQL instance was also minimally specced, with a single zone, 1 vCPU, 0.614 GB of memory, and 10 GB of SSD storage. This amounted to $0.30/database/day. If it were configured with the recommended default settings, it would have performed much better, but at the cost of $51.37/database/day. \
That is a heavy price to pay, but on the other hand, it would be production-ready, highly-available in multiple zones, and have 35 days of point-in-time recovery.

## Conclusion & Lesssons learnt

The load testing was a great learning experience. It showed that the application was not ready for production, and that the very barebones configuration of the infrastructure (both Kubernetes and Cloud SQL) was not ready to enter production on a large scale.
Given a higher budget, either directly from paying customers or indirectly via the company budget would allow this application to handle the envisioned scale with ease, though at the cost of a higher monthly bill. \
In future projects, I will be a bit less frugal with the resources, as it turned out that the extreme nature of the cost-savings were noticable early on in the load testing process. \
The addition of caching requests (both the frontend app, via Cloudflare or GCloud for example, as well as the data via Redis or the cache option in Cloud SQL) would also immensely improve the performance of the application.
