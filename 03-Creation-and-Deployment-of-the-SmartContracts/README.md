# Creation and Deployment of the SmartContracts

#### Table of Contents  
[Introduction](#Introduction)  
[Creation of the Smartcontract to handle the NFT](#CreationNFTchaincode)  

<a name="Introduction"/>

## Introduction
In this chapter we are going to create the smartcontract packages, and we are going to deploy them in the different instances which compound the Blockchain Network created in the first chapter.


<a name=#CreationNFTchaincode/>

First of all we are going to create the smartcontract used to handle the NFT token which will be the digital representation in Blockchain of the asset to be rented by the ***eshop organization*** to the ***lessee1 organization***.

NFT tokens most of the times are created as digital twins of physical or digital assets, so NFT must reflect what is occurring to the physical or digital asset and be tracked accordingly to its reality. In this sense the NFT gives an extra value to the physical/digital asset, as the information provided by the NFT representing the asset is information which can not be refused as per the contribution of the blockchain technology to it.

Once you have AppBuilder ready to be used, you can begin to create what is named the ***specification file***. The specification file can be created as a simple YAML file. Here below you can see the specification file for the NFT smartcontract:

```
#
# Token asset to manage the complete lifecycle of a non-fungible token representing rentable devices. 
# This specification file will generate non-fungible token for rentable devices.
#
assets:
    - name: rentableDeviceNFT #Asset name
      type: token #Asset type
      symbol: rentdev         # Token symbol
      standard: erc721+   # Token standard
      
      anatomy:
          type: nonfungible # Token type
          unit: whole  #Token unit
      
      behavior:
        - indivisible                
        - singleton                   
        - mintable:                   
        - transferable                
        - burnable
        - roles:
            minter_role_name: minter
      
      properties:  # Custom asset attributes for non-fungible token 

          - name: contractStartTime  # Custom asset attribute to register the contract start time
            type: date

          - name: contractEndTime # Custom asset attribute to register the contract end time
            type: date

          - name: bookingStartTime # Custom asset attribute to set the booking start time
            type: date

          - name: actualEndTime # Custom asset attribute to set the actual end time 
            type: date

          - name: contractViolationFlag # Custom asset attribute maintains non-fungible token contract violation flag. 1 means contract was violated.
            type: boolean

          - name: lockingFlag # Custom asset attribute maintains non-fungible token locking flag. 1 means NFT is locked.
            type: boolean

          - name: bookingFlag # Custom asset attribute maintains non-fungible token booking flag. 1 means NFT is booked.
            type: boolean

          - name: bookingAmount # Custom asset attribute maintains non-fungible token booking flag. 1 means NFT is booked.
            type: number

          - name: bookingId # Custom asset attribute maintains non-fungible token booking flag. 1 means NFT is booked.
            type: number

          - name: deductionAmount # Custom asset attribute maintains non-fungible token booking flag. 1 means NFT is booked.
            type: number

          - name: rentalAmount # Custom asset attribute maintains non-fungible token booking flag. 1 means NFT is booked.
            type: number

          - name: returnedAmount # Custom asset attribute maintains non-fungible token booking flag. 1 means NFT is booked.
            type: number

          - name: vibration # Custom asset attribute maintains non-fungible token booking flag. 1 means NFT is booked.
            type: string

          - name: humidity # Custom asset attribute maintains non-fungible token booking flag. 1 means NFT is booked.
            type: string

          - name: speed # Custom asset attribute maintains non-fungible token booking flag. 1 means NFT is booked.
            type: string

          - name: longitude # Custom asset attribute maintains non-fungible token booking flag. 1 means NFT is booked.
            type: string

          - name: latitude # Custom asset attribute maintains non-fungible token booking flag. 1 means NFT is booked.
            type: string
      
      metadata: # To maintain the metadata on-chain, this tag will be used. 
          
          - name: deviceId
            type: string
          
          - name: description
            type: string
          
          - name: manufacturer
            type: string

          - name: manufacturingDate
            type: date

customMethods:
    - executeQuery
    - "receiveDevice(tokenId: string, fromOrgId: string, fromUserId: string, toOrgId: string, toUserId: string, contractStartTime: Date, contractEndTime: Date)" # Receiving of rented device NFT from the eshop company. 
    - "returnDevice(nftTokenId: string, ftTokenId: string, fromOrgId: string, fromUserId: string, toOrgId: string, toUserId: string, returnTime: Date, deductAmount: boolean, deductionOrChargeAmount: number)" # Returning of device NFT to the rental company. eCurrency is charged/deducted based in difference of deposit done and total cost of the rental. 
    - "lockDevice(tokenId: string)"  # Locking the device NFT
    - "unlockDevice(tokenId: string)" # Unlock the device NFT
    - "bookDevice(tokenId: string, bookingDate: Date, bookingAmount: number, bookingId: number, depositAmount: number)" #booking the rented device, and eCurrency charged is done as deposit of the rental.
    - "setIoTParameters(tokenId: string, vibration?: string, humidity?: string, speed?: string, longitude?: string, latitude?: string)" #Setting IoT parameters
    - "resetCustomParameters(tokenId: string)" # Reset custom parameters
    - "getTokenHistoryByBookingId(tokenId: string, bookingId: number)" #get the token History for a specific device and rental contract

```
In this sample specification file you can see all the sections and attributes for a representation of an NFT token. Just as a first overview of the sections defined in the file: 
- ***Assets***: Place where the different assets (standard entities, FTs, NFTs) are defined. Inside each of the assets we can distingish different sections which can vary depending on the kind of represented asset. For NFTs and FTs these are the different subsections:
  - ***Type/Symbol/Standard***: You must indicate in these properties that this token is based in the ERC-721 Standard, and give to it a unic symbol indentifier.
  - ***Anatomy***: In this section you specify it is a non-fungible token (NFT) and whether it would be subdivided into smaller fractions ("whole" is the only option for NFT tokens).
  - ***Behavior***: In this section is where must be defined if the token can be minted, and in such case, which is the maximum number of mintable tokens. Here you must also state it is an indivisible token, if is singleton for each class, transferable, and burnable which is similar to its deletion, but not disapearing, so it is still there but not usable at all. Also in this section you can restrict token behaviors to specific roles.
  - ***Metadata***: This section define a sort of prpoperties which must be set during token creation, and can not be changed in the future. So its value will remain inmutable for the whole life of the token (i.e.: manufacturer, .
  - ***Properties***: Standard attributes of the token which can vary during the life of the token. 
- ***customMethods***: Place where a list of non estandard methods are defined. For those methods AppBuilder will only generate the signature of the method, without any implementation on them. The implementation of these methods are the only code the be implemented by the developer.

You can see how to configure any kind of entity (NFT, FT, or standard entities) based in your business needs in the following links:
- For standard entities you can see in [How to create an Input Specification File](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/input-configuration-file.html) all the details about how to create it.
- If you want to create an entity represented as a Non-Fungible Token you can see in [Input Specification File for Non-Fungible Tokens](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/input-specification-file-non-fungible-tokens.html) how to define it. 
- If what you want to create is an entity represented as a Fungible Token you can see [Input Specification File for Fungible Tokens](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/input-specification-file-fungible-tokens.html) how to define it.

You can combine different entities in the same smartcontract, but nowadays NFT and FT tokens cannot coexist in the same smartcontract. This is a feature which is in the roadmap, but still not there. So, if we have a use case like the sample we are developing in this HoL, we will need to create two differente smartcontracts, one for the NFT token, and another one for the FT token. It does not mean we are not going to be able to execute transactions affecting tokens from both smartcontracts, thanks to the possibility to execute methods from one smartcontract through the other, we can execute for example in a single transaction a transfer of FT tokens based on a property change on one NFT token. ***We will see this feature in one of the custom methods of one of our smartcontracts!!!***











PROCEDURE TO load your SPECFILE INTO APPBUILDER AND CREATION OF THE CHAINCODE PROJECT.



Once you create your chaincode project based in the specification file, you will get more than 30 auto-generated methods to execute the following actions:
<<<foto de las verticales de NFT!!!>>>






Now our chaincode project is ready to be deployed locally or remotely and tested locally with the VS Code extension, or remotely using Postman or any other REST/JSON tool, but if you need to add any custom logic ....








