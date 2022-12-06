# Preparation of the AppBuilder Dev environment

You can install whatever of the two available versions of AppBuilder in your own computer by following the below instructions:
- If you want to use AppBuilder as a Microsoft Visual Studio plugin, follow the instructions from [Install and Configure the Blockchain App Builder Extension for Visual Studio Code](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/install-and-configure-dev-tools-vs-code-extension.html "Install and Configure the Blockchain App Builder Extension for Visual Studio Code")
- If you prefer to use AppBuilder as a command line tool, follow the instructions from [Install and Configure Blockchain App Builder CLI](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/install-and-configure-dev-tools-cli.html "Install and Configure Blockchain App Builder CLI")
  
In other hand, if you are not confortable installing in your laptop this kind of dveloper tools and all its dependencies, but you have access to Oracle Cloud, you can opt to create a development box with all this products already installed in the cloud, and access to it remotely.

If you prefer to go by this last option, in Oracle LiveLabs you have a Lab in which you will be able to deploya a remote machine in minutes, based on a image already preconfigured by the Oracle Blockchain development team. Follow below instructions to proceed in this way:
1. Search in Google for ***Oracle Live Labs***.
<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img width="577" height="212" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/02-Prepare-Dev-Environment/images/2-dev-2-1.png"/>
</p>

2. Push the first link, and in the Oracle LiveLabs page search for ***Low Code Blockchain*** labs.
<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img width="860" height="390" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/02-Prepare-Dev-Environment/images/2-dev-2-2.png"/>
</p>

3. Select the ***Developing Low Code Blockchain Applications using Apex and Blockchain App Builder*** lab.
<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img width="328" height="273" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/02-Prepare-Dev-Environment/images/2-dev-2-3.png"/>
</p>

4. Push the ***Star*** button to start the lab, and the select the only option you have to execute this lab ***Run on your tenant***.
<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img width="954" height="330" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/02-Prepare-Dev-Environment/images/2-dev-2-4.png"/>
</p>

5. Once you are inside the Lab, to get a cloud machine ready whith Visual Code Studio installed on it and with the AppBuilder low code plugin installed on it, you only need to execute the ***Prepare Setup*** and ***Environment Setup*** steps, which should not take more than 25 minutes in total. 
<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img width="790" height="525" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/02-Prepare-Dev-Environment/images/2-dev-2-5.png"/>
</p>

All this work does not have too much relation with the objective of the HoL, but is something needed to be able to get an environment ready to use the low code tooling needed to begin to develope your smartcontracts.

Once you have executed one of the three methods exposed you should be able to access Oracle AppBuilder through Visual Studio...
<p align="center"  alt="App Builder in VSCode">
<img width="840" height="525" src="https://github.com/jvillenap/Using-NFT-and-FT-Tokens-in-Oracle-Blockchain/blob/main/02-Prepare-Dev-Environment/images/2-dev-2-6.png"/>
</p>

... or by issuing the command line tool...

```[jvillena@localhost ~]$ ochain

Usage: <command> [options]

Options:

  -h, --help       output command usage information
  -v, --version    display command version number
  -D, --debug      enable debug logging

Commands:

  deploy     Deploy chaincode project to Oracle Blockchain Platform
  init       Initialize a new Chaincode project
  invoke     Invoke a Chaincode transaction
  package    Package and archive an Ochain chaincode project
  patch      Apply PatchFix to ochain
  query      Invoke a Chaincode Query
  run        Run chaincode project locally in debug mode
  stop       Shutdown all chaincode services
  sync       Synchronize Changes from spec file to the required chaincode
  upgrade    Upgrade App Builder chaincode project


About:

  Version: 22.2.1 (Oracle Blockchain Cloud Edition)
  Copyright © 2022, Oracle and/or its affiliates. All rights reserved.```

