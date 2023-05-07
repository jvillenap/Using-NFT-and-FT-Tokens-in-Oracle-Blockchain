# Creation and Deployment of a SmartContract handling FTs

#### Table of Contents  
[Introduction](#Introduction)  
[Creation of the Smartcontract to handle the cryptocurrency (FT) used to pay for the rents](#CreationFTchaincode)  
[Deployment of the FT Smartcontract into the Founder instance](#DeploymentFTchaincodeFounder)  
[Deployment of the FT Smartcontract into the Participant instance](#DeploymentFTchaincodeParticipant)


<a name="Introduction"/>

## Introduction
First of all we are going to create the smartcontract used to handle a cryptocurrency which will be represented as a Fungible Token (FT), and will be used to pay for the rents. Lessee will need to aquire tokens of this crypto to be able to rent the assets from the eshop. This smartcontract will be deployed into the different instances which compound the Blockchain Network created in the first chapter.

FT is a digital currency designed to work as a medium of exchange through a computer network that is not reliant on any central authority, such as a government or bank, to uphold or maintain it.

Using FTs you will be able to create whatever kind of echangable currency, controlling easily the accounting assinged to the users, and the privileges assigned to each participant to ensure a proper ussage of the network, obviously depending on the role of each user. 

<a name="CreationFTchaincode"/>

## Creation of the Smartcontract to handle the cryptocurrency (FT) used to pay for the rents
Once you have AppBuilder ready to be used, you can begin to create what is named the ***specification file***. The specification file can be created as a simple YAML file. Here below you can see the specification file we are going to use for the FT smartcontract:

```yaml
assets:
    - name: ecrypto # Asset name
      type: token  # Asset type

      anatomy: 
          type: fungible # Token type
          unit: fractional # Token unit

      behavior: # Token behaviors
          - divisible: 
                decimal: 0  
          - mintable:
          - transferable
          - burnable 
          - roles: 
                minter_role_name: minter 

      properties:
          - name: description
            type: string

customMethods:
    - executeQuery
    - "transferECoins(token_id: string, from_org_id: string, from_user_id: string,  to_org_id: string, to_user_id: string, quantity: number)" # Transfer tokens between accounts. 

```

You can download this specification file from [WEDOeCryptoFT.yml](./src/WEDOeCryptoFT.yml). 

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
<img width="1024" height="718" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-1.png"/>
</p>

2. Select the specification file just created, and push the button ***Import Specification***.
<p align="center">
<img width="964" height="176" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-2.png"/>
</p>

3. To be able to create a new chaincode project based on the imported specification file, we must push the plus icon (***+*** on the upper-right corner of the ***CHAINCODES*** frame of AppBuilder. It will open the ***Create Chaincode*** wizard: 
<p align="center">
<img width="960" height="675" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-3.png"/>
</p>

4. In the ***Create Chaincode*** wizard you must specify the following details, and after specifying the details push the ***Create*** button:
 - **Name**: name for the project.
 - **Language**: In which language you want AppBuilder creates the scaffold of the project. Nowadays you can only select between Typescript and GoLang. As we are providing in Typescript the implementation of the custom methods, we recomend here to select the same language (Typescript).
 - **Specification**: You must select the specification file we just created in the previous steps.
 - **Location/Domain**: Depending on the selected language you will be prompted to define the location where the project will be placed for the Typescript language, or the domain for the GoLang language.  

<p align="center">
<img width="601" height="408" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-4.png"/>
</p>

5. If everything goes fine, we should se a green message in the wizard. If this is not the case we should check the output generated during the creation of the scaffold of the project:
<p align="center">
<img width="601" height="436" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-5.png"/>
</p>

6. In the ***CHAINCODES*** section we should see the new generated project (in my case: eShopCriptoFT). Clicking in the project, we should be able to navigate to the src folder inside the project, where the source code has been generated:

   - Inside the ***src/controller*** folder we will see the main class representing our smartcontract, with all the autogenerated methods to manage our entities.
   - Inside the ***src/model*** folder we will see the class representing the FTs.

<p align="center">
<img width="334" height="587" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-6.png"/>
</p>

7. Going to the folder ***src/controller***, and selecting the controller class, we will see all the code auto-generated by AppBuilder, and going to the end of the file, we will see all the signatures of the custom methods without any implementation on them:
<p align="center">
<img width="992" height="582" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-7.png"/>
</p>

8. At this point we should create the implementation of these custom methods. For simplicity we provide all the implementation for such methods in the  file [FT_CustomMethods.ts](./src/FT_CustomMethods.ts) , so we only need to substitute the signatures autogenerated by AppBuilder, by the content on the referenced file.
<p align="center">
<img width="992" height="582" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-7b.png"/>
</p>

At this point the chaincode is ready to be used, so we can deploy and test the chaincode locally by following the instructions from [Test Your Chaincode on a Local Hyperledger Fabric Network](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/test-your-chaincode-using-visual-studio-code.html) link. 

<a name="DeploymentFTchaincodeFounder"/>

## Deployment of the FT Smartcontract into the Founder Instance

Once you have tested locally the chaincode, we can proceed by deploying it in the real network we previously created using the Oracle Blockchain Service Console. The summarize of the actions to be executed are:
 - Package the chaincode project.
 - Install and Deploy the chaincode package into the founder instance.
 - Install and Deploy the chaincode package into the participant instance.

1. First of all we must create the deployable package from the chaincode project. From Visual Studio, push the right button on top of the name of the chaincode project, from the popup menu select the ***Package*** option, and select the directory to save the chaincode package file:
<p align="center">
<img width="911" height="688" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-9.png"/>
</p>

2. Now we are going to access to the ***Oracle Blockchain Service Console*** to install and deploy the chaincode package into the Founder instance:
   - https://eshop-TenancyName-RegionName.blockchain.ocp.oraclecloud.com:7443/
     -  note: Remember how you can get the Oracle Blockchain Services Console URL:
        - In the OCI services menu, select ***Developer Services*** and click on ***Blockchain Platform***
        - Ensure that the right Compartment is selected and click on the founder instance.
        - Click the ***Service Console*** console button.

3. Navigate to the ***Chaincode*** tab, and push the ***Deploy a New Chaincode*** button:
<p align="center">
<img width="773" height="402" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-10.png"/>
</p>

4. Select the ***Advanced Deployment*** option:
<p align="center">
<img width="614" height="311" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-11.png"/>
</p>

5. Set all the values to Install the chaincode package into the Founder instance and push the ***:
   - **Package Label**: Give a name which can help you identify which package is installed in the different existing channels. As you can have more than one version of the same smartcontract deployed in different channels, it is a good practice to set a label like: 

   ```
   <smartContractName>_<channel>_<version>
   ```

   - **Chaincode Language**: Select among the different languages, based in the language in which you have developed the chaincode.
   - **Target Peers**: Select the peers in which you want to install the chaincode package.
   - **Is Packaged Chaincode**: Leave this box unselected if what you are going to upload is a zip file. Select the checkbox for tar.gz files.
   - **Chaincode Source**: Push the ***Upload Chaincode File*** to be able to navigate in your file system to select the chaincode zip file.  
<p align="center">
<img width="994" height="515" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-12.png"/>
</p>

6. If the installation succeed we will see the below success message. Then, next step is the deployment of the chaincode in the selected channel, so you must set all the values related with the deployment phase and push the ***Next*** button:
   - **Channel**: Select the channel in which you want to deploy the smartcontract. 
   - **Chaincode Name**: Set the name with which the smartcontract will be deployed on the channel. 
   - **Version**: Asign a number to this deployment, which is aligned with the installed package installed before. In this way you will be able to correlate packages installed with chaincodes deployed in the different channels.
   - **Init-required**: Select this checkbox if the init method of the chaincode needs to be invoked before allow user transactions.
   - **Endorsement Policy**: You can specify Endorsment policies during deployment, but for the purpose of this HoL we do not need them.
   - **Private Data Collection**: You can set Private Data Collections, but for the purpose of this HoL we do not need them.
<p align="center">
<img width="978" height="507" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-13.png"/>
</p>

7. If the deployment succeed, yo should see the following screen: 
<p align="center">
<img width="917" height="437" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-13b.png"/>
</p>

8. Sometimes can occur, the wizard indicates that the deployment is taking to much time, so the wizard will ask you to close the wizard without verifying if the chaincode has been deployed successfully. So, after closing the installation and deployment wizard, you should check if the package has been installed in the two peers of the instance, and also has been deployed in one of the channels:
<p align="center">
<img width="998" height="479" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-14.png"/>
</p>

<a name="DeploymentFTchaincodeParticipant"/>

## Deployment of the FT Smartcontract into the Participant Instance

The chaincode is ready to be used from the Founder instance, but still not from the Participant instance. Now, we are going to install and accept, rather than deploy, the chaincode package into the Participant instance:

1. Access the ***Blockchain Service Console*** for the ***lessee1*** instance:
<p align="center">
<img width="770" height="312" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-15.png"/>
</p>

2. Click the ***Channels*** tab and then the ***rentalshop*** channel:
<p align="center">
<img width="762" height="290" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-16.png"/>
</p>

3. Select on ***Deployed Chaincodes*** on the left-hand navigation pane. You will see that 1 chaincode has been ***committed*** to the channel, but has not yet been ***approved*** by the participant organization.
<p align="center">
<img width="1001" height="585" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-17.png"/>
</p>

4. Now click the ***Chaincodes*** tab and then ***Deploy a New Chaincode*** button.
<p align="center">
<img width="762" height="280" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-18.png"/>
</p>

5. Select ***Advanced Deployment***.
<p align="center">
<img width="614" height="311" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-19.png"/>
</p>

6. Fill out the form as follows:
   - ***IMPORTANT***: All the participants which will share the same smartcontract deployed in a specific channel, must set the same name for the ***Package Label***. So, if in the founder instance we set the the value ***eShopCriptoFT_rentalshop_v1***, here for lessee1 participant we will be exactly the same package name.

<p align="center">
<img width="988" height="428" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-20.png"/>
</p>

   - Set ***Node*** as ***Chaincode Language***.
   - Select both available peers as the ***Target Peers***.
   - Upload the package .zip file you exported from the App Builder VS Code extension.
   - Click ***Next***

<p align="center">
<img width="1000" height="580" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-21.png"/>
</p>

7. Click ***Close***. We will only be installing (not deploying) the chaincode onto the participant instance.
<p align="center">
<img width="1002" height="583" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-22.png"/>
</p>

8. Now click ***Channels*** tab, then click on the ***rentalshop*** channel, and navigate to ***Deployed Chaincodes*** as you did in steps 3 and 4.

9. Find and click on the hamburger icon on the right of the row containing your chaincode. Select ***Approve***.
<img width="989" height="503" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-23.png"/>
</p>

10. In the Approve wizard you only need to specify the chaincode package you want to use, which obviously is the one we have just installed. 
<img width="998" height="530" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-24.png"/>
</p>

   - Additionaly you could specify ***Endorsement Policies***, or ***Private Data Collections***, but for the purpose of this HoL we are not going to set any of them: 
     - You can see more information about ***Endorsement Policies*** at [Specify an Endorsement Policy](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/specify-endorsement-policy1.html)
     - You can see more information about ***Private Data Collections*** at [What Are Private Data Collections?](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/what-are-private-data-collections.html)

11. Check that the chaincode has now been approved by the lessee1 participant.
<img width="1002" height="120" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/03-Creation-and-Deployment-of-an-FT-SmartContract/images/3-ft-2-25.png"/>
</p>
