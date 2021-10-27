# Deploying a token contract

## Preamble

Within a few steps, you can deploy your own token on the Koinos blockchain. This tutorial will guide you through the
steps required. Please note that a binary file will be available to download and you can skip to the section that explains
uploading a contract using the Koinos CLI.

## Building the token contract

Before attempting to build the token contract you should first follow the [Contract developer guide](../quickstart/contract-developer-guide.md) to
ensure your environment is set up.

```sh
$ git clone --recursive https://github.com/koinos/koinos-token-example.git
$ cd koinos-token-example
$ mkdir build
$ cd build
$ cmake -DCMAKE_TOOLCHAIN_FILE=${KOINOS_CDT_ROOT}/cmake/koinos-wasm-toolchain.cmake ..
$ make -j
```

**Note:** This will create the build artifact `token.wasm` that we will be referencing later.

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

Now that our token is on the blockchain let's interact with it. For this, we will once again use the Koinos CLI. Our first step is to register the
contract. We will need the address of the contract (which is the address you uploaded it with during the previous step) and the ABI.

In this particular case, since we are implementing a token contract, the ABI is identical to the example provided [here](content/architecture/contract-abi.md).
Copy the ABI example in to a file in the current working directory and run the CLI.

```sh
🔓 > register token <contract address> token.abi
Contract 'token' at address <contract address> registered
```

After completing the contract registration you will find that you now have additional CLI capabilities. Let's exercise them. Using the same open wallet
you used to upload the contract -- we can mint new tokens. You can mint tokens to yourself or create a different address altogether.

```sh
🔓 > token.mint 1P4msR22FXKHZragcLk2dCNweTEi9JWgxn 100
Calling token.mint with arguments 'to:"1P4msR22FXKHZragcLk2dCNweTEi9JWgxn" value:100'
Submitted transaction with id 1220ea179557850f9c659cae241334c9b26ab8a816d895726cdb0d08e1eea4e60577
```

If all is well, let's check our token balance.

```sh
🔓 > token.balance_of 1BtAYXkmxuasrr3Yx6zZgdpQT9fuDu123y
value:100
```

Great success! Now since we've created the only 100 tokens in existence, the total supply should also be 100. Let's verify.

```sh
🔓 > token.total_supply
value:100
```

We're looking good so far. Now you have a general idea of how this works, check out the other options available to you. You can see
all the possible methods to call by looking at the ABI file.

**Token methods:**
- name
- total_supply
- balance_of
- transfer
- decimals
- mint
- symbol

## Customizing the token

Feel free to clone the [Token Example](https://github.com/koinos/koinos-token-example) and modify the `symbol`, `name`, and if you're feeling adventurous
the semantics of your token!
