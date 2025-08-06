# Prepare for consuming the Smartcontract methods through OAuth2

#### Table of Contents  
[Introduction](#Introduction)  
[Creation of Confidential Application](#ConfAppCreate)  
[Testing Bearer Token from Postman](#testWPostman)  

<a name="Introduction"/>

## Introduction

Using OAuth 2.0 Access Token Based Authentication, clientId/clientSecret are used to generate the access tokens. For security reasons the clientSecret for the app which is created by Identity and Access Management (IAM) cannot be retrieved from console/rest API, so we have to manually [create a security confidential application in IAM](https://docs.oracle.com/en-us/iaas/Content/Identity/applications/add-confidential-application.htm) and use the clientId/clientSecret from the test suites.

First of all I want to highlight that in Oracle Cloud Infrastructure (OCI) there has been an evolution of the Identity and Access Management solution. The instructions shown in this page explain how to create the confidential application for the last evolution of the identity and access management services in OCI. You can check the following [link](https://docs.oracle.com/en-us/iaas/Content/Identity/getstarted/identity-domains.htm) to help you understand in which kind of tenancy you are. Older tenancies relying in the former OCI Identity Cloud Service (IDCS) will need to follow the instructions in [Administering Oracle Identity Cloud Service - Add a Confidential Application](https://docs.oracle.com/en/cloud/paas/identity-cloud/uaids/add-confidential-application.html) for the creation of the Confidential Application.

In this page we also give the details about how to test the generation of the bearer token using Postman, and how to use the token in a Blockchain API call.

<a name="ConfAppCreate"/>

## Creation of Confidential Application

1) Login into the OCI admin console, and from the top-left burguer menu, select Identity & Security --> Domains.
<p align="center">
<img width="655" height="534" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp1_936x764.png"/>
</p>

2) Select the ***OracleIdentityCloudService*** Domain.
<p align="center">
<img width="753" height="440" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp2_1076x629.png"/>
</p>
 
3) Select the ***Integrated Applications*** tab.
<p align="center">
<img width="1487" height="358" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp3_1487x358.png"/>
</p>

4) Push the ***Add Application*** button.
<p align="center">
<img width="498" height="497" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp4_711x710.png"/>
</p>

5) Select ***Confidential Application*** and Push the ***Launch Workflow*** button.
<p align="center">
<img width="1310" height="618" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp5_1310x618.png"/>
</p>

5) Fill 'Name' and 'Description" of the application and then click ***Submit*** button.
<p align="center">
<img width="1309" height="613" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp6_1309x613.png"/>
</p>

 
5) Select 'Configure this application as a client now' and then select 'Resource Owner' and 'Client Credentials' for 'Allowed Grant Types'. And then click 'Next' button. 
 

6) Click 'Next' and "Next" and "Finish' . 
7) Active the application at the top-right of page. 
 

How to get clientId/clientSecret for restproxy 
The guide below for how to generate access token is for idcs-e15b8cc3f25a4c3daa6b6e35b02c30f7. The app name is bcsqarestproxy for example. Well, other names are also Okay.
1.	In the IDCS idcs-e15b8cc3f25a4c3daa6b6e35b02c30f7, create the app bcsqarestproxy as 'How to create an application in IDCS' section in this page.
2.	Click Configuration→Client Configuration→Token Issuance Policy→Resources→Add Scope to add resource of the target instance to the app bcsqarestproxy. Then there will be a 'Select Scope' dialog.
 
3.	In the select list of 'Select Scope' dialog, click the right arrow of the target instance and select the .../restproxy resource, then click 'Add' button
  
4.	The resource will be listed under the 'Resources' region
 
5.	Use the clientId/clientSecret of bcsqarestproxy to generate access token according to the e-doc
https://docs.oracle.com/en/cloud/paas/blockchain-cloud/rest-api/Authentication.html
 

	 
3.	Enter following details: 
1.	 
2.	 
3.	Click "Next" on all other screens.
4.	Click Finish
5.	Note down Client ID and Secret
6.	 
7.	Click Activate.
8.	Application is created successfully.
4.	Search and Edit the Application. Expand Client Configuration: 
1.	 
2.	Click "Add Scope"
3.	 
4.	Click Arrow against your OBP Instance's Application Name:
5.	 
6.	Select the /restproxy endpoint as the scope:
7.	 
8.	Click "Add" at the bottom of the screen.
9.	The scope should reflect like below:
10.	 
11.	Click "Save" at top of page, to save the Application.
5.	The IDCS side of changes are Completed successfully.



<a name="testWPostman"/>

## Testing Bearer Token from Postman

In case you have to get the Bearer Token in a environment where MFA has been configured, you will need to test it using a method which allows you to provide basic authentication and also the second factor authentication. 

Easiest way to do the test is using Postam, which allows you to get redirected to the IDCS authentication page to perform the MFA Authentication. For it you will need to configure a Postman request setting the following vàlues in the Authentication Tab: 

POST	<IDCS-URL>/ (DomainURL works, no need to be the regional URL)
AuthURL	<IDCS-URL>/oauth2/v1/authorize
AccessT	<IDCS-URL>/oauth2/v1/token
ClientID	014fb463ed864515a18b628653031fa8
ClientSecret	29d1ff8b-b95b-481f-bb2a-c7bc905eef7d
Scope		<OBP-URL>/restproxy

<p align="center">
<img width="791" height="1074" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/Postman1.png"/>
</p>

First time you try to push the ***Get New Access Token*** button, an error will be raised by the browser opened by Postman. In that error the correct callback URL expected by Postman will be shown, so it will need to be configured in our ***Confidential Application***. The ***Client Configuration section*** of your ***Confidential Application*** needs to be updated in the following way:

1.	Among the "Allowed Grant Types", add: ***Authorization Code*** and ***Implicit***.

2.	Set the redirect URL to the one informed in the error raised by the browser as callback URL, it is in my case (for the Postman desktop app version I’m using right now): https://oauth.pstmn.io/v1/callback (it can change depending on the Postman version, or in case other clients were used to test).

<p align="center">
<img width="1129" height="1069" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/Postman2.png"/>
</p>

Once configured properly Postman Request and the Confidential Application, we will be able to get a new Bearer token by pushing the Get New Access Token in the Authorization tab of the Postman request. After pushing that button a login page to our IDCS tenancy should be opened in our default browser, asking to perform the authentication, and once loged in, Postman will provide the corresponding token, which will be usable as a Bearer token during the lifetime of the token.
