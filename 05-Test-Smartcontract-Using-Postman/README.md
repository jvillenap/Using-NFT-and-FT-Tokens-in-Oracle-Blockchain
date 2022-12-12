# Test the Smartcontracts using Postman

#### Table of Contents  
[Introduction](#Introduction)  
[Prerequisites](#Prerequisites)  
[Initialization of the eCrypto token (FT)](#initFT)  
[Initialization of the eShopDevice token (NFT)](#initNFT)  
[Use case simulation - Successful renting](#usecase1)  
[Validation & Conclusions](#validation)  

<a name="Introduction"/>

## Introduction

In this last chapter we are going to demonstrate how easily we can do a full test of a use case using a REST Client like Postman.

When you are dealing with Tokens, there is a bunch of administrative actions to be executed before being able to execute your business methods. 

Thanks to Oracle Blockchain, all the administrative actions ca be executed as API REST calls, so it simplify considerably the effort needed for the initialization.

We are going to perform a "dummy" initialization just with the minimum requirements to do a basic test.


https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/tree/main/01-Create-The-Network#createEnrollments



<a name="Prerequisites"/>

## Prerequisites
- Postman or any other API REST client tool.
- Before the execution of any of the below steps we must create the enrollmentIDs into the REST Proxies for those users granted to access to the smartcontract methods. The enrollment is a mapping between the username who executes the REST API, and the accounts managed internally by blockchain to which Tokens will be assigned.

  These enrollmentIDs have been already created as the last step of chapter 1.

  To make it more easy, enrollmentID can be set with the same value as the own user name.



<a name="initFT"/>

## Initialization of the eCrypto token (FT)

There is a set of administrative actions which are required before being able to execute the business methods.




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


