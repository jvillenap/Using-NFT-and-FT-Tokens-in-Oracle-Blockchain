# Test the Smartcontracts using Postman

#### Table of Contents  
[Introduction](#Introduction)  
[Prerequisites](#Prerequisites)  
[Obtain Required information to execute REST APIs](#restInfo)  
[Initialization of the eCrypto token (FT)](#initFT)  
[Initialization of the eShopDevice token (NFT)](#initNFT)  
[Use case simulation - Successful renting](#usecase1)  
[Validation & Conclusions](#validation)  

<a name="Introduction"/>

## Introduction

In this last chapter we are going to demonstrate how easily we can do a full test of our Smartcontracts using a REST Client like Postman.

When you are dealing with Tokens, there is a bunch of administrative actions to be executed before being able to execute your business methods. Thanks to Oracle Blockchain, all the administrative actions can be executed as API REST calls, so it simplify considerably the effort needed for the initialization. We are going to perform a "dummy" initialization just with the minimum requirements to do a basic test.

Before the execution of any of the below steps we must create the enrollmentIDs into the REST Proxies for those users granted to access to the smartcontract methods. The enrollment is a mapping between the username who invoke the REST API, and the accounts managed internally by blockchain to which tokens will be assigned.

To reduce the complexity, enrollmentID can be named with the same value as the own user name.


<a name="Prerequisites"/>

## Prerequisites
- Postman or any other API REST client tool.
- The required enrollments for the two existing users in the network (eshop_manager and lessee1_manager) have already been created as the last step of the first chapter, [Create an Oracle Blockchain Network - Create Enrollments](https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/tree/main/01-Create-The-Network#createEnrollments). If not already done, you must do it.

<a name="restInfo"/>

## Obtain Required information to execute REST APIs
First of all we need to know which is the endpoint in which the REST API is accesible. You can get this URL from the Blockchain Service Console:
1. Access to the Blockchain Service Console:
   - In the OCI services menu, select ***Developer Services*** and click on ***Blockchain Platform***.
   - Ensure that the right Compartment is selected and click on the founder or participant instance (the one you want to access through).
   - Click the ***Service Console*** button.  
2. Once inside the ***Service Console*** go to the ***Nodes*** tab. It will show you all the nodes which composes this instance, and in the ***restproxy*** node you will see the endpoint URL at the ***Route*** column: 
<p align="center">
<img width="988" height="615" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-1.png"/>
</p>

Remmember that enrollments are created at instance level, so the enrollment for eshop_manager user will be only available through the restproy URL of the eshop founder instance, and the enrollment for the lessee1_manager user will be only available through the restproxy URL from the lessee1 participant instance. Following table shows the user to be used depending on the instance you are going to access:
| username        | Instance URL          |
| --------------- |-----------------------|
| eshop_manager   | https://eshop-....    |
| lessee1_manager | https://lessee1-....  |

The following table shows all the varibles we are using in Postman to make more easy the management of the requests we are going to execute. Validate you are the same values before the execution of the different invocations:
| Variable Name               | Variable value        |
| --------------------------- |-----------------------|
| bc_founder_provider_url     | https://eshop-....    |
| bc_participant_provider_url | https://lessee1-....  |
| bc_channel_name             | rentalshop            |
| bc_ft_chaincode_name        | eShopCriptoFT         |
| bc_ft_token_id              | eCrypto1              |
| bc_founder_orgid            | eshop                 |
| bc_founder_userid           | eshop_manager         |
| bc_founder_password         | ************          |
| bc_participant_orgid        | lessee1               |
| bc_participant_userid       | lessee1_manager       |
| bc_participant_password     | ************          |
| bc_timeout                  | 60000                 |
| bc_nft_token_id             | NFT-E1                |
| bc_nft_chaincode_name       | eShopDeviceNFT        |

These variables are set in the ***Variables*** tab of the Postman collection. You can change any of the values accordingly with any change you have done during the execution of the previous labs.

<a name="initFT"/>

## Initialization of the eCrypto token (FT)

There is a set of administrative actions which are required before being able to execute the business methods.

1. The first action is the initialization of the chaincode indicating which user accounts will be allowed to execute administrative actions. It is important to set correctly the args of the init method:
   - ***args***: Scaped array of user_ids with their org_ids:
     - "[{\"org_id\":\"eshop\",\"user_id\":\"eshop_manager\"},{\"org_id\":\"lessee1\",\"user_id\":\"lessee1_manager\"}]"
<p align="center">
<img width="982" height="577" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-2.png"/>
</p>

2. We must also create user accounts for all those users elegible to own eCrypto Tokens. For the specifics of our use case there is only two users, eshop_manager and lessee1_manager, each of them belonging to one of the existing organizations of the network.
   - This call must be executed as many times as users for which we want to create an account. In our case 2 times, each with following params:
     - "createAccount", "eshop", "eshop_manager", "fungible"
     - "createAccount", "lessee1", "lessee1_manager", "fungible"
<p align="center">
<img width="982" height="671" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-3.png"/>
</p>

3. The interchangeable fungible token needs to be initialized. It is basically set the identifier of the token (its name), its description, so the token will be initialized based in the anatomy defined in the specification file. This action can be executed through the ***Step-3: Initialize Token*** from the postman collection:
<p align="center">
<img width="982" height="671" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-4.png"/>
</p>

4. the FT eCrypto token must be associated to an user account. We are going to associate the token to the eshop_manager user. Before being able to do this association, we need to obtain the oaccount of the eshop_manager. We can get the oaccount of the eshop user with the ***Step-11:get Accounts by OrgId:UserId*** request:
<p align="center">
<img width="982" height="671" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-5.png"/>
</p>
With the oaccount we can execute the ***Step-3 : Associate Account to Token for Token User*** from the Postman Collection:  
<p align="center">
<img width="982" height="671" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-6.png"/>


<a name="initNFT"/>

## Initialization of the eShopDevice token (NFT)



First administrative action is assign administrative users to the chaincode. Until this request  
Init admin accounts


We must create user accounts for all the users who can be custodians of the NFT assets representing the physical assets. In our use case there is only the eshop_manager user and the lessee1_manager user, each of them belonging to one of the organizations.




<a name="usecase1"/>

## Use case simulation - Successful renting


<a name="validation"/>

## Validation & Conclusions


