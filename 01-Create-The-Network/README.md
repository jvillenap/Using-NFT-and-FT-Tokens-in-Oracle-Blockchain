# Create an Oracle Blockchain Network

#### Table of Contents  
[Introduction](#Introduction)  
[Prerequisites](#Prerequisites)  
[Creation of the Founder instance](#createFounder)  
[Creation of the Participant instance](#createParticipant)  
[Add The Participant Organizations to the Blockchain Network](#partJoinNwk)  
[Create a Channel](#channelCreate)
[Join Participant Organizations - Peer Nodes to Channel](#joinPeersChannel)
[Set Anchor Peers](#setAnchorPeers)
[Create Participant Accounts and Enrollments](#createAcconts)

<a name="Introduction"/>

## Introduction

For the creation of an Hyperledger Fabric network based in Oracle Blockchain, you can use two different kinds of Oracle Blockchain instances:
- [Oracle Blockchain Cloud Service](https://www.google.com "Oracle Blockchain Cloud Service")
- [Oracle Blockchain Platform Enterprise Edition](https://www.oracle.com/blockchain/blockchain-platform-enterprise-edition/ "Oracle Blockchain Platform Enterprise Edition")

For simplicity in this HoL we are going to use the first option, the Cloud Version. 

We are going to create two instances, the first instance will be the founder of a new Hyperledger Fabric network, acting as the owner of the assets which will be represented as NFTs and will be available to be rented, and the second one which will be a new participant attached participant of the network, who will represent the lessee of the assets.

As a preassembled PaaS, Oracle Blockchain Platform includes all the dependencies required to provision and manage a blockchain network: compute, storage, containers, identity services, event services, and management services. Oracle Blockchain Platform also includes the blockchain network console to support integrated operations. This helps you start developing applications within minutes.

<a name="Prerequisites"/>

## Prerequisites
- Access to an Oracle Cloud tenancy

<a name="createFounder"/>

## Creation of the Founder instance
1. In the OCI services menu, select ***Developer Services*** and click on ***Blockchain Platform***.
![Select Blockchain Service from the OCI console](https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/01-Create-The-Network/images/1-obp-2-1.png "Select Blockchain Service from the OCI console")

2. From the compartment combo selector located in the left side of the OCI Console, ensure the compartment where you want to create the instance is selected:
<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img width="283" height="257" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/01-Create-The-Network/images/1-obp-2-2.png"/>
</p>

3. Press the button Create Blockchain Platform.
![Press the button Create Blockchain Platform](https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/01-Create-The-Network/images/1-obp-2-3.png "Press the button Create Blockchain Platform")

4. Give your platform a Display Name (e.g. 'eshop'), optionally add a Description, and keep the remaining default selections, as they are the settings to create a Founder instance, which will be the founder of a new Hyperledger Fabric Network, and using the standard shape, which has exactly the same functionality as the Enterprise shape but at a lower cost, but perfectly valid for development work. Click 'Create'.
<p align="center">
<img width="727" height="848" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/01-Create-The-Network/images/1-obp-2-4.png"/>
</p>

5. Once pushed the 'Create' button, the creation of the instance for this Organization (e-shop) has been submited, and will be ready in a few minutes:
<p align="center">
<img width="834" height="415" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/01-Create-The-Network/images/1-obp-2-5.png"/>
</p>

6. When the Founder instance gets created, you will be able to access to the Oracle Blockchain console for this instance by pushing the 'Service Console' button:
<p align="center">
<img width="833" height="417" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/01-Create-The-Network/images/1-obp-2-6.png"/>
</p>

<a name="createParticipant"/>

## Creation of the Participant instance
For the creation of a first participant, you must follow the same steps as per the founder instance, but stating in the creation page that this is an instance which is going to ***Join an Existing Network***.
<p align="center">
<img width="721" height="846" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/01-Create-The-Network/images/1-obp-2-7.png"/>
</p>

Once this participant instance gets created, you will be able to access to the Oracle Blockchain console for this second instance by pushing the 'Service Console' button:
<p align="center">
<img width="833" height="417" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/01-Create-The-Network/images/1-obp-2-8.png"/>
</p>

<a name="partJoinNwk"/>

## Add The Participant Organizations to the Blockchain Network

<a name="channelCreate"/>

## Create a Channel

<a name="joinPeersChannel"/>

## Join Participant Organizations - Peer Nodes to Channel

<a name="setAnchorPeers"/>

## Set Anchor Peers

<a name="createAcconts"/>

## Create Participant Accounts and Enrollments
