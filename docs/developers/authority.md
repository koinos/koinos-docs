# Authority
A key innovation of Koinos is the ability to define account authority with a smart contract. On most other blockchains authorization of an address is limited to a specific cryptographic algorithm or predefined configuration such as N of M multisig. Koinos turns all that on its head by allowing addresses to define their own authorization algorithms using smart contracts. While Ethereum does allow for some similar behavior with its smart contracts, Koinos' approach is more abstract and results in a much better end user experience through smart wallets (Smart contracts directly intended to manage wallets). Remember, a contract is an address, so while the examples below are being used for a smart contract, it can be applied to an address intended for an end user as well.

---
## Authority overrides
The Koinos Blockchain Framework identifies three types of authority that can be overridden. When a smart contract is uploaded to an address, the operation flags which authority types it wishes to use (if any). If an authority type is overridden, the smart contract will be called at the special `authorize` entry point instead of checking the transaction for signatures matching the desired address.

There are three types of authorization overrides:

1. Call contract
2. Transaction application
3. Upload contract

---
### Call contract
The "call contract" authority is used when a contract is requesting the authorization of an address. This is by far the most common authority, being the only authority that a user contract can request. For example, if a token is requiring an address' authority before transferring that address' tokens, it will request the "call contract" authority.

---
### Transaction application
The "transaction application" authority is used when an address is involved in a transaction. This covers both paying for a transaction (when the address is paying the mana for the transaction) and being the payee (when another address is paying for the transaction, but your address' nonce is being incremented). This authority can only be called by the system. This can be used to pay for other user's transactions. For example, if a a dAPP with a token can use ownership of the token to confer mana rights using the "transaction application" authority.

---
### Upload contract
Lastly, the "upload contract" authority does exactly what it says. It is called when an address is attempting to upload a contract. Like "transaction application", it is also only called by the system. In Koinos, contracts can be re-uploaded. Overriding this authority allows a contract to be locked down entirely, or implement its own form of decentralized governance for managing the contract.

---
## Authorize entry point
The authority override relies on a special smart contract entry point, called `authorize`. The entry point is reserved just for authority calls from the Koinos Virtual Machine (KVM). If `authorize` is called, the contract is guaranteed the authenticity of the call as originating from the KVM. This is important because calls to `authorize` may result in side effects, such as when rate limiting users of a dApp. The implementation of an `authorize` function can be as simple as returning a boolean or complicated and implementing complex multisig relationships or even using different cryptographic algorithms altogether!

It is common for smart contracts to request the authorization of an address. For example, a token contract wants to ensure the sender has authorized the transaction. Rather than attempting to call `authorize` on the sender, the contract would call the `require_authority` system call instead. This system call checks if an address has an authorize override, calling it if it exists, otherwise implementing the default signature algorithm. If a contract attempts to call the `authorize` entry point on another smart contract directly, it will always fail, resulting in a transaction reversion.

---
## Authorize implementation
Smart contracts on Koinos can be re-uploaded so long as the transaction is signed with the key associated with the contract address. There are many reasons to prevent re-uploading a contract. Or perhaps you want to implement a decentralized governance that can determine under what conditions a contract can be re-uploaded. For this example, we will just show how to disable contract uploading for an address.

We recommend following the [calculator](guides/calculator.md) or [token](guides/token.md) guides and using them as a base for this example.

---
### Automatic generation

If you are creating a new contract using `koinos-sdk-as-cli` you can add command line arguments that will automatically create the correct functions.

When generating the contract code, add the `--generate_authorize` option to create a handler for the `authorize` entry point and a stubbed implementation.

``` { .txt }
koinos-sdk-as-cli generate-contract-as --generate_authorize calculator.proto
```

``` { .txt no-copy }
Generating boilerplate.ts and index.ts files...
GENERATE_AUTHORIZE_ENTRY_POINT=1 yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/calculator.proto
yarn run v1.22.22
$ /tmp/calculator/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/calculator.proto
Done in 0.23s.
```

This will create the following handler in `index.ts`.

``` ts title="index.ts"
    case 0x4a2dbd90: {
      const args = Protobuf.decode<authority.authorize_arguments>(
        contractArgs.args,
        authority.authorize_arguments.decode
      );
      const res = c.authorize(args);
      retbuf = Protobuf.encode(res, authority.authorize_result.encode);
      break;
    }
```

There is also a stubbed implementation in the `.boilerplate.ts` generated file.

``` ts title="calculator.boilerplate.ts"
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    // const call = args.call;
    // const type = args.type;

    // YOUR CODE HERE

    const res = new authority.authorize_result();
    res.value = true;

    return res;
  }
```

For this example, we want to not authorize on upload, so change `res.value = true` to `false`.

Here is a cleaned up version:

``` ts title="calculator.ts"
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    return new authority.authorize_result(false);
  }
```

---
### Manual generation

If you are adding authorize functionality to an existing contract you can easily add the required functions yourself. In `index.ts` you need to add the `authorize` entry point.

``` ts title="index.ts"
    case 0x4a2dbd90: {
      const args = Protobuf.decode<authority.authorize_arguments>(
        contractArgs.args,
        authority.authorize_arguments.decode
      );
      const res = c.authorize(args);
      retbuf = Protobuf.encode(res, authority.authorize_result.encode);
      break;
    }
```

Be sure to import `authority` from `@koinos/sdk-as`!

Then, in your contract add the `authorize` function. For this example, we don't want authorize contract upload, so we will return `false` in all cases.

``` ts title="calculator.ts"
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    return new authority.authorize_result(false);
  }
```

---
### Uploading the contract
Overriding a contract authority doesn't mean anything until you upload the contract. We need to specify which authority types we want to override when uploading a contract. You can override any of them or none of them at all. The allows for great flexibility with how you develop you smart contract.

First, we need to build the contract with the authorize entry point. You need to add the `generate_authorize` option to the build command.

```{ .txt }
koinos-sdk-as-cli build-all --generate_authorize release 0 calculator.proto
```

```{ .txt no-copy }
Generating ABI file...
GENERATE_AUTHORIZE_ENTRY_POINT=1  yarn protoc --plugin=protoc-gen-abi=./node_modules/.bin/koinos-abi-proto-gen --abi_out=abi/ assembly/proto/calculator.proto koinos/chain/authority.proto
yarn run v1.22.22
$ /tmp/calculator/node_modules/.bin/protoc --plugin=protoc-gen-abi=./node_modules/.bin/koinos-abi-proto-gen --abi_out=abi/ assembly/proto/calculator.proto koinos/chain/authority.proto
Done in 0.26s.
Generating proto files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/*.proto
yarn run v1.22.22
$ /tmp/calculator/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/calculator.proto
Done in 0.24s.
Generating boilerplate.ts and index.ts files...
GENERATE_AUTHORIZE_ENTRY_POINT=1 yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/calculator.proto
yarn run v1.22.22
$ /tmp/calculator/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/calculator.proto
Done in 0.22s.
Compiling index.ts...
node ./node_modules/assemblyscript/bin/asc assembly/index.ts --target release --use abort= --use BUILD_FOR_TESTING=0 --disable sign-extension --config asconfig.json
```

We will use the CLI to upload the contract. Take a look at the [contract deployment guide](./deploy-contract.md) for more in depth information. We will assume `contract.wasm` and `contract.abi` exist in the current directory and are named as such. Change those names and locations as needed to fit your environment.

```{ .txt, .no-copy }
🔐 > help upload
Upload a smart contract
Usage: upload <filename:file> [abi-filename:file] [override-authorize-call-contract:bool] [override-authorize-transaction-application:bool] [override-authorize-upload-contract:bool]
```

We have four optional arguments, the ABI and the three authorize overrides. For our example, we want to only override contract upload. However, let's first upload the contract with no overrides to demonstrate the changed behavior.

```{ .txt, .no-copy }
🔓 > upload contract.wasm contract.abi false false false
Contract uploaded with address 1EfSZM93JJi5jkpzUFbTw1kojvTCrwJfom
Transaction with ID 0x1220487c3159af6448c2b64e851e8583323f99484bdc28769a613da97283fb49ffe1 containing 1 operations submitted.
Mana cost: 1.21217325 (Disk: 16674, Network: 18963, Compute: 345885)
```

Now let's upload the contract, but this time we will set the override upload contract to true. It is the last of the optional arguments, so the override flags will be `false false true`.

```{ .txt, .no-copy }
🔓 > upload contract.wasm calculator.abi false false true
Contract uploaded with address 1EfSZM93JJi5jkpzUFbTw1kojvTCrwJfom
Transaction with ID 0x122084a33c2c0937f9e995335b13d7cf64e0bf7e17e891f4661981f9358a145077bf containing 1 operations submitted.
Mana cost: 0.19303811 (Disk: 2, Network: 18965, Compute: 345999)
```

The upload works as expected, but now if we try to upload the contract again, we should get a failure because we overrode the upload contract authority and permanently set it to not authorize, locking the contract.

```{ .txt, .no-copy }
🔓 > address
Wallet address: 1EfSZM93JJi5jkpzUFbTw1kojvTCrwJfom

🔓 > upload contract.wasm calculator.abi false false false
cannot upload contract, account 1EfSZM93JJi5jkpzUFbTw1kojvTCrwJfom has not authorized action
```

Notice how we have the wallet open with the address `1EfSZM93JJi5jkpzUFbTw1kojvTCrwJfom`, yet the address has not authorized the transaction. That is the override at work!

Because we only overrode the upload contract authority, we should still be able to transfer tokens from address.

```{ .txt, .no-copy }
🔓 > tkoin.transfer 147ABaHVxtpoSpfpZ8yry7eaFAjV87trGR 10
Transferring 10 tKOIN to 147ABaHVxtpoSpfpZ8yry7eaFAjV87trGR
Transaction with ID 0x1220b58a042fa2b6cb5489e7261f6d68305dd7e915644a90555847005877899ed9d9 containing 1 operations submitted.
Mana cost: 0.03170468 (Disk: 0, Network: 313, Compute: 576126)
```

As expected, transferring tokens still works with the address because the only authority we overrode was contract upload.

Authority overrides are an extremely powerful feature of Koinos that grants the developer an incredible amount of control, flexibility, and creativity in how they design smart contracts in order to implement any possible authorization scheme.
