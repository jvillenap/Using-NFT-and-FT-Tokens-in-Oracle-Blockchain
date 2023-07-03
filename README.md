# Using NFT and FT Tokens in Oracle Blockchain
This HoL has been created to demonstrate how easily you can develop a solution without to much effort where FTs and/or NFTs were needed, thanks to Oracle Blockchain and the Oracle AppBuilder tool. Basically what we will do is create an eShop for rental of assets represented as Non-Fungible Tokens asking to pay using a digital coin represented as a Fungible Token, having both tokens stored and managed in the same blockchain network!

Non-Fungible Tokens (NFT) are unique digital identifiers that cannot be copied, substituted, or subdivided, recorded in a blockchain, and that is used to certify authenticity and custodianship. NFT is the perfect digital twin for whatever kind of physical or digital asset which can be used to track any usage, event, status change, or any other kind of peculiarity which makes sense to be tracked. Blockchain will provide an easily accesible inmutable history of the asset, which will be really valuable for whatever entity or person interested in the tracking performed on the asset itself.

Fungible Tokens (FT) are digital currencies designed to work as a medium of exchange through a computer network that is not reliant on any central authority, such as a government or bank, to uphold or maintain it. Using FTs you will be able to create whatever kind of echangable currency, controlling easily the accounting assinged to the users, and the privileges assigned to each participant to ensure a proper ussage of the network, obviously depending on the role of each user. 

Using Oracle Blockchain we can create in minutes an Hyperledger Fabric network as a founder, or join whatever existing Hyperledger Fabric network as a participant. For the purpose of this HoL, we are going to create a new network in which there will be two participants:
- *Founder of the network*: ***eshop***, a shop which rent assets.
- *One Participant*: ***lessee1***, a lessee who rents assets from the eshop organization.

<p align="center">
<img width="371" height="392" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/images/0-intro-2-1.png"/>
</p>

In this Hyperledger Fabric network we will create a dedicated channel to be used only for the smartcontracts related with our use case. This channel will be named ***rentalshop***, and obviously both existing participants of the network will join this channel:

<p align="center">
<img width="719" height="114" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/images/0-intro-2-2.png"/>
</p>

All the administrative taks will be easily executed thanks to the Service Console present for any Oracle Blockchain instances, one for the founder, and the other for the participant:

<p align="center">
<img width="994" height="526" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/images/0-intro-2-3.png"/>
</p>

In the other hand, App Builder is a toolset developed by Oracle which will help you to create your Smartcontracts abstracting you from all the intrinsic technical complexities, even more when you need to create NFT or FT tokens. So, leveraging Oracle Blockchain and AppBuilder you will reduce considerably the time to market for any idea in which NFTs and FTs would be the perfect fit.

<p align="center">
<img width="791" height="494" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/images/0-intro-2-4.png"/>
</p>

AppBuilder will help you to reduce considerably the complexity of the development, packaging, testing, and deployment of Hyperledger Fabric chaincodes, giving you the option to create them in different languages (TypeScript or Go).

<p align="center">
<img width="814" height="392" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/images/0-intro-2-5.png"/>
</p>

First of all we are going to create the smartcontract used to handle a cryptocurrency which will be represented as a Fungible Token (FT), and will be used to pay for the rented assets. Lessee will need to aquire tokens of this crypto to be able to rent the assets from the eshop. 

There will be a second smartcontract used to handle the Non-fungible token (NFT) which will be the digital representation in Blockchain of the real assets to be rented by the eShop company to the different lessees. 

Once each of the smartcontracts get created, we will install and deploy them into the different instances which compound the Blockchain Network created during the first lab.

Once all the tasks has been done, as Oracle Blockchain publishes all the smartcontract methods as REST APIs, we can execute a whole sample simulating the rental of an asset, just using Postman.

Here you have the links to each of the labs to fulfill this HoL:  

   [1. Create an Oracle Blockchain Network](../../blob/main/01-Create-The-Network/README.md)  
   [2. Preparation of Oracle App Builder development environment](../../blob/main/02-Prepare-Dev-Environment/README.md)  
   [3. Creation, Installation and Deployment of a SmartContract handling FTs](../../blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/README.md)  
   [4. Creation, Installation and Deployment of a SmartContract handling NFTs](../../blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/README.md)   
   [5. Test the SmartContracts using Postman](../../blob/main/05-Test-Smartcontract-Using-Postman/README.md)  


Enjoy it!
