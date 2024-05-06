# Launching a Token
Welcome to our guide on launching a token collection using the Koinos Contract Standard (KCS-1) for Tokens and the AssemblyScript SDK for Koinos. In this tutorial, we'll walk you through the process of creating and deploying your own token on the Koinos blockchain. Whether you're a seasoned developer or new to blockchain development, this step-by-step guide will provide you with the knowledge and tools necessary to bring your token project to life. Let's dive in and explore the exciting world of token creation on Koinos!

Before starting, ensure that you have already set up your Koinos AssemblyScript SDK environment by following [this guide](../as-sdk.md).

---
## Setting up the project
To begin, clone the token repository and install the required dependencies.

```sh
git clone https://github.com/roaminro/koinos-sdk-as-examples/
cd koinos-sdk-as-examples/token
yarn install
```

---
## Customizing your token
Customize the specifics of your token project by modifying `token/assembly/Token.ts`. Define the following:

- `_name`: The name of your token

- `_symbol`: The symbol for your token

- `_decimals`: The decimal places for your token


```ts
- _name: string = "Token";
- _symbol: string = "TKN";
- _decimals: u32 = 8;
```

After making your changes, update the token name and symbol in the unit test file located at `token/assembly/__tests__/token.spec.ts`.
We will need to change the test for the `name` and `symbol` functions to reflect your token name and symbol.

```ts
  it("should get the name", () => {
    const tkn = new Token();

    const args = new token.name_arguments();
    const res = tkn.name(args);

    expect(res.value).toBe("[your token name]");
  });

  it("should get the symbol", () => {
    const tkn = new Token();

    const args = new token.symbol_arguments();
    const res = tkn.symbol(args);

    expect(res.value).toBe("[your token symbol]");
  });
```

---
## Building and testing
Build and debug your project using the following command from the `assembly/token` directory:

```sh
yarn build:debug
```

Run unit tests to ensure your token is functioning as expected:

```sh
yarn test
```

---
## Compiling the contract
Once you've made all the necessary modifications and your tests are passing, you're ready to build the release version of your contract. From the `assembly/token` directory, run:

```sh
yarn build:release
```

After the build completes, locate your `.wasm` and `.abi` files:

- `.wasm` file: `/koinos-sdk-as-examples/token/assembly/build/release/contract.wasm`
- `.abi` file: `/koinos-sdk-as-examples/token/abi/token.abi`

With these files, let's generate a Koinos wallet with `koinos-cli` and deploy your contract.

---

## Deploying the contract
### The Koinos CLI

If you haven't done so yet, download the Koinos CLI [here](https://github.com/koinos/koinos-cli/releases).
Once you have the binary installed add a `.koinosrc` file to the same directory as the binary and include these parameters for the Koinos Harbinger testnet:

```
connect https://harbinger-api.koinos.io
register_token koin 1FaSvLjQJsCJKq5ybmGsMMQs8RQYyVv8ju
register_token vhp 17n12ktwN79sR6ia9DDgCfmw77EgpbTyBi
register resources 16X6cKyqiT8EzPEksRJxXcqMnHMMm9Vxct
register pob 1MAbK5pYkhp9yHnfhYamC3tfSLmVRTDjd9
register governance 17MjUXDCuTX1p9Kyqy48SQkkPfKScoggo
register nameservice 13NQnca5chwpKm4ebHbvgvJmXrsSCTayDJ
```

Execute the binary and create a new wallet by issuing the `create` command: `create <filename:file> [password:string]`

Example:
```sh
create test.wallet password
```

This should return a confirmation and the wallet address:
```sh
Created and opened new wallet: test.wallet
Address: 163m4hKj1QHLCyHgnyNPw8TZU5ov25QGQX
```

We will need some tKOIN in order to upload the contract and abi to the blockchain. We can get 100 free tKOIN by making a request in the `faucet` channel of the [Koinos Discord Server](https://discord.koinos.io)

```
!faucet 163m4hKj1QHLCyHgnyNPw8TZU5ov25QGQX
```

Upon success we should see this message in Discord
```
Transferring 100.000000 tKOIN to address 163m4hKj1QHLCyHgnyNPw8TZU5ov25QGQX.
```

Going back to the CLI we should be able to issue the `koin.balance_of` command and see the tKOIN in our wallet.

```
🔓 > koin.balance_of
100 tKOIN
```

We now have a wallet with tKOIN and can deploy our contract.

We will use the `upload` command to upload the `contract.wasm` file and `token.abi` file we generated earlier. `upload <filename:file> [abi-filename:file] [override-authorize-call-contract:bool] [override-authorize-transaction-application:bool] [override-authorize-upload-contract:bool]`

```sh
upload contract.wasm token.abi
```

Note: To make things easy, the `contract.wasm` and `token.abi` files were copied to the same directory as the CLI. 

We should get this message upon success
```sh
Contract uploaded with address 163m4hKj1QHLCyHgnyNPw8TZU5ov25QGQX
Transaction with ID 0x12208c044ecd294c3f337aa8a1764f6cb0f6e9d5ca497fd96a69f32b3bb9b499227d containing 1 operations submitted.
Mana cost: 2.41609394 (Disk: 32704, Network: 38185, Compute: 397167)
```

## Minting the token

register test 163m4hKj1QHLCyHgnyNPw8TZU5ov25QGQX token.abiNow that our contract is deployed to the testnet let's register our contract by issuing the `register` command `register <name:contract-name> <address:address> [abi-filename:file]`

```
register test 163m4hKj1QHLCyHgnyNPw8TZU5ov25QGQX token.abi
```

We will get this response:
```
Contract 'test' at address 163m4hKj1QHLCyHgnyNPw8TZU5ov25QGQX registered
```

We will now have new commands avaiable to us to interact with our contract.

To make sure it all worked we can try the command `test.symbol`

```
test.symbol
value:  "RTT"
```

We can now issue the `mint` command to mint our tokens. Let's create a new wallet we can mint the tokens to. 

```
create mint_to.wallet password
Created and opened new wallet: mint_to.wallet
Address: 14xHsbnNnHVqDXaHq99A3ZEAEzQAwd9mtt
```

We need to switch back to our `test.wallet` so we can mint the tokens. 

```
test.mint 14xHsbnNnHVqDXaHq99A3ZEAEzQAwd9mtt 1000000
```

We should get this response:
```
Calling test.mint with arguments 'to:  "14xHsbnNnHVqDXaHq99A3ZEAEzQAwd9mtt"
value:  1000000
'
Transaction with ID 0x12201db69401876406c7edd645ef189b3d063c78c16455ba46c93bf25fff3b925df6 containing 1 operations submitted.
Mana cost: 0.03434252 (Disk: 95, Network: 284, Compute: 514975)
```

Congratulations, We successfully deployed our contract to the testnet and minted a million tokens!

We can check the [block explorer](https://harbinger.koinosblocks.com/tx/0x12201db69401876406c7edd645ef189b3d063c78c16455ba46c93bf25fff3b925df6) and see that we now have the newly minted tokens in our wallet. 
