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

6) Fill ***Name*** and ***Description*** of the application and then click the ***Submit*** button.
<p align="center">
<img width="1309" height="613" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp6_1309x613.png"/>
</p>

7) Select the ***OAuth configuration*** tab.
<img width="779" height="570" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp8_779x570.png"/>
</p>

8) Push the ***Edit OAuth configuration*** button.
<img width="984" height="468" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp9_984x468.png"/>
</p>

9) In the new appeared wizzard, select the following options:

9.a) In the ***Client Configuration*** section, select ***Configure this application as a client now***.

<img width="404" height="266" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp10_404x266.png"/>
</p>

9.b) Inside the same section, select ***Resource Owner*** and ***Client Credentials*** for ***Allowed Grant Types***. And then click 'Next' button. 

<img width="554" height="400" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp11_554x400.png"/>
</p>

9.c) Inside the same section there will be a ***Token isuance policy***, in this section you must select the ***Confidential*** combo, then the ***Add resources*** slider, and pushi the ***Add Scope*** button. 

<img width="1137" height="489" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp12_1137x489.png"/>
</p>

9.d) Inside the ***Add Scope*** wizzard, write the name of your OBP instance into the search field, and then push the ***Search*** button. 

<img width="1196" height="261" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp13_1196x261.png"/>
</p>

9.e) In the select list of this dialog, click the right arrow of the target instance to see the available scopes for the selected resource.  

Select the ***.../restproxy*** scope, then click 'Add' button

<img width="528" height="422" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp14_528x422.png"/>
</p>

9.f) Select the scope ending in ***.../restproxy*** and push the ***Add*** button.

<img width="1196" height="632" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp15_1196x632.png"/>
</p>

10) Click the ***Submit*** button to finish the configuration wizzard.

11) Activate the Confidential Application by pushing the ***Activate*** option from the top-right menu ***Actions***.

<img width="1031" height="553" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/ConfApp16_1031x553.png"/>
</p>

<a name="testWPostman"/>

## Testing Bearer Token from Postman

In case you have to get the Bearer Token in a environment where MFA has been configured, you will need to test it using a method which allows you to provide basic authentication and also the second factor authentication. 

Easiest way to do the test is using Postam, which allows you to get redirected to the IDCS authentication page to perform the MFA Authentication. For it you will need to configure in a Postman request the following values into the Authentication Tab: 

		AuthURL 	<IDCS-URL>/oauth2/v1/authorize  
		AccessToken	<IDCS-URL>/oauth2/v1/token  
		ClientID	Can be retrieved from ConfidentialApp → OAuth configuration page  
		ClientSecret	Can be retrieved from ConfidentialApp → OAuth configuration page  
		Scope		<OBP-URL>/restproxy

<p align="center">
<img width="791" height="1074" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/Postman1.png"/>
</p>

First time you try to push the ***Get New Access Token*** button, an error will be raised by the browser opened by Postman. In that error the correct callback URL expected by Postman will be shown, so it will need to be configured in our ***Confidential Application***. The ***Client Configuration section*** of your ***Confidential Application*** needs to be updated in the following way:

1.	Among the "Allowed Grant Types", add: ***Authorization Code*** and ***Implicit***.

2.	Set the redirect URL to the one informed in the error raised by the browser as callback URL, it is in my case (for the Postman desktop app version I’m using right now): https://oauth.pstmn.io/v1/callback (it can change depending on the Postman version, or in case other clients were used to test).

<p align="center">
<img width="790" height="748" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-ConfidentialApp4MFA/images/Postman2.png"/>
</p>

Once configured properly Postman Request and the Confidential Application, we will be able to get a new Bearer token by pushing the Get New Access Token in the Authorization tab of the Postman request. After pushing that button a login page to our IDCS tenancy should be opened in our default browser, asking to perform the authentication, and once loged in, Postman will provide the corresponding token, which will be usable as a Bearer token during the lifetime of the token.
