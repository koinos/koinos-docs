# Launching a token

This guide allows users to manually launch a new Token based on current KCS-1 (Koinos Contract Standard).

The repo requires `koinos-sdk-as-cli` to compile and build.

The basic usage of this repo is as follows:

1. Clone and install the repo
2. Modify the contents of collections.ts to fit your token project
3. Compile and gather the `.wasm` and  `.abi` files.
4. Manually deploy to the Koinos main net.

## Initial setup

#### Prerequisite

You must have already setup your developer environment and installed the `koinos-sdk-as-cli` from [Module 4](../M4/1_introduction.md). If you haven't done so, please review that lesson and setup the SDK.

#### Clone the repo

Clone the repo by using the following command:

```
git clone https://github.com/roaminro/koinos-sdk-as-examples/tree/main/token
```

Enter the project folder by using the following command:

```
cd koinos-sdk-as-examples
```

Install the required dependencies using the following command:

```
yarn install
```

## Customize 

Customize the specifics of the token project by first modifying `token/assembly/Token.ts`. 

Define the following:
`_name:` The Name of your Token
`_symbol`: The Symbol for your Token
`_decimals`: The decimal places for your token.

```
- _name: string = "Token";
- _symbol: string = "TKN";
- _decimals: u32 = 8;
```
Once you've made all your changes, update the token name in the unit test file located in `token/assembly/__tests__/token.spec.ts.` Search for the term `Token` and replace with your token name. Similarly, search for the term `TKN` and replace it with your token symbol.

Next, build and debug your project with the following command from the `assembly/token` directory.

```
yarn build:debug
```

Run unit test by using the following command:

```
yarn test
```

## Compile the contract

Once all your modifications have been made, you're now ready to build the release version. To do this, use the following command from the `assembly/token` directory.

```
yarn build:release
```

Once the build completes, you will need to locate your `.wasm` and `.abi` file to upload to the blockchain.

Your `.wasm` file is located in the following directory:

```
/koinos-sdk-as-examples/token/assembly/build/release/contract.wasm
```

Your `.abi` file is located in the following directory:

```
/koinos-sdk-as-examples/token/assembly/build/release/token.abi
```

With these two files, generate a koinos wallet with `koinos CLI` and deploy as shown in [Module 4: Uploading your Smart Contract](../M4/7_upload-contract.md).

## Mint tokens

#### Using Koinos CLI

Register your new token address with `koinos-cli` and run the `mint` method.

## Interacting with Smart Contracts

Believe it or not, you've already interacted with a smart contract! The $KOIN token is a system level smart contract that was pre-registered to the `koino-cli` in the `.koinosrc` file!

In this chapter, we will be reviewing how to register new contracts and what you should expect when doing so.  The typical process is:

1. Collect the wallet address for the smart contract you wish to interact with.
2. Register the smart contract with a user defined name.
3. Call the commands begining with the user defined name.

### Collect the wallet address

When interacting with a new contract address, PLEASE BE SURE THAT YOU TRUST THIS CONTRACT FIRST! Interacting with a contract that you do not trust can result in lost of funds. We strongly suggest you use a `smart wallet` to handle interacting with unknown smart contracts! OR follow our Pro Tip below: 


___💡 Pro tip: ALWAYS generate a new wallet and supply it with the minimum number of $KOIN tokens that you need to complete the transaction you wish. For example, if you are interacting with a new NFT contract that cost 100 $KOIN, create a new wallet and send 100 $KOIN + some extra for the Mana cost___

### Register the Smart Contract

In this example, we will be interacting with the Koinos Acccount Protocol's namepsace contract on the `Harbinger Test Net`. The contract address is `1H3k4zttAjF7qfTqfmKZ4ZCdUL3pRdGnpG`. To register the contract, use the following command:

```
🔓 > register namespace 1H3k4zttAjF7qfTqfmKZ4ZCdUL3pRdGnpG
```

You will notice that this is the exact same command located in your `.koinosrc` file! If your register is successful, you will recieve the following response:

```
Contract 'namespace' at address 1H3k4zttAjF7qfTqfmKZ4ZCdUL3pRdGnpG registered
```

When using the register command, the name of the contract is userdefined. We chose to use `namespace` but you can call it anything you wish.

To see what commands are available with this smart contract, use the `list` command and you should see a full list of available commands, including the new contract which you just registered. It will look something like this:

```
...
namespace.set_metadata                    - Set contract metadata
namespace.set_royalties                   - Unsupported
namespace.symbol                          - Returns the token's symbol
namespace.total_supply                    - Gets the total number of minted tokens
namespace.transfer                        - Transfer ownership of a name or TLA
namespace.transfer_ownership              - Transfer ownership of the contract
namespace.uri                             - Returns the token's uri
...
```

Note: If the smart contract was uploaded without an "Application Binary Interface" or `.abi` file, then these entrypoints will not be available and you will get an error.

You may now use the `--help` flag on any of these commands to learn thier usage. This process will apply to any smart contract address.

