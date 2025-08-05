Using OAuth 2.0 Access Token Based Authentication, clientId/clientSecret are used to generate the access tokens. For security reasons the clientSecret for the app which is created by IDCS cannot be got from console/rest API, so we have to manually create a security application in Identity Cloud Service (IDCS) and use the clientId/clientSecret from the test suites.

First of all I want to highlight that in Oracle Cloud Infrastructure (OCI) there has been an evolution of the Identity and Access Management solution. The instructions shown in this page explain how to create the confidential application for the last evolution of the identity and access management services in OCI. You can check the following link to help you understand in which kind of tenant you are:
- [Oracle Cloud Infrastructure Identity and Access Management (IAM)](https://docs.oracle.com/en-us/iaas/Content/Identity/getstarted/identity-domains.htm#identity_documentation "Oracle Cloud Infrastructure Identity and Access Management (IAM)")






- [Oracle Blockchain Platform Enterprise Edition](https://www.oracle.com/blockchain/blockchain-platform-enterprise-edition/ "Oracle Blockchain Platform Enterprise Edition")
