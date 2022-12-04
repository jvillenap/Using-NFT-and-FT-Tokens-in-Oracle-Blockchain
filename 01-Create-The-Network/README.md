# Create an Oracle Blockchain Network

## Introduction

For the creation of an Hyperledger Fabric network based in Oracle Blockchain, you can use two different kinds of Oracle Blockchain instances:
- [Oracle Blockchain Cloud Service](https://www.google.com "Oracle Blockchain Cloud Service")
- [Oracle Blockchain Platform Enterprise Edition](https://www.oracle.com/blockchain/blockchain-platform-enterprise-edition/ "Oracle Blockchain Platform Enterprise Edition")

For simplicity in this HoL we are going to use the first, the Cloud Version. 

We are going to create two instances, the first instance will be the founder of a new Hyperledger Fabric network, acting as the owner of the assets which will be represented as NFTs and will be available to be rented, and the second one which will be a new participant attached participant of the network, who will represent the lessee of the assets from the first participant.

As a preassembled PaaS, Oracle Blockchain Platform includes all the dependencies required to provision and manage a blockchain network: compute, storage, containers, identity services, event services, and management services. Oracle Blockchain Platform also includes the blockchain network console to support integrated operations. This helps you start developing applications within minutes.

## Creation of the founder instance
1. In the OCI services menu, select 'Developer Services' and click on 'Blockchain Platform.'

![Select Blockchain Service from the OCI console]([https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/01-Create-The-Network/images/1-obp-2-1.png](https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/01-Create-The-Network/images/1-obp-2-1.png) "Select Blockchain Service from the OCI console")
