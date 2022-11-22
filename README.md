# Using-NFT-and-FT-Tokens-in-Oracle-Blockchain
This HoL has been created to showcase how easily, thanks to Oracle Blockchain, we can implement without to much efford a real use case using NFT and FT tokens.

NFT is the perfect digital twin for whatever kind of asset, it can be used to track any usage, event, status change, or any other kind of property which makes sense to be tracked. And storing its history in Blockchain, it will become an easily accesible inmutable history of the asset, which will be really valuable for whatever entity or person interested in the physical asset itself.

Using FTs you will be able to create whatever kind of echangable currency, controlling easily the accounting assinged to the users, and the privileges assigned to each participant to ensure a proper ussage of the network, obviously depending on the role of each user. 

Oracle Blockchain and specially AppBuilder is where the magic occurs. 

Using Oracle Blockchain you will be able to create in minutes your Hyperledger Fabric network as a founder, or join whatever existing Hyperledger Fabric network as a participant. In the other hand, AppBuilder is a toolset developed by Oracle which will help you to create your Smartcontracts abstracting you from all the intrinsic technical complexities, even more when you need to create NFT or FT tokens. So, leveraging Oracle Blockchain and AppBuilder you will reduce considerably the time to market for any idea in which NFTs and FTs would be the perfect fit.

AppBuilder will help you to reduce considerably the complexity of the development, packaging, testing, and deployment of Hyperledger Fabric chaincodes, giving you the option to create them in different languages (TypeScript or Go).

This repo is focused in the development of solutions where FTs and/or NFTs were needed, so we assume you know how to use Oracle Blockchain and AppBuilder. If it is not the case, you should start with a great HoL created by Ivan Delic:
- https://github.com/ivandelic/how-to-smplify-hyperledger-development-with-oracle-blockchain-app-builder

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")


This toolset is known as AppBuilder, and has been created in two interfaces, as a command line tool, and as a Microsoft Visual Code Pluging. Both versions will allow to execute exactly the same functionality, just select the one you prefer depending on what is you preference as a developer. You can see all the details in howto install both of them at:
 - command line tool:
	https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/install-and-configure-dev-tools-cli.html
 - Visual Studio Code extension:
	https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/install-and-configure-dev-tools-vs-code-extension.html

To help to understand the benefit of AppBuilder, we can highlight the following features:
<<<image: /data/publicaciones/NFT_tokens/images/0_appbuilderworkflow.png>>>
- In development phase: AppBuilder will create the whole chaincode project just creating what is known as an specification file. The project will include all the coded entities, all their accessors together with all the CRUD methods to manage those entities, and also the signature of any custom method required for any non-standard or complex busines logic required by your application, which will become the only code needed to be manually implemented.
- Deployment of the chaincode: Once the chaincode project is ready to be tested you can deploy it locally into the included pre-configured Hyperledger Fabric Network, or remotely to any existing Oracle Blockchain Platform instance, no matter if it is in cloud or onPremises. Another option is to package the project to be deployed manually through the Oracle Blockchain console.  
- In testing phase: Once the project has been deploye you can test any of the auto-generated methods or the custom methods of the chaincode project.
- Debug the chaincode: In case you were using the Visual Studio Code extension, you will be able to perform line-by-line debugging of the chaincode.
  
Once any of the AppBuilder extensions gets installed you only need to create the specification file. Following file is the one created for the "CMS secured by Blockchain" demo:
<<<file: /data/publicaciones/NFT_tokens/specificationFile/SpecBC_securedCMS.yml>>>

The sort of entities used for this use case can be seen in the below image. There is only one NFT entity, which is the envelopeNFT entity. Other entities are dependent entities which can be easily understand.

Standard entities does not have more complexity than entities created for any other object oriented programing language, just having their attributes, behavior, and relations with other entities. But NFT entities, like our EnvelopeNFT entity, has a more complex anatomy because its management is leveraged to the platform.

NFT tokens most of the times are created as digital twins of physical or digital assets, so NFT must reflect what is occurring to the physical or digital asset and be tracked accordingly to its reality. In this sense the NFT gives an extra value to the physical/digital asset, as the information provided by the NFT representing the asset is information which can not be refused as per the contribution of the blockchain technology to it.

If you go to the "Input Specification File for Non-Fungible Tokens" (https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/input-specification-file-non-fungible-tokens.html) you will see how to configure your NFT as per your business needs. Just as a summarize of what you need to define:
- Type/Symbol/Standard: You must indicate in this property that this token is based in the ERC-721 Standard, and give to it a unic symbol indentifier.
- Anatomy: In this section you specify it is a non-fungible token (NFT) and whether it would be subdivided into smaller fractions ("whole" is the only option for NFT tokens).
- Behavior: In this section is where must be defined if the token can be minted, and in such case, which is the maximum number of mintable tokens. Here you must also state it is an indivisible token, if is singleton for each class, transferable, and burnable which is similar to its deletion, but not disapearing, so it is still there but not usable at all. Also in this section you can restrict token behaviors to specific roles.
- Metadata: This section define a sort of prpoperties which must be set during token creation, and can not be changed in the future. So its value will remain inmutable for the whole life of the token (i.e.: manufacturer, .
- Properties: Standard attributes of the token which can vary during the life of the token. 



PROCEDURE TO load your SPECFILE INTO APPBUILDER AND CREATION OF THE CHAINCODE PROJECT.



Once you create your chaincode project based in the specification file, you will get more than 30 auto-generated methods to execute the following actions:
<<<foto de las verticales de NFT!!!>>>






Now our chaincode project is ready to be deployed locally or remotely and tested locally with the VS Code extension, or remotely using Postman or any other REST/JSON tool, but if you need to add any custom logic ....

