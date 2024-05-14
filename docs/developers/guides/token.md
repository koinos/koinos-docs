# Token
Welcome to our guide on launching a token collection using the Koinos Contract Standard (KCS-1) for tokens and the AssemblyScript SDK for Koinos. In this tutorial, we'll walk you through the process of creating and deploying your own token on the Koinos blockchain. Whether you're a seasoned developer or new to blockchain development, this step-by-step guide will provide you with the knowledge and tools necessary to bring your token project to life. Let's dive in and explore the exciting world of token creation on Koinos!

Before starting, ensure that you have already set up your Koinos AssemblyScript SDK environment by following [this guide](../as-sdk.md).

---
## Setting up the project
Let's begin by creating a boilerplate smart contract project using the Koinos AssemblyScript SDK.

```sh
koinos-sdk-as-cli create token
```

```{ .txt .no-copy }
Generating contract at "/home/$USER/Workspace/token" ...

Contract successfully generated!

You're all set! Run the following set of commands to verify that the generated contract is correctly setup:

  cd /home/$USER/Workspace/token && yarn install && yarn build:debug && yarn test
```

Change your directory to the project directory and install dependencies.
```sh
cd token
yarn install
```

```{ .txt .no-copy }
yarn install v1.22.19
warning ../../../../../package.json: No license field
info No lockfile found.
[1/4] 🔍  Resolving packages...
warning @koinos/sdk-as > @koinos/mock-vm > multibase@4.0.6: This module has been superseded by the multiformats module
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > @npmcli/ci-detect@2.0.0: this package has been deprecated, use `ci-info` instead
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > libnpmexec > @npmcli/ci-detect@2.0.0: this package has been deprecated, use `ci-info` instead
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > readdir-scoped-modules@1.1.0: This functionality has been moved to @npmcli/fs
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > @npmcli/arborist > readdir-scoped-modules@1.1.0: This functionality has been moved to @npmcli/fs
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > @npmcli/arborist > @npmcli/move-file@2.0.1: This functionality has been moved to @npmcli/fs
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > cacache > @npmcli/move-file@2.0.1: This functionality has been moved to @npmcli/fs
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > readdir-scoped-modules > debuglog@1.0.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
warning local-koinos > koilib > multibase@4.0.6: This module has been superseded by the multiformats module
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
warning "@koinos/sdk-as > @as-covers/core > @as-covers/transform > visitor-as@0.6.0" has incorrect peer dependency "assemblyscript@^0.18.31".
warning " > ts-node@10.9.2" has unmet peer dependency "@types/node@*".
warning Workspaces can only be enabled in private projects.
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
✨  Done in 12.96s.
```

---
## Defining methods and data
Building a contract will usually consist of behaviors and data. The behavior is defined by the smart contract. But the data is defined by Protobuf. We generate data structures with Protobuf so that the smart contract can easily integrate with other Koinos tools. We have defined the arguments and results we will use in our calculator. We use the `*_arguments` convention for contract function arguments and `*_result` for contract function results.

Let's begin by defining our entry point arguments and results.
```sh
vi assembly/proto/token.proto
```


Currently, the `token.proto` file contains the following boilerplate code:

```proto linenums="1" title="assembly/proto/token.proto"
syntax = "proto3";

package token;

// @description Says Hello!
// @read-only true
message hello_arguments {
  string name = 1;
}

message hello_result {
  string value = 1;
}
```

We can remove the boilerplate code and replace it with our token arguments and results.
```proto linenums="1" title="assembly/proto/token.proto"

syntax = "proto3";

package token;

import "koinos/options.proto"; 

message empty_message {}

// @description Returns the token's name
// @read-only true
message name_arguments {}

message name_result {
   string value = 1;
}

// @description Returns the token's symbol
// @read-only true
message symbol_arguments {}

message symbol_result {
   string value = 1;
}

// @description Returns the token's decimals precision
// @read-only true
message decimals_arguments {}

message decimals_result {
   uint32 value = 1;
}

// @description Returns the token's total supply
// @read-only true
message total_supply_arguments {}

message total_supply_result {
   uint64 value = 1 [jstype = JS_STRING];
}

// @description Returns the token's max supply
// @read-only true
message max_supply_arguments {}

message max_supply_result {
   uint64 value = 1 [jstype = JS_STRING];
}

// @description Checks the balance at an address
// @read-only true
message balance_of_arguments {
   bytes owner = 1 [(koinos.btype) = ADDRESS];
}

message balance_of_result {
   uint64 value = 1 [jstype = JS_STRING];
}

// @description Transfers the token
// @read-only false
// @result empty_message
message transfer_arguments {
   bytes from = 1 [(koinos.btype) = ADDRESS];
   bytes to = 2 [(koinos.btype) = ADDRESS];
   uint64 value = 3 [jstype = JS_STRING];
}

// @description Mints the token
// @read-only false
// @result empty_message
message mint_arguments {
   bytes to = 1 [(koinos.btype) = ADDRESS];
   uint64 value = 2 [jstype = JS_STRING];
}

// @description Burns the token
// @read-only false
// @result empty_message
message burn_arguments {
   bytes from = 1 [(koinos.btype) = ADDRESS];
   uint64 value = 2 [jstype = JS_STRING];
}

message balance_object {
   uint64 value = 1 [jstype = JS_STRING];
}

message mint_event {
   bytes to = 1 [(koinos.btype) = ADDRESS];
   uint64 value = 2 [jstype = JS_STRING];
}

message burn_event {
   bytes from = 1 [(koinos.btype) = ADDRESS];
   uint64 value = 2 [jstype = JS_STRING];
}

message transfer_event {
   bytes from = 1 [(koinos.btype) = ADDRESS];
   bytes to = 2 [(koinos.btype) = ADDRESS];
   uint64 value = 3 [jstype = JS_STRING];
}
```
Now that we have our Protobuf definition, let's generate the derived AssemblyScript code.
```sh
koinos-sdk-as-cli generate-contract-proto
```

```{ .txt .no-copy }
yarn install v1.22.19
warning ../../../../../package.json: No license field
info No lockfile found.
[1/4] 🔍  Resolving packages...
warning @koinos/sdk-as > @koinos/mock-vm > multibase@4.0.6: This module has been superseded by the multiformats module
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > @npmcli/ci-detect@2.0.0: this package has been deprecated, use `ci-info` instead
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > libnpmexec > @npmcli/ci-detect@2.0.0: this package has been deprecated, use `ci-info` instead
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > readdir-scoped-modules@1.1.0: This functionality has been moved to @npmcli/fs
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > @npmcli/arborist > readdir-scoped-modules@1.1.0: This functionality has been moved to @npmcli/fs
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > @npmcli/arborist > @npmcli/move-file@2.0.1: This functionality has been moved to @npmcli/fs
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > cacache > @npmcli/move-file@2.0.1: This functionality has been moved to @npmcli/fs
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > readdir-scoped-modules > debuglog@1.0.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
warning local-koinos > koilib > multibase@4.0.6: This module has been superseded by the multiformats module
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
warning "@koinos/sdk-as > @as-covers/core > @as-covers/transform > visitor-as@0.6.0" has incorrect peer dependency "assemblyscript@^0.18.31".
warning " > ts-node@10.9.2" has unmet peer dependency "@types/node@*".
warning Workspaces can only be enabled in private projects.
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
✨  Done in 12.96s.
❯ C
❯ koinos-sdk-as-cli generate-contract-proto
Generating Contract AS proto files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/*.proto
yarn run v1.22.19
warning ../../../../../package.json: No license field
$ ../token-tutorial/token/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/token.proto
Done in 0.78s.
```
Note that after executing this command, the file `assembly/proto/token.ts` was automatically generated and contains code that will assist us in serializing and deserializing data in and out of the KVM.

---
## The implementation
Now, we have defined the data in which arguments come into our contract and also the data which is returned by our contract. All we need now is our implementation.

Let's use the tools to automatically generate the boilerplate implementation.
```sh
koinos-sdk-as-cli generate-contract-as token.proto
```

```{ .txt .no-copy }
Generating boilerplate.ts and index.ts files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/token.proto
yarn run v1.22.19
warning ../../../../../package.json: No license field
$ /Users/$USER/Workspace/token/token/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/token.proto
Done in 1.31s.
```

After invoking this command, we have two newly generated files. The first is `assembly/index.ts` which is the first location our smart contract codes begin executing. This file acts as a router to call the appropriate method on our class because of how the smart contract was invoked.

The second file that was generated is `assembly/Token.boilerplate.ts`. This is where our implementation lives. We should rename this file to `Token.ts` and begin our implementation.

```sh
rm assembly/Token.ts
mv assembly/Token.boilerplate.ts assembly/Token.ts
vi assembly/Token.ts
```

Let's open our implementation file and write logic to add our token's functionality. 

```ts linenums="1" title="assembly/Token.ts"

import {
  Arrays,
  Protobuf,
  System,
  SafeMath,
  authority,
  error,
} from "@koinos/sdk-as";
import { token } from "./proto/token";
import { SupplyStorage } from "./state/SupplyStorage";
import { BalancesStorage } from "./state/BalancesStorage";

export class Token {
  // SETTINGS BEGIN
  _name: string = "[token name]";
  _symbol: string = "[token symbol]";
  _decimals: u32 = 8;

  // set _maxSupply to zero if there is no max supply
  // if set to zero, the supply would still be limited by how many tokens can fit in a u64 (u64.MAX_VALUE)
  _maxSupply: u64 = 0;

  // SETTINGS END

  _contractId: Uint8Array = System.getContractId();
  _supplyStorage: SupplyStorage = new SupplyStorage(this._contractId);
  _balancesStorage: BalancesStorage = new BalancesStorage(this._contractId);

  name(args: token.name_arguments): token.name_result {
    return new token.name_result(this._name);
  }

  symbol(args: token.symbol_arguments): token.symbol_result {
    return new token.symbol_result(this._symbol);
  }

  decimals(args: token.decimals_arguments): token.decimals_result {
    return new token.decimals_result(this._decimals);
  }

  total_supply(args: token.total_supply_arguments): token.total_supply_result {
    const supply = this._supplyStorage.get()!;

    const res = new token.total_supply_result();
    res.value = supply.value;

    return res;
  }

  max_supply(args: token.max_supply_arguments): token.max_supply_result {
    return new token.max_supply_result(this._maxSupply);
  }

  balance_of(args: token.balance_of_arguments): token.balance_of_result {
    const owner = args.owner;

    const balanceObj = this._balancesStorage.get(owner!)!;

    const res = new token.balance_of_result();
    res.value = balanceObj.value;

    return res;
  }

  transfer(args: token.transfer_arguments): token.empty_message {
    System.require(args.from, "Missing 'from' field");
    System.require(args.to, "Missing 'to' field");
    const from = args.from!;
    const to = args.to!;
    const value = args.value;

    System.require(!Arrays.equal(from, to), "Cannot transfer to self");

    System.require(
      Arrays.equal(System.getCaller().caller, from) ||
        System.checkAuthority(
          authority.authorization_type.contract_call,
          from,
          System.getArguments().args
        ),
      "'from' has not authorized transfer",
      error.error_code.authorization_failure
    );

    const fromBalance = this._balancesStorage.get(from)!;

    System.require(
      fromBalance.value >= value,
      "'from' has insufficient balance"
    );

    const toBalance = this._balancesStorage.get(to)!;

    // the balances cannot hold more than the supply, so we don't check for overflow/underflow
    fromBalance.value -= value;
    toBalance.value += value;

    this._balancesStorage.put(from, fromBalance);
    this._balancesStorage.put(to, toBalance);

    const transferEvent = new token.transfer_event(from, to, value);
    const impacted = [to, from];

    System.event(
      "koinos.contracts.token.transfer_event",
      Protobuf.encode(transferEvent, token.transfer_event.encode),
      impacted
    );

    return new token.empty_message();
  }

  mint(args: token.mint_arguments): token.empty_message {
    System.require(args.to, "Missing 'to' field");
    const to = args.to!;
    const value = args.value;

    System.requireAuthority(
      authority.authorization_type.contract_call,
      this._contractId
    );

    const supply = this._supplyStorage.get()!;

    const newSupply = SafeMath.tryAdd(supply.value, value);

    System.require(!newSupply.error, "Mint would overflow supply");

    System.require(
      this._maxSupply == 0 || newSupply.value <= this._maxSupply,
      "Mint would overflow max supply"
    );

    const toBalance = this._balancesStorage.get(to)!;
    toBalance.value += value;

    supply.value = newSupply.value;

    this._supplyStorage.put(supply);
    this._balancesStorage.put(to, toBalance);

    const mintEvent = new token.mint_event(to, value);
    const impacted = [to];

    System.event(
      "koinos.contracts.token.mint_event",
      Protobuf.encode(mintEvent, token.mint_event.encode),
      impacted
    );

    return new token.empty_message();
  }

  burn(args: token.burn_arguments): token.empty_message {
    System.require(args.from, "Missing 'from' field");
    const from = args.from!;
    const value = args.value;

    System.require(
      Arrays.equal(System.getCaller().caller, from) ||
        System.checkAuthority(
          authority.authorization_type.contract_call,
          from,
          System.getArguments().args
        ),
      "'from' has not authorized transfer",
      error.error_code.authorization_failure
    );

    const fromBalance = this._balancesStorage.get(from)!;

    System.require(
      fromBalance.value >= value,
      "'from' has insufficient balance"
    );

    const supply = this._supplyStorage.get()!;

    const newSupply = SafeMath.sub(supply.value, value);

    supply.value = newSupply;
    fromBalance.value -= value;

    this._supplyStorage.put(supply);
    this._balancesStorage.put(from, fromBalance);

    const burnEvent = new token.burn_event(from, value);
    const impacted = [from];

    System.event(
      "koinos.contracts.token.burn_event",
      Protobuf.encode(burnEvent, token.burn_event.encode),
      impacted
    );

    return new token.empty_message();
  }
}


```

We have to add `assembly/state` directory where we define our storage. 

``` sh title="assembly/state"
BalancesStorage.ts
SpaceIds.ts
SupplyStorage.ts
```

Create the above files and add this code to each:

```ts linenums="1" title="assembly/state/BalancesStorage.ts"

import { Storage } from '@koinos/sdk-as';
import { token } from '../proto/token';
import { BALANCE_SPACE_ID } from './SpaceIds';

export class BalancesStorage extends Storage.Map<Uint8Array, token.balance_object> {
  constructor(contractId: Uint8Array) {
    super(
      contractId, 
      BALANCE_SPACE_ID, 
      token.balance_object.decode, 
      token.balance_object.encode,
      // default balance is 0
      () => new token.balance_object()
    );
  }
}

```

```ts linenums="1" title="assembly/state/SpaceIds.ts"

export const SUPPLY_SPACE_ID = 0;
export const BALANCE_SPACE_ID = 1;

```

```ts linenums="1" title="assembly/state/SupplyStorage.ts"

import { Storage } from '@koinos/sdk-as';
import { token } from '../proto/token';
import { SUPPLY_SPACE_ID } from './SpaceIds';

export class SupplyStorage extends Storage.Obj<token.balance_object> {
  constructor(contractId: Uint8Array) {
    super(
      contractId, 
      SUPPLY_SPACE_ID, 
      token.balance_object.decode, 
      token.balance_object.encode,
      // total supply is 0 by default
      () => new token.balance_object()
    );
  }
}

```


---
## Building and testing

Let's modify our `Token.spec.ts` file to test our contract. 

```ts linenums="1" title="assembly/__tests__/Token.spec.ts"
import {
  Base58,
  MockVM,
  Arrays,
  Protobuf,
  authority,
  chain,
} from "@koinos/sdk-as";
import { Token } from "../Token";
import { token } from "../proto/token";

const CONTRACT_ID = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe");
const MOCK_ACCT1 = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG");
const MOCK_ACCT2 = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK");

describe("token", () => {
  beforeEach(() => {
    MockVM.reset();
    MockVM.setContractId(CONTRACT_ID);
    MockVM.setCaller(
      new chain.caller_data(new Uint8Array(0), chain.privilege.user_mode)
    );
  });

  it("should get the name", () => {
    const tkn = new Token();

    const args = new token.name_arguments();
    const res = tkn.name(args);

    expect(res.value).toBe("[token name]");
  });

  it("should get the symbol", () => {
    const tkn = new Token();

    const args = new token.symbol_arguments();
    const res = tkn.symbol(args);

    expect(res.value).toBe("[token symbol]");
  });

  it("should get the decimals", () => {
    const tkn = new Token();

    const args = new token.decimals_arguments();
    const res = tkn.decimals(args);

    expect(res.value).toBe(8);
  });

  it("should get the max supply", () => {
    const tkn = new Token();

    const args = new token.max_supply_arguments();
    const res = tkn.max_supply(args);

    expect(res.value).toBe(0);
  });

  it("should/not burn tokens", () => {
    const tkn = new Token();

    MockVM.setContractArguments(new Uint8Array(0));
    MockVM.setEntryPoint(1);

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    let auth = new MockVM.MockAuthority(
      authority.authorization_type.contract_call,
      CONTRACT_ID,
      true
    );
    MockVM.setAuthorities([auth]);

    // check total supply
    const totalSupplyArgs = new token.total_supply_arguments();
    let totalSupplyRes = tkn.total_supply(totalSupplyArgs);
    expect(totalSupplyRes.value).toBe(0);

    // mint tokens
    const mintArgs = new token.mint_arguments(MOCK_ACCT1, 123);
    tkn.mint(mintArgs);

    auth = new MockVM.MockAuthority(
      authority.authorization_type.contract_call,
      MOCK_ACCT1,
      true
    );
    MockVM.setAuthorities([auth]);

    // burn tokens
    let burnArgs = new token.burn_arguments(MOCK_ACCT1, 10);
    tkn.burn(burnArgs);

    // check events
    const events = MockVM.getEvents();
    expect(events.length).toBe(2);
    expect(events[0].name).toBe("koinos.contracts.token.mint_event");
    expect(events[0].impacted.length).toBe(1);
    expect(Arrays.equal(events[0].impacted[0], MOCK_ACCT1)).toBe(true);
    expect(events[1].name).toBe("koinos.contracts.token.burn_event");
    expect(events[1].impacted.length).toBe(1);
    expect(Arrays.equal(events[1].impacted[0], MOCK_ACCT1)).toBe(true);

    const burnEvent = Protobuf.decode<token.burn_event>(
      events[1].data!,
      token.burn_event.decode
    );
    expect(Arrays.equal(burnEvent.from, MOCK_ACCT1)).toBe(true);
    expect(burnEvent.value).toBe(10);

    // check balance
    let balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    let balanceRes = tkn.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(113);

    // check total supply
    totalSupplyRes = tkn.total_supply(totalSupplyArgs);
    expect(totalSupplyRes.value).toBe(113);

    // save the MockVM state because the burn is going to revert the transaction
    MockVM.commitTransaction();

    // does not burn tokens
    expect(() => {
      const tkn = new Token();
      const burnArgs = new token.burn_arguments(MOCK_ACCT1, 200);
      tkn.burn(burnArgs);
    }).toThrow();

    // check error message
    expect(MockVM.getErrorMessage()).toStrictEqual(
      "'from' has insufficient balance"
    );

    MockVM.setAuthorities([]);

    // save the MockVM state because the burn is going to revert the transaction
    MockVM.commitTransaction();

    expect(() => {
      // try to burn tokens
      const tkn = new Token();
      const burnArgs = new token.burn_arguments(MOCK_ACCT1, 123);
      tkn.burn(burnArgs);
    }).toThrow();

    // check balance
    balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    balanceRes = tkn.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(113);

    // check total supply
    totalSupplyRes = tkn.total_supply(totalSupplyArgs);
    expect(totalSupplyRes.value).toBe(113);
  });

  it("should mint tokens", () => {
    const tkn = new Token();

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    const auth = new MockVM.MockAuthority(
      authority.authorization_type.contract_call,
      CONTRACT_ID,
      true
    );
    MockVM.setAuthorities([auth]);

    // check total supply
    const totalSupplyArgs = new token.total_supply_arguments();
    let totalSupplyRes = tkn.total_supply(totalSupplyArgs);
    expect(totalSupplyRes.value).toBe(0);

    // mint tokens
    const mintArgs = new token.mint_arguments(MOCK_ACCT1, 123);
    tkn.mint(mintArgs);

    // check events
    const events = MockVM.getEvents();
    expect(events.length).toBe(1);
    expect(events[0].name).toBe("koinos.contracts.token.mint_event");
    expect(events[0].impacted.length).toBe(1);
    expect(Arrays.equal(events[0].impacted[0], MOCK_ACCT1)).toBe(true);

    const mintEvent = Protobuf.decode<token.mint_event>(
      events[0].data!,
      token.mint_event.decode
    );
    expect(Arrays.equal(mintEvent.to, MOCK_ACCT1)).toBe(true);
    expect(mintEvent.value).toBe(123);

    // check balance
    const balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    const balanceRes = tkn.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(123);

    // check total supply
    totalSupplyRes = tkn.total_supply(totalSupplyArgs);
    expect(totalSupplyRes.value).toBe(123);
  });

  it("should not mint tokens if not contract account", () => {
    const tkn = new Token();

    // set contract_call authority for MOCK_ACCT1 to true so that we cannot mint tokens
    const auth = new MockVM.MockAuthority(
      authority.authorization_type.contract_call,
      MOCK_ACCT1,
      true
    );
    MockVM.setAuthorities([auth]);

    // check total supply
    const totalSupplyArgs = new token.total_supply_arguments();
    let totalSupplyRes = tkn.total_supply(totalSupplyArgs);
    expect(totalSupplyRes.value).toBe(0);

    // check balance
    const balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    let balanceRes = tkn.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(0);

    // save the MockVM state because the mint is going to revert the transaction
    MockVM.commitTransaction();

    expect(() => {
      // try to mint tokens
      const tkn = new Token();
      const mintArgs = new token.mint_arguments(MOCK_ACCT2, 123);
      tkn.mint(mintArgs);
    }).toThrow();

    // check balance
    balanceRes = tkn.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(0);

    // check total supply
    totalSupplyRes = tkn.total_supply(totalSupplyArgs);
    expect(totalSupplyRes.value).toBe(0);
  });

  it("should not mint tokens if new total supply overflows", () => {
    const tkn = new Token();

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    const auth = new MockVM.MockAuthority(
      authority.authorization_type.contract_call,
      CONTRACT_ID,
      true
    );
    MockVM.setAuthorities([auth]);

    let mintArgs = new token.mint_arguments(MOCK_ACCT2, 123);
    tkn.mint(mintArgs);

    // check total supply
    let totalSupplyArgs = new token.total_supply_arguments();
    let totalSupplyRes = tkn.total_supply(totalSupplyArgs);
    expect(totalSupplyRes.value).toBe(123);

    // save the MockVM state because the mint is going to revert the transaction
    MockVM.commitTransaction();

    expect(() => {
      // try to mint tokens
      const tkn = new Token();
      const mintArgs = new token.mint_arguments(MOCK_ACCT2, u64.MAX_VALUE);
      tkn.mint(mintArgs);
    }).toThrow();

    expect(MockVM.getErrorMessage()).toStrictEqual(
      "Mint would overflow supply"
    );

    // check total supply
    totalSupplyRes = tkn.total_supply(totalSupplyArgs);
    expect(totalSupplyRes.value).toBe(123);
  });

  it("should not mint tokens if new total supply overflows max supply", () => {
    const tkn = new Token();

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    const auth = new MockVM.MockAuthority(
      authority.authorization_type.contract_call,
      CONTRACT_ID,
      true
    );
    MockVM.setAuthorities([auth]);

    let mintArgs = new token.mint_arguments(MOCK_ACCT2, 123);
    tkn.mint(mintArgs);

    // check total supply
    let totalSupplyArgs = new token.total_supply_arguments();
    let totalSupplyRes = tkn.total_supply(totalSupplyArgs);
    expect(totalSupplyRes.value).toBe(123);

    // save the MockVM state because the mint is going to revert the transaction
    MockVM.commitTransaction();

    expect(() => {
      // try to mint tokens
      const tkn = new Token();
      tkn._maxSupply = 400;
      const mintArgs = new token.mint_arguments(MOCK_ACCT2, 500);
      tkn.mint(mintArgs);
    }).toThrow();

    expect(MockVM.getErrorMessage()).toStrictEqual(
      "Mint would overflow max supply"
    );

    // check total supply
    totalSupplyRes = tkn.total_supply(totalSupplyArgs);
    expect(totalSupplyRes.value).toBe(123);
  });

  it("should transfer tokens", () => {
    const tkn = new Token();

    MockVM.setContractArguments(new Uint8Array(0));
    MockVM.setEntryPoint(1);

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    const authContractId = new MockVM.MockAuthority(
      authority.authorization_type.contract_call,
      CONTRACT_ID,
      true
    );

    // set contract_call authority for MOCK_ACCT1 to true so that we can transfer tokens
    const authMockAcct1 = new MockVM.MockAuthority(
      authority.authorization_type.contract_call,
      MOCK_ACCT1,
      true
    );
    MockVM.setAuthorities([authContractId, authMockAcct1]);

    // mint tokens
    const mintArgs = new token.mint_arguments(MOCK_ACCT1, 123);
    tkn.mint(mintArgs);

    // transfer tokens
    const transferArgs = new token.transfer_arguments(
      MOCK_ACCT1,
      MOCK_ACCT2,
      10
    );
    tkn.transfer(transferArgs);

    // check balances
    let balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    let balanceRes = tkn.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(113);

    balanceArgs = new token.balance_of_arguments(MOCK_ACCT2);
    balanceRes = tkn.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(10);

    // check events
    const events = MockVM.getEvents();
    // 2 events, 1st one is the mint event, the second one is the transfer event
    expect(events.length).toBe(2);
    expect(events[1].name).toBe("koinos.contracts.token.transfer_event");
    expect(events[1].impacted.length).toBe(2);
    expect(Arrays.equal(events[1].impacted[0], MOCK_ACCT2)).toBe(true);
    expect(Arrays.equal(events[1].impacted[1], MOCK_ACCT1)).toBe(true);

    const transferEvent = Protobuf.decode<token.transfer_event>(
      events[1].data!,
      token.transfer_event.decode
    );
    expect(Arrays.equal(transferEvent.from, MOCK_ACCT1)).toBe(true);
    expect(Arrays.equal(transferEvent.to, MOCK_ACCT2)).toBe(true);
    expect(transferEvent.value).toBe(10);
  });

  it("should not transfer tokens without the proper authorizations", () => {
    const tkn = new Token();

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    const authContractId = new MockVM.MockAuthority(
      authority.authorization_type.contract_call,
      CONTRACT_ID,
      true
    );
    // do not set authority for MOCK_ACCT1
    MockVM.setAuthorities([authContractId]);

    // mint tokens
    const mintArgs = new token.mint_arguments(MOCK_ACCT1, 123);
    tkn.mint(mintArgs);

    // save the MockVM state because the transfer is going to revert the transaction
    MockVM.commitTransaction();

    expect(() => {
      // try to transfer tokens without the proper authorizations for MOCK_ACCT1
      const tkn = new Token();
      const transferArgs = new token.transfer_arguments(
        MOCK_ACCT1,
        MOCK_ACCT2,
        10
      );
      tkn.transfer(transferArgs);
    }).toThrow();

    expect(MockVM.getErrorMessage()).toStrictEqual(
      "'from' has not authorized transfer"
    );

    // check balances
    let balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    let balanceRes = tkn.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(123);

    balanceArgs = new token.balance_of_arguments(MOCK_ACCT2);
    balanceRes = tkn.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(0);
  });

  it("should not transfer tokens to self", () => {
    const tkn = new Token();

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    const authContractId = new MockVM.MockAuthority(
      authority.authorization_type.contract_call,
      CONTRACT_ID,
      true
    );

    // set contract_call authority for MOCK_ACCT1 to true so that we can transfer tokens
    const authMockAcct1 = new MockVM.MockAuthority(
      authority.authorization_type.contract_call,
      MOCK_ACCT1,
      true
    );
    MockVM.setAuthorities([authContractId, authMockAcct1]);

    // mint tokens
    const mintArgs = new token.mint_arguments(MOCK_ACCT1, 123);
    tkn.mint(mintArgs);

    // save the MockVM state because the transfer is going to revert the transaction
    MockVM.commitTransaction();

    expect(() => {
      // try to transfer tokens
      const tkn = new Token();
      const transferArgs = new token.transfer_arguments(
        MOCK_ACCT1,
        MOCK_ACCT1,
        10
      );
      tkn.transfer(transferArgs);
    }).toThrow();

    expect(MockVM.getErrorMessage()).toStrictEqual("Cannot transfer to self");

    // check balances
    let balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    let balanceRes = tkn.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(123);
  });

  it("should not transfer if insufficient balance", () => {
    const tkn = new Token();

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    const authContractId = new MockVM.MockAuthority(
      authority.authorization_type.contract_call,
      CONTRACT_ID,
      true
    );

    // set contract_call authority for MOCK_ACCT1 to true so that we can transfer tokens
    const authMockAcct1 = new MockVM.MockAuthority(
      authority.authorization_type.contract_call,
      MOCK_ACCT1,
      true
    );
    MockVM.setAuthorities([authContractId, authMockAcct1]);

    // mint tokens
    const mintArgs = new token.mint_arguments(MOCK_ACCT1, 123);
    tkn.mint(mintArgs);

    // save the MockVM state because the transfer is going to revert the transaction
    MockVM.commitTransaction();

    expect(() => {
      // try to transfer tokens
      const tkn = new Token();
      const transferArgs = new token.transfer_arguments(
        MOCK_ACCT1,
        MOCK_ACCT2,
        456
      );
      tkn.transfer(transferArgs);
    }).toThrow();

    expect(MockVM.getErrorMessage()).toStrictEqual(
      "'from' has insufficient balance"
    );

    // check balances
    let balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    let balanceRes = tkn.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(123);

    balanceArgs = new token.balance_of_arguments(MOCK_ACCT2);
    balanceRes = tkn.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(0);
  });
});

```

Build and debug the project using the following command:

```sh
yarn build:debug
```

Run unit tests to ensure your token is functioning as expected:

```sh
yarn test
```

A successful test should return 100% pass.

```{ .txt .no-copy }
yarn run v1.22.19
warning ../../../../../package.json: No license field
$ koinos-sdk-as-cli run-tests
Running tests...
yarn asp --verbose --config as-pect.config.js
warning ../../../../../package.json: No license field
$ /Users/ron/devstuff/projects/tmp/token-tutorial/token/node_modules/.bin/asp --verbose --config as-pect.config.js
       ___   _____                       __
      /   | / ___/      ____  ___  _____/ /_
     / /| | \__ \______/ __ \/ _ \/ ___/ __/
    / ___ |___/ /_____/ /_/ /  __/ /__/ /_
   /_/  |_/____/     / .___/\___/\___/\__/
                    /_/

⚡AS-pect⚡ Test suite runner [6.2.4]

[Log] Loading asc compiler
Assemblyscript Folder:assemblyscript
[Log] Compiler loaded in 177.503ms.
[Log] Using configuration /Users/ron/devstuff/projects/tmp/token-tutorial/token/as-pect.config.js
[Log] Using VerboseReporter
[Log] Including files: assembly/__tests__/**/*.spec.ts
[Log] Running tests that match: (:?)
[Log] Running groups that match: (:?)
[Log] Effective command line args:
  [TestFile.ts] node_modules/@as-pect/assembly/assembly/index.ts --runtime incremental --debug --binaryFile output.wasm --explicitStart --use ASC_RTRACE=1 --exportTable --importMemory --transform /Users/ron/devstuff/projects/tmp/token-tutorial/token/node_modules/@as-covers/transform/lib/index.js,/Users/ron/devstuff/projects/tmp/token-tutorial/token/node_modules/@as-pect/core/lib/transform/index.js --lib node_modules/@as-covers/assembly/index.ts

[Describe]: token

 [Success]: ✔ should get the name RTrace: +26
 [Success]: ✔ should get the symbol RTrace: +26
 [Success]: ✔ should get the decimals RTrace: +22
 [Success]: ✔ should get the max supply RTrace: +22
[Event] koinos.contracts.token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Event] koinos.contracts.token.burn_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EAo=
[Contract Exit] 'from' has insufficient balance
[Contract Exit] 'from' has not authorized transfer
 [Success]: ✔ should/not burn tokens RTrace: +656
[Event] koinos.contracts.token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
 [Success]: ✔ should mint tokens RTrace: +281
[Contract Exit] account '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe' authorization failed
 [Success]: ✔ should not mint tokens if not contract account RTrace: +207
[Event] koinos.contracts.token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6EHs=
[Contract Exit] Mint would overflow supply
 [Success]: ✔ should not mint tokens if new total supply overflows RTrace: +338
[Event] koinos.contracts.token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6EHs=
[Contract Exit] Mint would overflow max supply
 [Success]: ✔ should not mint tokens if new total supply overflows max supply RTrace: +338
[Event] koinos.contracts.token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Event] koinos.contracts.token.transfer_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6GAo=
 [Success]: ✔ should transfer tokens RTrace: +391
[Event] koinos.contracts.token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Contract Exit] 'from' has not authorized transfer
 [Success]: ✔ should not transfer tokens without the proper authorizations RTrace: +295
[Event] koinos.contracts.token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Contract Exit] Cannot transfer to self
 [Success]: ✔ should not transfer tokens to self RTrace: +234
[Event] koinos.contracts.token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Contract Exit] 'from' has insufficient balance
 [Success]: ✔ should not transfer if insufficient balance RTrace: +307

    [File]: assembly/__tests__/Token.spec.ts
  [Groups]: 2 pass, 2 total
  [Result]: ✔ PASS
[Snapshot]: 0 total, 0 added, 0 removed, 0 different
 [Summary]: 13 pass,  0 fail, 13 total
    [Time]: 139.55ms

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  [Result]: ✔ PASS
   [Files]: 1 total
  [Groups]: 2 count, 2 pass
   [Tests]: 13 pass, 0 fail, 13 total
    [Time]: 5130.905ms
┌───────────────────┬───────┬───────┬──────┬──────┬───────────┐
│ File              │ Total │ Block │ Func │ Expr │ Uncovered │
├───────────────────┼───────┼───────┼──────┼──────┼───────────┤
│ assembly/Token.ts │ 100%  │ 100%  │ 100% │ 100% │           │
├───────────────────┼───────┼───────┼──────┼──────┼───────────┤
│ total             │ 100%  │ 100%  │ 100% │ 100% │           │
└───────────────────┴───────┴───────┴──────┴──────┴───────────┘

```

---
## Customizing the token
Let's customize the specifics of our token project by modifying `assembly/Token.ts`. Define the following:

- `_name`: The name of your token

- `_symbol`: The symbol for your token

- `_decimals`: The decimal places for your token


```ts linenums="1" title="assembly/Token.ts"
- _name: string = "My Token Name";
- _symbol: string = "MTN";
- _decimals: u32 = 8;
```

As an example, we changed the `[token name]` variable to `My Token Name` and the `symbol` variable to `MTN`.


After making your changes, update the token name and symbol in the unit test file located at `assembly/__tests__/Token.spec.ts`.
We will need to change the test for the `name` and `symbol` functions to reflect your token name and symbol.

```ts linenums="25" title="assembly/__tests__/Token.spec.ts"
  it("should get the name", () => {
    const tkn = new Token();

    const args = new token.name_arguments();
    const res = tkn.name(args);

    expect(res.value).toBe("[token name]");
  });
```
On line 31, replace `[token name]` with the same token name that was entered in the `assembly/Token.ts`

```ts linenums="34" title="assembly/__tests__/Token.spec.ts"
  it("should get the symbol", () => {
    const tkn = new Token();

    const args = new token.symbol_arguments();
    const res = tkn.symbol(args);

    expect(res.value).toBe("[token symbol]");
  });
```
On line 40, replace `[token symbol]` with the same symbol that was entered in the `assembly/Token.ts`

---
## Compiling the contract
Once you've made all the necessary modifications and your tests are passing, you're ready to build the release version of your contract. Let's run the build script for release.

```sh
yarn build:release
```

```{ .txt .no-copy }
Generating ABI file...
 yarn protoc --plugin=protoc-gen-abi=./node_modules/.bin/koinos-abi-proto-gen --abi_out=abi/ assembly/proto/token.proto
yarn run v1.22.19
warning ../../../../../package.json: No license field
$ /Users/ron/devstuff/projects/tmp/token-tutorial/token/node_modules/.bin/protoc --plugin=protoc-gen-abi=./node_modules/.bin/koinos-abi-proto-gen --abi_out=abi/ assembly/proto/token.proto
installing estraverse@^5.1.0
Done in 2.26s.
Generating proto files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/*.proto
yarn run v1.22.19
warning ../../../../../package.json: No license field
$ /Users/ron/devstuff/projects/tmp/token-tutorial/token/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/token.proto
Done in 0.46s.
Generating boilerplate.ts and index.ts files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/token.proto
yarn run v1.22.19
warning ../../../../../package.json: No license field
$ /Users/ron/devstuff/projects/tmp/token-tutorial/token/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/token.proto
Done in 0.38s.
Compiling index.ts...
node ./node_modules/assemblyscript/bin/asc assembly/index.ts --target release --use abort= --use BUILD_FOR_TESTING=0 --disable sign-extension --config asconfig.json
```

Let's run our test one more time to make sure we don't get errors.

```sh
yarn test
```

If all the tests are green, we are ready to locate the `.wasm` and `.abi` files:

- `.wasm` file: `./build/release/contract.wasm`
- `.abi` file: `./abi/token.abi`

With these files, we can upload our contract to the blockchain by following the [Deploying a contract](../deploy-contract.md) documentation.

## Minting the token

Now that our contract is deployed to the testnet let's register our contract by issuing the `register` command `register <name:contract-name> <address:address> [abi-filename:file]`. Note that we are registering the address that we uploaded to (see above). 

```
register test 163m4hKj1QHLCyHgnyNPw8TZU5ov25QGQX token.abi
```

We will get this response:
```
Contract 'test' at address 163m4hKj1QHLCyHgnyNPw8TZU5ov25QGQX registered
```

We will now have new commands available to us to interact with our contract.

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

We can check the [block explorer](https://harbinger.koinosblocks.com/) and see that we now have the newly minted tokens in our wallet. 
