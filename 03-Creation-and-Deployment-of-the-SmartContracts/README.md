# Creation and Deployment of the SmartContracts

Once you have AppBuilder ready to be used, you can begin to create what is named the ***specification file***. The specification file can be created as a simple YAML file. Here below you can see the specification file for the NFT Following file

is the one created for the "CMS secured by Blockchain" demo:

'''
ssdsd

'''

You can combine different entities in the same smartcontract, but nowadays not NFT and FT tokens in the same smartcontract. It is going to be a feature will is in the roadmap, but still not there. So, if we have a use case like the sample we are developing in this HoL, we will need to create two differente smartcontracts, one for the NFT token, and another one for the FT token. It does not mean we are not going to be able to execute transactions affecting tokens from both smartcontracts, thanks to the possibility to execute methods from one smartcontract through the other, we can execute for example in a single transaction a transfer of FT tokens based on a property change on one NFT token. ***We will see this feature in one of the custom methods of one of our smartcontracts!!!***


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








