# GDPR Checklist

([source](https://gdpr.eu/checklist/))

## Lawful basis and transparency

<details><summary>Conduct an information audit to determine what information you process and who has access to it.</summary>

**Findings**

Since this is a brand new, from-scratch project, there is no information to audit. Information collected can be inferred from the data model/architecture.

**Advice**

Write down what information is collected, where it is stored, and who has access to it when the application goes live.

</details>

<details><summary>Have a legal justification for your data processing activities.</summary>

**Findings**

Data processed is solely related to the application's functionality. No data is processed for any other reason.

**Advice**

This should fall under "legitimate interest" as the data is only used for the application's functionality.

</details>

<details><summary>Provide clear information about your data processing and legal justification in your privacy policy.</summary>

**Findings**

There is no privacy policy for ACUA.

**Advice**

Create and link a privacy policy that informs the customer that their data can be collected and what it can be used for. It must be presented to the user before data collection happens and must be in a human-readable format.

</details>

## Data security

<details><summary>Take data protection into account at all times, from the moment you begin developing a product to each time you process data.</summary>

**Findings**

Data protection was taken into account from the start of the project.

**Advice**

Stay sharp and keep data protection in mind at all times.

</details>

<details><summary>Encrypt, pseudonymize, or anonymize personal data wherever possible.</summary>

**Findings**

The personal data used within the application is the bare-minimum needed for the functioning of the application. It is not possible to pseudonymize or anonymize this data.

**Advice**

Give users the option to hide their names from other users, if, for example, repair requests or reservations are publicly visible.

</details>

<details><summary>Create an internal security policy for your team members, and build awareness about data protection.</summary>

**Findings**

There is no internal security policy for ACUA. Reading about data protection is done on a regular basis, driven by both curiousity and needing to know certain things for the sake of learning outcomes.

**Advice**

Create an internal security policy for ACUA.

</details>

<details><summary>Know when to conduct a data protection impact assessment, and have a process in place to carry it out.</summary>

**Findings**

I currently do not know when to conduct a data protection impact assessment and there is no process in place to carry it out.

**Advice**

Read up on when to conduct a data protection impact assessment and create a process to carry it out.

</details>

<details><summary>Have a process in place to notify the authorities and your data subjects in the event of a data breach.</summary>

**Findings**

There is currently no official procedure in place to notify the authorities and/or customers of a data breach.

**Advice**

Set up a procedure to notify the authorities and/or customers in the event of a data breach.

</details>

## Accountability and governance

<details><summary>Designate someone responsible for ensuring GDPR compliance across your organization.</summary>

**Findings**

Due to ACUA being a one-person project, there is no separate person responsible for GDPR compliance. Only myself, the developer, is responsible for GDPR compliance.

**Advice**

Appoint a person to be responsible for GDPR compliance when the business grows.

</details>

<details><summary>Sign a data processing agreement between your organization and any third parties that process personal data on your behalf.</summary>

**Findings**

ACUA does not use any third parties to process personal data. If and when it does, a data processing agreement will be signed, probably as part of the terms of service. This is because ACUA is (at the time of writing) too small to have a legal department or to warrant custom agreements.

**Advice**

Carefully read the terms of service when using third-party services to process personal data.

</details>

<details><summary>If your organization is outside the EU, appoint a representative within one of the EU member states.</summary>

**Findings**

ACUA operates wholly from within the EU.

**Advice**

No external, EU-based representative is necessary.

</details>

<details><summary>Appoint a Data Protection Officer (if necessary)</summary>

**Findings**

ACUA does not act as a public authority or do large-scale operations on personal or special data. When the business grows, a DPO may be necessary.

**Advice**

No DPO is needed until the company processes data on a large scale. ([source](https://gdpr.eu/data-protection-officer/)). Prepare for this eventuality.

</details>

## Privacy rights

<details><summary>It's easy for your customers to request and receive all the information you have about them.</summary>

**Findings**

There is currently no system in place for customers to request and receive all the information ACUA has about them.

**Advice**

Design and implement a mechanism that allows data take-out.

</details>

<details><summary>It's easy for your customers to correct or update inaccurate or incomplete information.</summary>

**Findings**

The architecture allows customers to update their information.

**Advice**

Assuming the UI is user-friendly, this should be fine.

</details>

<details><summary>It's easy for your customers to request to have their personal data deleted.</summary>

**Findings**

The architecture allows for data deletion, but it has not been implemented yet.

**Advice**

Implement data deletion.

</details>

<details><summary>It's easy for your customers to ask you to stop processing their data.</summary>

**Findings**

ACUA does not process data for any other reason than the application's functionality. If customers wish to stop using that functionality, they can request to have their account deleted.

**Advice**

No further action needed.

</details>

<details><summary>It's easy for your customers to receive a copy of their personal data in a format that can be easily transferred to another company.</summary>

**Findings**

Currently, data take-out is not yet implemented. When it is, data will be presented in a human-readable format that can also be processed by a computer, such as JSON.

**Advice**

Implement data take-out.

</details>

<details><summary>It's easy for your customers to object to you processing their data.</summary>

**Findings**

Since the only data that is processed is related to the application's functionality, there is no way to object to data processing without also objecting to the application's functionality. As such, if a customer wishes to object to data processing for the purposes of the application, they can either withold their data by not signing up, or by deleting their account.

**Advice**

No further action needed.

</details>

<details><summary>If you make decisions about people based on automated processes, you have a procedure to protect their rights.</summary>

**Findings**

There are no automated decisions about people, or decisions about people at all.

**Advice**

No further action is needed.

</details>
