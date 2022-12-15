# Test the Smartcontracts using Postman

#### Table of Contents  
[Introduction](#Introduction)  
[Prerequisites](#Prerequisites)  
[Obtain Required information to execute REST APIs](#restInfo)  
[Initialization of the eCrypto token (FT)](#initFT)  
[Initialization of the eShopDevice token (NFT)](#initNFT)  
[Use case simulation 1 - Adquisition of eCrypto tokens by lessee1](#usecase1)  
[Use case simulation 2 - Successful renting](#usecase2)  
[Validation](#validation)  

<a name="Introduction"/>

## Introduction

In this last chapter we are going to demonstrate how easily we can do a full test of our Smartcontracts using a REST Client like Postman.

When you are dealing with Tokens, there is a bunch of administrative actions to be executed before being able to execute your business methods. Thanks to Oracle Blockchain, all the administrative actions can be executed as API REST calls, so it simplify considerably the effort needed for the initialization. We are going to perform a "dummy" initialization just with the minimum requirements to do a basic test.

Before the execution of any of the below steps we must create the enrollmentIDs into the REST Proxies for those users granted to access to the smartcontract methods. The enrollment is a mapping between the username who invoke the REST API, and the accounts managed internally by blockchain to which tokens will be assigned.

To reduce the complexity, enrollmentID can be named with the same value as the own user name.


<a name="Prerequisites"/>

## Prerequisites
- Postman or any other API REST client tool.
- The required enrollments for the two existing users in the network (eshop_manager and lessee1_manager) have already been created as the last step of the first chapter, [Create an Oracle Blockchain Network - Create Enrollments](https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/tree/main/01-Create-The-Network#createEnrollments). If not already done, you must do it.

<a name="restInfo"/>

## Obtain Required information to execute REST APIs
First of all we need to know which is the endpoint in which the REST API is accesible. You can get this URL from the Blockchain Service Console:
1. Access to the Blockchain Service Console:
   - In the OCI services menu, select ***Developer Services*** and click on ***Blockchain Platform***.
   - Ensure that the right Compartment is selected and click on the founder or participant instance (the one you want to access through).
   - Click the ***Service Console*** button.  
2. Once inside the ***Service Console*** go to the ***Nodes*** tab. It will show you all the nodes which composes this instance, and in the ***restproxy*** node you will see the endpoint URL at the ***Route*** column: 
<p align="center">
<img width="988" height="615" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-1.png"/>
</p>

Remmember that enrollments are created at instance level, so the enrollment for eshop_manager user will be only available through the restproy URL of the eshop founder instance, and the enrollment for the lessee1_manager user will be only available through the restproxy URL from the lessee1 participant instance. Following table shows the user to be used depending on the instance you are going to access:
| username        | Instance URL          |
| --------------- |-----------------------|
| eshop_manager   | https://eshop-....    |
| lessee1_manager | https://lessee1-....  |

The following table shows all the varibles we are using in Postman to make more easy the management of the requests we are going to execute. Validate you are the same values before the execution of the different invocations:
| Variable Name               | Variable value        |
| --------------------------- |-----------------------|
| bc_founder_provider_url     | https://eshop-....    |
| bc_participant_provider_url | https://lessee1-....  |
| bc_channel_name             | rentalshop            |
| bc_ft_chaincode_name        | eShopCriptoFT         |
| bc_ft_token_id              | eCrypto1              |
| bc_founder_orgid            | eshop                 |
| bc_founder_userid           | eshop_manager         |
| bc_founder_password         | ************          |
| bc_participant_orgid        | lessee1               |
| bc_participant_userid       | lessee1_manager       |
| bc_participant_password     | ************          |
| bc_timeout                  | 60000                 |
| bc_nft_token_id             | NFT-E1                |
| bc_nft_chaincode_name       | eShopDeviceNFT        |

These variables are set in the ***Variables*** tab of the Postman collection. You can change any of the values accordingly with any change you have done during the execution of the previous labs.

<a name="initFT"/>

## Initialization of the eCrypto token (FT)

There is a set of administrative actions which are required before being able to execute the business methods.

The following API REST calls correspond to the calls into the ***AdminSteps (FT chaincde)*** folder from the provided Postman collection.

1. The first action is the initialization of the chaincode (***Step-0: Init User Account***) indicating which user accounts will be allowed to execute administrative actions. It is important to set correctly the args of the init method:
   - ***args***: Scaped array of user_ids with their org_ids:
     - "[{\"org_id\":\"eshop\",\"user_id\":\"eshop_manager\"},{\"org_id\":\"lessee1\",\"user_id\":\"lessee1_manager\"}]"
<p align="center">
<img width="982" height="577" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-2.png"/>
</p>

2. We must also create user accounts for all those users elegible to own eCrypto Tokens by executing the ***Step-1: Create account***. For the specifics of our use case there is only two users, eshop_manager and lessee1_manager, each of them belonging to one of the existing organizations of the network.
   - This call must be executed as many times as users for which we want to create an account. In our case 2 times, each with following params:
     - "createAccount", "eshop", "eshop_manager", "fungible"
     - "createAccount", "lessee1", "lessee1_manager", "fungible"
<p align="center">
<img width="982" height="671" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-3.png"/>
</p>

3. The interchangeable fungible token needs to be initialized. It is basically set the identifier of the token (its name), its description, so the token will be initialized based in the anatomy defined in the specification file. This action can be executed through the ***Step-2: Initialize Token*** from the postman collection:
<p align="center">
<img width="982" height="671" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-4.png"/>
</p>

4. the FT eCrypto token must be associated to an user account. We are going to associate the token to the eshop_manager user. Before being able to do this association, we need to obtain the oaccount of the eshop_manager. We can get the oaccount of the eshop user with the ***Step-11:get Accounts by OrgId:UserId*** request:
<p align="center">
<img width="982" height="671" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-5.png"/>
</p>

With the oaccount we can execute the ***Step-3 : Associate Account to Token for Token User*** from the Postman Collection:  
<p align="center">
<img width="982" height="671" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-6.png"/>

5. We can set which user is allowed to mint tokens by executing the ***Step-4: Add Minter Role*** from the Postman collection:
<p align="center">
<img width="982" height="612" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-7.png"/>
</p>

6. And finally, we can issue tokens which will be assigned to the user who executes the operation by executing the ***Step-5:Issue Tokens*** request:
<p align="center">
<img width="982" height="612" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-8.png"/>
</p>

 - Checking the response message we can see how the minted tokens have been assigned to the invoker of the API call:
   - Successfully minted 50000 tokens to Account Id: oaccount~df41ed4c21da79cd7958f96f3b41fac9d9a184f5b6a08e1c4c3c7f50dddd3363 (Org-Id: eshop, User-Id: eshop_manager)



<a name="initNFT"/>

## Initialization of the eShopDevice token (NFT)

The initialization of an NFT token is quite simpler than the initialization of FTs, we just need to execute the following 3 steps:

The following API REST calls correspond to the calls into the ***AdminSteps (NFT chaincde)*** folder from the provided Postman collection.

1. The first action is the initialization of the chaincode (***Step-0: Init User Account***) indicating which user accounts will be allowed to execute administrative actions. It is important to set correctly the args of the init method:
   - ***args***: Scaped array of user_ids with their org_ids:
     - "[{\"orgId\":\"eshop\",\"userId\":\"eshop_manager\"},{\"orgId\":\"lessee1\",\"userId\":\"lessee1_manager\"}]"
<p align="center">
<img width="982" height="612" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-9.png"/>
</p>

2. We must create user accounts for all the users who can be custodians of the NFT assets representing the physical assets. It can be done by executing the ***Step-1: Create account***. For the specifics of our use case there is only two users, eshop_manager and lessee1_manager, each of them belonging to one of the existing organizations of the network.
   - This call must be executed as many times as users for which we want to create an account. In our case 2 times, each with following params:
     - "createAccount", "eshop", "eshop_manager", "nonfungible"
     - "createAccount", "lessee1", "lessee1_manager", "nonfungible"
<p align="center">
<img width="982" height="612" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-10.png"/>
</p>

3. We can set which user is allowed to mint tokens by executing the ***Step-2: AddRole*** from the Postman collection:
<p align="center">
<img width="982" height="612" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-11.png"/>
</p>



<a name="usecase1"/>

## Use case simulation 1 - Adquisition of eCrypto tokens by lessee1

At this point both smartcontracts has been initialized, and are ready to be used in a real case. So, we are going to simulate some expected operations related with our use case. First simulation is the acquisition of eCrypto tokens by the lessee1 organization.

Lessee1 wants to rent an asset from eShop organization and for this rental operation needs to acquire eCryptos, so first operation is a transfer of eCrypto tokens from eshop::eshop_manager to lesse1::lessee1_manaer, assuming this transfer is because lessee1 has paid the equivalent value of eCrytpo tokens with another kind of currency or service:

1. Get the oaccount of the lessee1 user. It can be done executing the ***Step-11: Get Accounts by OrgId:UserId*** from the folder ***AdminSteps (FT chaincode)*** of the Postman Collection:
<p align="center">
<img width="982" height="612" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-12.png"/>
</p>

2. Having the oaccount of the lessee1 user, we can proceed by the association of the user account to the eCrypto token. It can be done executing the ***Step-3 : Associate Account to Token for Token User*** from the folder ***AdminSteps (FT chaincode)*** of the Postman Collection:  
<p align="center">
<img width="982" height="671" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-13.png"/> 
</p>
3. Once the eCrypto token has been associated with the oaccount of the lessee1 user, we can ask for a token transfer from eshop::eshop_manager to lessee1::lessee1_manager by executing the ***Step-6 : Transfer the initialized Tokens from eshop_manager to lessee1_manager*** from the folder ***AdminSteps (FT chaincode)*** of the Postman Collection: 
<p align="center">
<img width="982" height="671" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-14.png"/> 
</p>
 - Checking the response message we can see how the tokens has been transferred to the user indicated in the request:
   - Successfully transferred 10000 tokens from account id: oaccount~df41ed4c21da79cd7958f96f3b41fac9d9a184f5b6a08e1c4c3c7f50dddd3363 (Org-Id: eshop, User-Id: eshop_manager) to account id: oaccount~edd0445ae8efb419a78cbdcb0e7288caed9b9e4f59e5683fe8ff0c56827449c8 (Org-Id: lessee1, User-Id: lessee1_manager)
   
We have executed a complex operation in three separated steps, but obviously it can be done in one single operation, just creating a custom method in the chaincode to do it atomically, which already exist in the smartcontract. This is quite the same we have done in the single custom method we have implemented in the FT Smartcontract:

```javascript
    @Validator(yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.number())
    public async transferECoins(token_id: string, from_org_id: string, from_user_id: string,  to_org_id: string, to_user_id: string, quantity: number) {
        const token_asset = await this.getTokenObject(token_id);
        const to_account_id = await this.Ctx.Account.generateAccountId(token_id, to_org_id, to_user_id);
        const from_account_id = await this.Ctx.Account.generateAccountId(token_id, from_org_id, from_user_id);
        return await this.Ctx.Token.transferFrom(from_account_id, to_account_id, quantity, token_asset);
    }
```
So, we can execute this action in one single step as we can see below:

**************EJECUTAR TRANSFER DE TOKENS!!!!


<a name="usecase2"/>

## Use case simulation 2 - Successful renting

This second use case is a bit more complex. Before being able to rent a device, we must be sure the asset has is digital twin token representing it in blockchain. If not, we must mint the NFT representing the asset. It can be done by the current owner of the asset, but ideally it could be done by the own manufacturer of the asset. For simplicity, as we have no created a org::user representing the manufacture, the action is going to be performed by the eshop organization, executing the ***Step-1 : Mint Device NFT*** from the folder ***simulation2: Mining & Rental Process*** :  
<p align="center">
<img width="953" height="1078" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-18.png"/> 
</p>

At this point, as the current custodian of the NFT is the same org::user who is going to rent the asset, we can proceed by starting the rental process between shop renter and the lessee1 by making a booking of the asset, which can be considered as a reservation of the asset to be lesseed:
<p align="center">
<img width="953" height="648" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-19.png"/> 
</p>

Once done the booking we can check if a deposit have been charged to the lessee1 user, executing the ***Step-1 : Get Account Balance for Token User*** from the folder ***simulation1: eCryptoTransfer*** of the Postman Collection:
<p align="center">
<img width="953" height="648" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-20.png"/> 
</p>
Checking the current balance of eCrypto tokens from the lessee1 user, we can see how it has been decresade in 300 units as per the reservation done. Lessee1 did an initial acquisition of 10000 eCrypto tokens, and after a charge of 300 tokens, he only has 9700. 

At this point we can continue by executing the steps of receiving the rented asset by lessee1. Is in this step where the custody of the NFT representing the asset is transferrer from the renter to the lessee. So any bad usage of the asset during this period will be tracked as been done during the period in which lessee1 was the custodian of the asset. This action can be executed with the ***Step-3: Receive Device*** from the ***Simuation2:Mining & Rental Process*** from the Postman collection :
<p align="center">
<img width="953" height="604" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-21.png"/> 
</p>

And finally, when the rental period finalize, we can proceed by executing the return asset action. It can be done by executing the ***Step-3:Receive Device*** from the folder ***Simuation2: Mining & Rental Process*** from the Postman collection:
<p align="center">
<img width="953" height="608" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-XX.png"/> 
</p>



You can execute the GetTokenHistory method to get all the snapshots taken to the NFT, so every expected or unexpected event occurred to the asset will be persisted in blockchain, and will be accessible by any participant of the network.





We Have shown here the most basic path, let's say the happy path, but obviously there is a lot more events can occur, which can led us to unexpected or unwanted situations, so it is here where IoT, chatbots, AI, or any other technology can be easily integrated to give more value to the solution. 

<a name="validation"/>

## Validation
In the Postman collation you can see a lot of operations you can invoke to validate status of the accounts, users, tokens, and perform different transactions to simulate other operations. You can execute any of them test different operations, and to validate impact in the tokens and records.

Additionally, this transactions will be saved into the ledger, and you can validate its execution by checking them through the ***Service Console*** by checking the transactions saved into the new blocks created in the ledger.
1. Access to the Blockchain Service Console from whatever of the instances (eshop or lessee1).
   - In the OCI services menu, select ***Developer Services*** and click on ***Blockchain Platform***.
   - Ensure that the right Compartment is selected and click on the founder or participant instance (the one you want to access through).
   - Click the ***Service Console*** button.

2. Once in the Service Console, navigate to the ***channels*** tab and select the ***rentalshop*** channel:
<p align="center">
<img width="982" height="471" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-15.png"/> 
</p>  

3. Default option opened entering in this page is the ***Ledger*** option. Wait a few seconds until the main frame load the lasts blocks written to the ledger:
<p align="center">
<img width="973" height="591" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-16.png"/> 
</p>

4. Selecet one of the blocks and selecting and click on the left arrow beside the transaction identifier (TxID) of the selected block:
   - You can see all the details of the transaction(s) recorded in the block, Invoked Method, Parameters sent to the method, Response received from OBP, invoker of the transaction, and endorser.
<p align="center">
<img width="978" height="727" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/05-Test-Smartcontract-Using-Postman/images/5-test-2-17.png"/> 
</p>

