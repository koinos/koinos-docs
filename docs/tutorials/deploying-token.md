# Deploying a token contract

Within a few steps, you can deploy your own token on the Koinos blockchain. This tutorial will guide you through the
steps required. Please note that a binary file will be available to download and you can skip to the section that explains
uploading a contract using the Koinos CLI.

## Building the token contract

Before attempting to build the token contract you should first follow the [Contract developer guide](../quickstart/contract-developer-guide.md) to
ensure your environment is set up properly.

```sh
$ git clone --recursive https://github.com/koinos/koinos-token-example.git
$ cd koinos-token-example
$ mkdir build
$ cd build
$ cmake -DCMAKE_TOOLCHAIN_FILE=${KOINOS_CDT_ROOT}/cmake/koinos-wasm-toolchain.cmake -DCMAKE_BUILD_TYPE=Release ..
$ make -j
```

> _**Note:** This will create the build artifact `token.wasm` that we will be referencing later._

## Uploading the token contract

We will now use the [Koinos CLI](https://github.com/koinos/koinos-cli) in order to upload our contract (`token.wasm`). It is recommended to
read the documentation on Koinos CLI and familiarize yourself with the tool.

After creating and opening your wallet, uploading a contract is simple. Place the `token.wasm` contract in the current working directory and invoke
the upload command as follows:

```sh
🔓 > upload token.wasm
Contract uploaded with address <contract address>
Submitted transaction with ID 0x12202687e8f3ccf8175e7b63a24862ee15b5481ce484ee128eeccba60b68ec69d2ae
```

## Utilizing the token

Now that our token is on the blockchain let us interact with it. For this, we will once again use the Koinos CLI. Our first step is to register the
contract. We will need the address of the contract, which is the address you used to uploaded it during the previous step, and the Application Binary Interface (ABI) file.

Because we are implementing a token contract the ABI is identical to the example provided [here](content/architecture/contract-abi.md).
Copy the ABI example in to a file named `token.abi` in the current working directory and run the CLI.

```sh
🔓 > register token <CONTRACT_ADDRESS> token.abi
Contract 'token' at address <CONTRACT_ADDRESS> registered
```
> _**Note:** Replace <CONTRACT_ADDRESS> with the address of your particular contract_

After completing the contract registration you will find that you now have additional CLI capabilities. Let us exercise them. The wallet you used to upload the token contract has the authority to mint new tokens. You can mint tokens to yourself or create a different address altogether.

```sh
🔓 > token.mint <TOKEN_RECEIVER> 100
Calling token.mint with arguments 'to:"<TOKEN_RECEIVER>" value:100'
Submitted transaction with id 1220ea179557850f9c659cae241334c9b26ab8a816d895726cdb0d08e1eea4e60577
```
> _**Note:** Replace <TOKEN_RECEIVER> with the address you would like to mint tokens to_

Let us confirm the mint was successful by checking our token balance.

```sh
🔓 > token.balance_of <TOKEN_RECEIVER>
value:100
```
> _**Note:** Replace <TOKEN_RECEIVER> with the address you used in the previous step_

Since we have just created the only 100 tokens in existence, the total supply should also be 100. Let us verify.

```sh
🔓 > token.total_supply
value:100
```

Now you have a general idea of how the token contract works. Check out the other options available to you. You can see
all the possible methods to call by looking at the ABI file.

**Token methods:**
- `name`
- `total_supply`
- `balance_of`
- `transfer`
- `decimals`
- `mint`
- `symbol`

## Customizing the token

Cloning the [Token Example](https://github.com/koinos/koinos-token-example) and modifying the `symbol` and `name` is a great place to start customizing your token.