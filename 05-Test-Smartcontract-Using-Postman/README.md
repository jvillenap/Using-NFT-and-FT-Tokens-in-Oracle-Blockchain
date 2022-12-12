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

Remmember that enrollments are created at instance level, so the enrollment for eshop_manager user will be only available through the eshop founder instance, and the enrollment for the lessee1_manager user will be only available through the lessee1 participant instance.


<a name="Prerequisites"/>

## Prerequisites
- Postman or any other API REST client tool.
- The required enrollments for the two existing users in the network (eshop_manager and lessee1_manager) have already been created as the last step of the first chapter, [Create an Oracle Blockchain Network - Create Enrollments](https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/tree/main/01-Create-The-Network#createEnrollments). If not already done, you must do it.

<a name="restInfo"/>

## Obtain Required information to execute REST APIs
For all the request you will need to know which is the endpoint of the REST Proxy against you want to execute the API calls. You can get this URL from the Blockchain Service Console:
1. Access to the Blockchain Service Console:
   - In the OCI services menu, select Developer Services and click on Blockchain Platform
   - Ensure that the right Compartment is selected and click on the founder or participant instance (the one you want to access).
   - Click the Service Console console button.
2- Once inside the ***Service Console*** go to the ***Nodes*** tab.It will show you all the nodes which composes this instance: 


<a name="initFT"/>

## Initialization of the eCrypto token (FT)

There is a set of administrative actions which are required before being able to execute the business methods.

The first action is initilize the chaincode indicating which user accounts will be allowed to execute administrative actions. To execute this action follow the below steps:
1. Retrieve the REST Proxy URL
2. 



We must create user accounts for all those users elegible to own eCrypto Tokens. In this simple use case there is only two users, eshop_manager and lessee1_manager, each of them belonging to one of the existing organizations of the network.



<a name="initNFT"/>

## Initialization of the eShopDevice token (NFT)



First administrative action is assign administrative users to the chaincode. Until this request  
Init admin accounts


We must create user accounts for all the users who can be custodians of the NFT assets representing the physical assets. In our use case there is only the eshop_manager user and the lessee1_manager user, each of them belonging to one of the organizations.




<a name="usecase1"/>

## Use case simulation - Successful renting


<a name="validation"/>

## Validation & Conclusions


