# Test the Smartcontracts using Postman

#### Table of Contents  
[Introduction](#Introduction)  
[Prerequisites](#Prerequisites)  
[Creation of the Founder instance](#createFounder)  
[Creation of the Participant instance](#createParticipant)  
[Add The Participant Organizations to the Blockchain Network](#partJoinNwk)  
[Create a Channel](#channelCreate)  
[Join Participant Organization - Peer Nodes to Channel](#joinPeersChannel)  
[Set Anchor Peers](#setAnchorPeers)  
[Create Participant Accounts](#createAcconts)  
[Create Enrollments - Perform on All REST Proxy nodes](#createEnrollments)  

<a name="Introduction"/>

## Introduction

In this last chapter we are going to demonstrate how easily we can do a full test of a use case using a REST Client like Postman.

When you are dealing with Tokens, there is a bunch of administrative actions to be executed before being able to execute business methods. 

Thanks to Oracle Blockchain, all the administrative actions ca be executed as API REST calls, so it simplify considerably the effort needed for the initialization.


, we need to prepare the chaincode... REST calls needed to prepare the chaincodes to be used, so, 

For the creation of an Hyperledger Fabric network based in Oracle Blockchain, you can use two different kinds of Oracle Blockchain instances:
- [Oracle Blockchain Cloud Service](https://www.google.com "Oracle Blockchain Cloud Service")
- [Oracle Blockchain Platform Enterprise Edition](https://www.oracle.com/blockchain/blockchain-platform-enterprise-edition/ "Oracle Blockchain Platform Enterprise Edition")
