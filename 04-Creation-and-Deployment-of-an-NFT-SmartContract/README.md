# Creation and Deployment of a SmartContract handling NFTs

#### Table of Contents  
[Introduction](#Introduction)  
[Creation of the Smartcontract to handle the assets to be rented (NFTs)](#CreationNFTchaincode)  
[Deployment of the NFT Smartcontract into the Founder instance](#DeploymentNFTchaincodeFounder)  
[Deployment of the NFT Smartcontract into the Participant instance](#DeploymentNFTchaincodeParticipant)

<a name="Introduction"/>

## Introduction
In this chapter we are going to create the smartcontract used to handle the NFT token which will be the digital representation in Blockchain of the asset to be rented by an eShop to the different lessees. Once the smatcontract gets created, we will install and deploy it into the different instances which compound the Blockchain Network created in the first chapter. 

NFT tokens most of the times are created as digital twins of physical or digital assets, so NFT must reflect what is occurring to the physical or digital asset and be tracked accordingly to its reality. In this sense the NFT gives an extra value to the physical/digital asset, as the information provided by the NFT representing the asset is information which can not be refused as per the contribution of the blockchain technology to it.

<a name="CreationNFTchaincode"/>

## Creation of the Smartcontract to handle the assets to be rented (NFTs)
Once you have AppBuilder ready to be used, you can begin to create what is named the ***specification file***. The specification file can be created as a simple YAML file. Here below you can see the specification file for the NFT smartcontract:

```yaml
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

You can download this specification file from [WEDOeShopDeviceNFT.yml](./src/WEDOeShopDeviceNFT.yml). 

In this sample specification file you can see all the sections and attributes for a representation of an NFT token. Just as a first overview of the sections defined in the file: 
- ***Assets***: Place where the different assets (standard entities, FTs, NFTs) are defined. Inside each of the assets we can distingish different sections which can vary depending on the kind of represented asset. For NFTs and FTs these are the different subsections:
  - ***Type/Symbol/Standard***: You must indicate in these properties that this token is based in the ERC-721 Standard, and give to it a unic symbol indentifier.
  - ***Anatomy***: In this section you specify it is a non-fungible token (NFT) and whether it would be subdivided into smaller fractions (nowadays "whole" is the only option for NFT tokens).
  - ***Behavior***: In this section is where must be defined if the token can be minted, and in such case, which is the maximum number of mintable tokens. Here you must also state it is an indivisible token, if is singleton for each class, transferable, and burnable which is similar to its deletion, but not disapearing, so it is still there but not usable at all. Also in this section you can restrict token behaviors to specific roles.
  - ***Metadata***: This section define a sort of prpoperties which must be set during token creation, and can not be changed in the future. So its value will remain inmutable for the whole life of the token (i.e.: manufacturer, .
  - ***Properties***: Standard attributes of the token which can vary during the life of the token. 
- ***customMethods***: Place where a list of non estandard methods are defined. For those methods AppBuilder will only generate the signature of the method, without any implementation on them. The implementation of these methods are the only code the be implemented by the developer.

You can see how to configure any kind of entity (NFT, FT, or standard entities) based in your business needs in the following links:
- For standard entities you can see in [How to create an Input Specification File](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/input-configuration-file.html) all the details about how to create it.
- If you want to create an entity represented as a Non-Fungible Token you can see in [Input Specification File for Non-Fungible Tokens](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/input-specification-file-non-fungible-tokens.html) how to define it. 
- If what you want to create is an entity represented as a Fungible Token you can see [Input Specification File for Fungible Tokens](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/input-specification-file-fungible-tokens.html) how to define it.

You can combine different entities in the same smartcontract, but nowadays NFT and FT tokens cannot coexist in the same smartcontract. This is a feature which is in the roadmap, but still not there. So, if we have a use case like the sample we are developing in this HoL, we will need to create two differente smartcontracts, one for the NFT token, and another one for the FT token. It does not mean we are not going to be able to execute transactions affecting tokens from both smartcontracts, thanks to the possibility to execute methods from one smartcontract through the other we can execute, for example in a single transaction a transfer of FT tokens based on a property change on one NFT token. One example is a diposit charge done to the lessee in the moment in which the booking of the asset is requested. In the custom method where the booking is done, a charge of eCrypto tokens is done to the lessee by executing the following call from the NFT Smartcontract against the FT Smartcontract:

```javascript
// Charge a Deposit to the lessee
//                               ChaincodeName    ChaincodeMethod   args                                                                          Channel
await oChainUtil.invokeChaincode("eShopCriptoFT", "transferECoins", [ftTokenId, fromOrgId, fromUserId, toOrgId, toUserId, String(depositAmount)], "rentalshop");

```

To be able to use this method, first of all you must import a supporting library already included in the scaffold of the project:
```javascript
import { OChainUtils } from '../../lib/utils';
```

Once the Specification file has been created we can mandate AppBuilder to create the scaffold of the project by following the next steps:

1. If the Specification File has been created outside of App Builder, first of all we will need to import the Specification file into AppBuilder. Push the three dots (***...*** on the upper-right corner of the ***SPECIFICATIONS*** frame of AppBuilder, and from the popup click in the ***Import Specification***: 
<p align="center">
<img width="1024" height="718" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-1.png"/>
</p>

2. Select the specification file just created, and push the button ***Import Specification***.
<p align="center">
<img width="848" height="300" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-2.png"/>
</p>

3. To be able to create a new chaincode project based on the imported specification file, we must push the plus icon (***+*** on the upper-right corner of the ***CHAINCODES*** frame of AppBuilder. It will open the ***Create Chaincode*** wizard: 
<p align="center">
<img width="960" height="675" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-3.png"/>
</p>

4. In the ***Create Chaincode*** wizard you must specify the following details, and after specifying the details push the ***Create*** button:
 - **Name**: name for the project.
 - **Language**: In which language you want AppBuilder creates the scaffold of the project. Nowadays you can only select between Typescript and GoLang. As we are providing in Typescript the implementation of the custom methods, we recomend here to select the same language (Typescript).
 - **Specification**: You must select the specification file we just created in the previous steps.
 - **Location/Domain**: Depending on the selected language you will be prompted to define the location where the project will be placed for the Typescript language, or the domain for the GoLang language.  

<p align="center">
<img width="601" height="408" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-4.png"/>
</p>

5. If everything goes fine, we should se a green message in the wizard. If this is not the case we should check the output generated during the creation of the scaffold of the project:
<p align="center">
<img width="611" height="436" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-5.png"/>
</p>

6. In the ***CHAINCODES*** section we should see the new generated project (in my case: eShopDeviceNFT). Clicking in the project, we should be able to navigate to the src folder inside the project, where the source code has been generated:

   - Inside the ***src/controller*** folder we will see the main class representing our smartcontract, with all the autogenerated methods to manage our entities.
   - Inside the ***src/model*** folder we will see the class representing the NFT entity.

<p align="center">
<img width="334" height="587" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-6.png"/>
</p>

7. Going to the folder ***src/controller***, and selecting the controlled class, we will see all the code auto-generated by AppBuilder, and going to the end of the file, we will see all the signatures of the custom methods without implementation on them:
<p align="center">
<img width="998" height="606" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-7.png"/>
</p>

8. At this point we should create the implementation of these custom methods. For simplicity we provide all the implementation for such methods in the  file [NFT_CustomMethods.ts](./src/NFT_CustomMethods.ts) , so we only need to substitute the signatures autogenerated by AppBuilder, by the content on the referenced file.

Remember to include the following import at the begining of the class to be able to invoke methods from other smartcontracts into the classes of our smartcontract (already mentioned before):
```javascript
import { OChainUtils } from '../../lib/utils';
```

There is also important to bare in mind there is a couple of traverse calls from a couple of the custom methods of this Smartcontract to one of the methods of the FT Smartcontract. Those calls can be identified in the controller class because it is executing a ***oChainUtil.invokeChaincode*** method. In this calls the parameters of the call includes the following information:
 - ChaincodeName: String
 - ChaincodeMethod: String
 - args: String[]
 - Channel: String

Some of the values of these parameters has been set at source code, so if they are changed we should be carefull to also change the code:
 - ChaincodeName set to ***eShopCriptoFT***. If the FT chaincode is deployed with a different name, this parameter must be changed consequently.
 - ChaincodeMethod: set to ***transferECoins***.
 - args: Are populated based on the accounts created in the network, so no worries about them.
 - Channel: set to ***rentalshop***. If you change the name of the channel where smartcontracts are deployed, also this parameter must be changed.


The Controller class, before the custom methods, includes all the auto-generated methods to manage the lifecycle of the NFT tokens. The following picture depicts the different areas covered by such methods:
<p align="center">
<img width="960" height="390" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-8.png"/>
</p>

At this point the chaincode is ready to be used, so we can deploy and test the chaincode locally by following the instructions from [Test Your Chaincode on a Local Hyperledger Fabric Network](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/test-your-chaincode-using-visual-studio-code.html) link. 

<a name="DeploymentNFTchaincodeFounder"/>

## Deployment of the NFT Smartcontract into the Founder Instance

Once you have tested locally the chaincode, we can proceed by deploying it in the real network we previously created using the Oracle Blockchain Service Console. The summarize of the actions to be executed are:
 - Package the chaincode project.
 - Install and Deploy the chaincode package into the founder instance.
 - Install and Deploy the chaincode package into the participant instance.

1. First of all we must create the deployable package from the chaincode project. From Visual Studio, push the right button on top of the name of the chaincode project, from the popup menu select the ***Package*** option, and select the directory to save the chaincode package file:
<p align="center">
<img width="989" height="566" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-9.png"/>
</p>

2. Now we are going to access to the ***Oracle Blockchain Service Console*** to install and deploy the chaincode package into the Founder instance:
   - https://eshop-TenancyName-RegionName.blockchain.ocp.oraclecloud.com:7443/
     -  note: Remember how you can get the Oracle Blockchain Services Console URL:
        - In the OCI services menu, select ***Developer Services*** and click on ***Blockchain Platform***
        - Ensure that the right Compartment is selected and click on the founder instance.
        - Click the ***Service Console*** console button.

3. Navigate to the ***Chaincode*** tab, and push the ***Deploy a New Chaincode*** button:
<p align="center">
<img width="773" height="402" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-10.png"/>
</p>

4. Select the ***Advanced Deployment*** option:
<p align="center">
<img width="614" height="311" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-11.png"/>
</p>

5. Set all the values to Install the chaincode package into the Founder instance and push the ***Next*** button:
   - **Package Label**: Give a name which can help you identify which package is installed in the different existing channels. As you can have more than one version of the same smartcontract deployed in different channels, it is a good practice to set a label like: 

   ```
   <smartContractName>_<channel>_<version>
   ```

   - **Chaincode Language**: Select among the different languages, based in the language in which you have developed the chaincode.
   - **Target Peers**: Select the peers in which you want to install the chaincode package.
   - **Is Packaged Chaincode**: Leave this box unselected if what you are going to upload is a zip file. Select the checkbox for tar.gz files.
   - **Chaincode Source**: Push the ***Upload Chaincode File*** to be able to navigate in your file system to select the chaincode zip file.  
<p align="center">
<img width="982" height="510" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-12.png"/>
</p>

6. If the installation succeed we will see the below success message. Then, next step is the deployment of the chaincode in the selected channel, so you must set all the values related with the deployment phase and push the ***Next*** button:
   - **Channel**: Select the channel in which you want to deploy the smartcontract. 
   - **Chaincode Name**: Set the name with which the smartcontract will be deployed on the channel. 
   - **Version**: Asign a number to this deployment, which is aligned with the installed package installed before. In this way you will be able to correlate packages installed with chaincodes deployed in the different channels.
   - **Init-required**: Select this checkbox if the init method of the chaincode needs to be invoked before allow user transactions.
   - **Endorsement Policy**: You can specify Endorsment policies during deployment, but for the purpose of this HoL we do not need them.
   - **Private Data Collection**: You can set Private Data Collections, but for the purpose of this HoL we do not need them.
<p align="center">
<img width="982" height="510" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-13.png"/>
</p>

7. If the deployment succeed, after closing the installation and deployment, you should see how the package has been installed in the two peers of the instance, and also has been deployed in one of the channels:
<p align="center">
<img width="761" height="285" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-14.png"/>
</p>

<a name="DeploymentNFTchaincodeParticipant"/>

## Deployment of the NFT Smartcontract into the Participant Instance

The chaincode is ready to be used from the Founder instance, but still not from the Participant instance. Now, we are goin go to install and accept, rather than deploy, the chaincode package into the Participant instance:

1. Access the ***Blockchain Service Console*** for the ***lessee1*** instance:
<p align="center">
<img width="770" height="312" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-15.png"/>
</p>

2. Click the ***Channels*** tab and then the ***rentalshop*** channel:
<p align="center">
<img width="762" height="290" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-16.png"/>
</p>

3. Select on ***Deployed Chaincodes*** on the left-hand navigation pane. You will see that 1 chaincode has been ***committed*** to the channel, but has not yet been ***approved*** by the participant organization.
<p align="center">
<img width="762" height="295" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-17.png"/>
</p>

4. Now click the ***Chaincodes*** tab and then ***Deploy a New Chaincode*** button.
<p align="center">
<img width="762" height="280" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-18.png"/>
</p>

5. Select ***Advanced Deployment***.
<p align="center">
<img width="614" height="311" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-19.png"/>
</p>

6. Fill out the form as follows:
   - ***IMPORTANT***: All the participants which will share the same smartcontract deployed in a specific channel, must set the same name for the ***Package Label***. So, if in the founder instance we set the the value ***eShopDeviceNFT_rentalshop_v1***, here for lessee1 participant we will be exactly the same package name.

<p align="center">
<img width="991" height="377" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-20.png"/>
</p>

   - Set ***Node*** as ***Chaincode Language***.
   - Select both available peers as the ***Target Peers***.
   - Upload the package .zip file you exported from the App Builder VS Code extension.
   - Click ***Next***

<p align="center">
<img width="613" height="368" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-21.png"/>
</p>

7. Click ***Close***. We will only be installing (not deploying) the chaincode onto the participant instance.
<p align="center">
<img width="613" height="368" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-22.png"/>
</p>

8. Now click ***Channels*** tab, then click on the ***rentalshop*** channel, and navigate to 'Deployed Chaincodes' as you did in steps 3 and 4.

9. Find and click on the hamburger icon on the right of the row containing our chaincode. Select ***Approve***.
<p align="center">
<img width="762" height="330" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-23.png"/>
</p>

10. In the Approve wizard you only need to specify the chaincode package you want to use, which obviously is the one we have just installed. 
<p align="center">
<img width="981" height="483" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-24.png"/>
</p>

   - Additionaly you could specify ***Endorsement Policies***, or ***Private Data Collections***, but for the purpose of this HoL we are not going to set any of them: 
     - You can see more information about ***Endorsement Policies*** at [Specify an Endorsement Policy](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/specify-endorsement-policy1.html)
     - You can see more information about ***Private Data Collections*** at [What Are Private Data Collections?](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/what-are-private-data-collections.html)

11. Check that the chaincode has now been approved by the lessee participant.
<p align="center">
<img width="984" height="65" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/04-Creation-and-Deployment-of-an-NFT-SmartContract/images/4-nft-2-25.png"/>
</p>
