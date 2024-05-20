# Staking
Welcome to the Staking guide, your essential manual for leveraging the power of smart contracts in the Koinos ecosystem. This guide is designed to help developers and users understand the intricacies of creating and deploying staking smart contracts, which automate and enhance the staking process. By utilizing smart contracts, you can ensure secure, transparent, and efficient staking operations that maximize the potential of your tokens. Whether you are a seasoned developer or a newcomer eager to explore blockchain technology, this guide provides the knowledge and tools necessary to effectively utilize staking smart contracts on Koinos.

Before embarking on this journey, ensure that you have already setup your Koinos AssemblyScript SDK environment by following [this guide](../as-sdk.md).

!!! note
    This guide does not create a new token, it only allows to you stake a pre-existing token. For a guide on launching a token you can folow the guide for that [here](token.md).

---
## Setting up the project
Let's begin by creating a boilerplate smart contract project using the Koinos AssemblyScript SDK.

```sh
koinos-sdk-as-cli create staking
```

```{ .txt .no-copy }
Generating contract at "/home/$USER/Workspace/staking" ...

Contract successfully generated!

You're all set! Run the following set of commands to verify that the generated contract is correctly setup:

  cd /home/$USER/Workspace/staking && yarn install && yarn build:debug && yarn test
```

Change your directory to the project directory and install dependencies.
```sh
cd staking
yarn install
```

```{ .txt .no-copy }
yarn install v1.22.22
info No lockfile found.
[1/4] Resolving packages...
warning @koinos/sdk-as > @koinos/mock-vm > multibase@4.0.6: This module has been superseded by the multiformats module
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > @npmcli/ci-detect@2.0.0: this package has been deprecated, use `ci-info` instead
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > libnpmexec > @npmcli/ci-detect@2.0.0: this package has been deprecated, use `ci-info` instead
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > readdir-scoped-modules@1.1.0: This functionality has been moved to @npmcli/fs
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > @npmcli/arborist > readdir-scoped-modules@1.1.0: This functionality has been moved to @npmcli/fs
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > @npmcli/arborist > @npmcli/move-file@2.0.1: This functionality has been moved to @npmcli/fs
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > cacache > @npmcli/move-file@2.0.1: This functionality has been moved to @npmcli/fs
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > readdir-scoped-modules > debuglog@1.0.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
warning local-koinos > koilib > multibase@4.0.6: This module has been superseded by the multiformats module
[2/4] Fetching packages...
[3/4] Linking dependencies...
warning "@koinos/sdk-as > @as-covers/core > @as-covers/transform > visitor-as@0.6.0" has incorrect peer dependency "assemblyscript@^0.18.31".
warning " > ts-node@10.9.2" has unmet peer dependency "@types/node@*".
warning Workspaces can only be enabled in private projects.
[4/4] Building fresh packages...
success Saved lockfile.
Done in 93.97s.
```

---
## Defining methods and data
Constructing a smart contract typically involves defining both behaviors and data. The behavior is specified by the smart contract itself, while the data is defined using Protobuf. By generating data structures with Protobuf, we enable seamless integration of the smart contract with other Koinos tools. We have outlined the arguments and results required for our staking operations, following the convention of using `*_arguments` for contract function arguments and `*_result` for contract function results.

Let's begin by defining our entry point arguments and results.
```sh
vi assembly/proto/staking.proto
```

We can remove the boilerplate code and replace it with our standard staking arguments and results.

```proto linenums="1" title="assembly/proto/staking.proto"
/**
 * @file  staking.proto
 * @brief Defines inputs and outputs of the staking smart contract.
 */
syntax = "proto3";

package staking;

import "koinos/options.proto"; 

/*
   @description Get staking balance
   @read-only true
*/
message balance_of_arguments {
   bytes account = 1 [(koinos.btype) = ADDRESS];
}

message balance_of_result {
   uint64 value = 1 [jstype = JS_STRING];
}

/*
   @description Stake token
   @read-only false
*/
message stake_arguments {
   bytes account = 1 [(koinos.btype) = ADDRESS];
   uint64 value  = 2 [jstype = JS_STRING];
}

message stake_result {
   bool value = 1;
}

/*
   @description Withdraw staked token
   @read-only false
*/
message withdraw_arguments {
   bytes account = 1 [(koinos.btype) = ADDRESS];
   uint64 value  = 2 [jstype = JS_STRING];
}

message withdraw_result {
   bool value = 1;
}

message balance_object {
   uint64 value = 1 [jstype = JS_STRING];
}

message stake_event {
   bytes account = 1 [(koinos.btype) = ADDRESS];
   uint64 value = 2 [jstype = JS_STRING];
}

message withdraw_event {
   bytes account = 1 [(koinos.btype) = ADDRESS];
   uint64 value = 2 [jstype = JS_STRING];
}
```

Now that we have our Protobuf definition, let's generate our derived AssemblyScript code.
```sh
koinos-sdk-as-cli generate-contract-proto
```

```{ .txt .no-copy }
Generating Contract AS proto files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/*.proto
yarn run v1.22.22
$ /home/$USER/Workspace/staking/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/staking.proto
@protobuf-ts/protoc installed protoc v26.1.
Done in 20.43s.
❯ koinos-sdk-as-cli generate-contract-proto
Generating Contract AS proto files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/*.proto
yarn run v1.22.22
$ /home/$USER/Workspace/staking/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/staking.proto
Done in 0.68s.
```

Note that after executing this command the file `assembly/proto/staking.ts` was automatically generated and contains code that will assist us in serializing and deserializing data in and out of the KVM.

---
## The implementation
Now, we have defined the data in which arguments come into our contract and also the data which is returned by our contract. All we need now is our implementation.

Because our smart contracts utilizes disk storage to keep track of tokens that are staked, let's create a new file called `State.ts` that defines how save and retrieve data from disk.

```sh
vi assembly/State.ts
```

And we'll add the following implementation.

```ts linenums="1" title="assembly/State.ts"
import { System, chain } from "@koinos/sdk-as";
import { staking } from "./proto/staking";

const BALANCE_SPACE_ID = 1;

export class State {
  contractId: Uint8Array;
  balanceSpace: chain.object_space;

  constructor(contractId: Uint8Array) {
    this.contractId = contractId;

    this.balanceSpace = new chain.object_space(false, contractId, BALANCE_SPACE_ID);
  }

  GetBalance(owner: Uint8Array): staking.balance_object {
    const balance = System.getObject<Uint8Array, staking.balance_object>(this.balanceSpace, owner, staking.balance_object.decode);

    if (balance) {
      return balance;
    }

    return new staking.balance_object();
  }

  SaveBalance(owner: Uint8Array, balance: staking.balance_object): void {
    System.putObject(this.balanceSpace, owner, balance, staking.balance_object.encode);
  }
}
```

Let's use the tools to automatically generate the boilerplate implementation.
```sh
koinos-sdk-as-cli generate-contract-as staking.proto
```

```{ .txt .no-copy }
Generating boilerplate.ts and index.ts files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/Staking.proto
yarn run v1.22.22
$ /home/$USER/Workspace/staking/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/Staking.proto
Done in 0.94s.
```

After invoking this command, we have two newly generated files. The first is `assembly/index.ts` which is the first location our smart contract codes begin executing. This file acts as a router to call the appropriate method on our class based on how the smart contract was invoked.

The second file that was generated is `assembly/Staking.boilerplate.ts`. This is where our implementation lives. We should rename this file to `Staking.ts` and begin our implementation.

```sh
rm assembly/Staking.ts
mv assembly/Staking.boilerplate.ts assembly/Staking.ts
vi assembly/Staking.ts
```

Finally, let's open our implementation file and write some simple arithmetic to complete our Staking's functionality.

!!! note
    The `TOKEN_CONTRACT_ID` is a variable that defines the token that can be staked in this contract. To launch your own token you can follow the guide [here](token.md).

```ts linenums="1" title="assembly/Staking.ts"
/**
 * @file  Staking.ts
 * @brief Implements Staking smart contract functionality.
 */
import { Base58, Protobuf, SafeMath, System, Token } from "@koinos/sdk-as";
import { staking } from "./proto/staking";
import { State } from "./State";

const TOKEN_CONTRACT_ID = Base58.decode('19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ');

export class Staking {
  _contractId: Uint8Array;
  _state: State;
  _token: Token;

  constructor() {
    this._contractId = System.getContractId();
    this._state = new State(this._contractId);
    this._token = new Token(TOKEN_CONTRACT_ID);
  }

  balance_of(args: staking.balance_of_arguments): staking.balance_of_result {
    const account = args.account as Uint8Array;

    const balanceObj = this._state.GetBalance(account);

    const res = new staking.balance_of_result();
    res.value = balanceObj.value;

    return res;
  }

  stake(args: staking.stake_arguments): staking.stake_result {
    const account = args.account as Uint8Array;
    const value = args.value;

    const res = new staking.stake_result(false);

    if (!this._token.transfer(account, this._contractId, value)) {
      System.log("Token transfer from 'account' failed");

      return res;
    }

    const accountBalance = this._state.GetBalance(account);
    accountBalance.value = SafeMath.add(accountBalance.value, value);

    this._state.SaveBalance(account, accountBalance);

    const stakeEvent = new staking.stake_event(account, value);
    const impacted = [account];

    System.event('staking.stake', Protobuf.encode(stakeEvent, staking.stake_event.encode), impacted);

    res.value = true;

    return res;
  }

  withdraw(args: staking.withdraw_arguments): staking.withdraw_result {
    const account = args.account as Uint8Array;
    const value = args.value;

    const res = new staking.withdraw_result(false);

    const accountBalance = this._state.GetBalance(account);

    if (accountBalance.value < value) {
      System.log("'account' has insufficient balance");

      return res;
    }

    if (!this._token.transfer(this._contractId, account, value)) {
      System.log('Contract had insufficient funds for withdraw ¯\\_(ツ)_/¯');

      return res;
    }

    accountBalance.value -= value;

    this._state.SaveBalance(account, accountBalance);

    const withdrawEvent = new staking.withdraw_event(account, value);
    const impacted = [account];

    System.event('staking.withdraw', Protobuf.encode(withdrawEvent, staking.withdraw_event.encode), impacted);

    res.value = true;

    return res;
  }
}
```

And finally, we build it.
```sh
koinos-sdk-as-cli build debug 0
```

```{ .txt .no-copy }
Compiling index.ts...
node ./node_modules/assemblyscript/bin/asc assembly/index.ts --target debug --use abort= --use BUILD_FOR_TESTING=0 --disable sign-extension --config asconfig.json
```

---
## Time for tests
All code needs tests. The most basic form of a testing is, of course, unit tests. Let's use the built-in unit test system to exercise our staking code.

Let's open up `assembly/__tests__/Staking.spec.ts` and write some tests.

```sh
vi assembly/__tests__/Staking.spec.ts
```

Let's add the following test code.

```ts linenums="1" title="assembly/__tests__/Staking.spec.ts"
/**
 * @file  Staking.spec.ts
 * @brief Implements unit tests for the staking smart contract.
 */
import { Base58, chain, MockVM, Protobuf, system_calls, token } from '@koinos/sdk-as';
import { Staking } from '../Staking';
import { staking } from '../proto/staking';

const TOKEN_CONTRACT_ID = Base58.decode('1FPiwDdVGhWb4iAvvdALVXY88rgvkAA5mT');
const MOCK_ACCT1 = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG');

describe('staking', () => {
  beforeEach(() => {
    MockVM.reset();
    MockVM.setContractId(TOKEN_CONTRACT_ID);
  });

  it('should stake tokens', () => {
    const stk = new Staking();

    let contractResults: system_calls.exit_arguments[] = [];
    contractResults.push(new system_calls.exit_arguments(0, new chain.result( Protobuf.encode(new token.transfer_result(), token.transfer_result.encode) )));

    // mock a successful token transfer result
    MockVM.setCallContractResults(contractResults);

    // call the stake function
    const stakeArgs = new staking.stake_arguments(MOCK_ACCT1, 10);
    const stakeRes = stk.stake(stakeArgs);

    // should be successfully staked
    expect(stakeRes.value).toBe(true);

    // the staked balance should reflect the correct amount
    const balArgs = new staking.balance_of_arguments(MOCK_ACCT1);
    const balRes = stk.balance_of(balArgs);

    expect(balRes.value).toBe(10);
  });
});
```

Ok, let's run it and see what happens.

```sh
koinos-sdk-as-cli run-tests
```

```{ .txt .no-copy }
Running tests...
yarn asp --verbose --config as-pect.config.js
yarn run v1.22.22
$ /home/sgerbino/Workspace/staking/node_modules/.bin/asp --verbose --config as-pect.config.js
       ___   _____                       __    
      /   | / ___/      ____  ___  _____/ /_   
     / /| | \__ \______/ __ \/ _ \/ ___/ __/   
    / ___ |___/ /_____/ /_/ /  __/ /__/ /_     
   /_/  |_/____/     / .___/\___/\___/\__/     
                    /_/                        

⚡AS-pect⚡ Test suite runner [6.2.4]

[Log] Loading asc compiler
Assemblyscript Folder:assemblyscript
[Log] Compiler loaded in 193.08ms.
[Log] Using configuration /home/sgerbino/Workspace/staking/as-pect.config.js
[Log] Using VerboseReporter
[Log] Including files: assembly/__tests__/**/*.spec.ts
[Log] Running tests that match: (:?)
[Log] Running groups that match: (:?)
[Log] Effective command line args:
  [TestFile.ts] node_modules/@as-pect/assembly/assembly/index.ts --runtime incremental --debug --binaryFile output.wasm --explicitStart --use ASC_RTRACE=1 --exportTable --importMemory --transform /home/sgerbino/Workspace/staking/node_modules/@as-covers/transform/lib/index.js,/home/sgerbino/Workspace/staking/node_modules/@as-pect/core/lib/transform/index.js --lib node_modules/@as-covers/assembly/index.ts

[Describe]: staking

[Event] staking.stake / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EAo=
 [Success]: ✔ should stake tokens RTrace: +101

    [File]: assembly/__tests__/Staking.spec.ts
  [Groups]: 2 pass, 2 total
  [Result]: ✔ PASS
[Snapshot]: 0 total, 0 added, 0 removed, 0 different
 [Summary]: 1 pass,  0 fail, 1 total
    [Time]: 26.635ms

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  [Result]: ✔ PASS
   [Files]: 1 total
  [Groups]: 2 count, 2 pass
   [Tests]: 1 pass, 0 fail, 1 total
    [Time]: 3574.229ms
┌─────────────────────┬───────┬───────┬───────┬──────┬──────────────────────────────────┐
│ File                │ Total │ Block │ Func  │ Expr │ Uncovered                        │
├─────────────────────┼───────┼───────┼───────┼──────┼──────────────────────────────────┤
│ assembly/Staking.ts │ 54.5% │ 42.9% │ 75%   │ N/A  │ 39:66, 60:71, 68:39, 74:66, 60:3 │
├─────────────────────┼───────┼───────┼───────┼──────┼──────────────────────────────────┤
│ assembly/State.ts   │ 100%  │ 100%  │ 100%  │ N/A  │                                  │
├─────────────────────┼───────┼───────┼───────┼──────┼──────────────────────────────────┤
│ total               │ 72.2% │ 63.6% │ 85.7% │ N/A  │                                  │
└─────────────────────┴───────┴───────┴───────┴──────┴──────────────────────────────────┘

Done in 3.78s.
```

Excellent, you have written a simple staking smart contract with custom data types and methods with unit tests! Well done!
