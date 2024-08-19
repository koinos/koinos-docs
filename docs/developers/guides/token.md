# Token
Welcome to our guide on launching a token using the Koinos Contract Standard ([KCS-4](https://github.com/koinos/koinos-contract-standards/blob/master/KCSs/kcs-4.md)) for tokens and the AssemblyScript SDK for Koinos. In this tutorial, we'll walk you through the process of creating and deploying your own token on the Koinos blockchain. Whether you're a seasoned developer or new to blockchain development, this step-by-step guide will provide you with the knowledge and tools necessary to bring your token project to life. Let's dive in and explore the exciting world of token creation on Koinos!

Before starting, ensure that you have already set up your Koinos AssemblyScript SDK environment by following [this guide](../as-sdk.md).

!!! note
    You should understand the requirements of your token before adhering to any particular standard. Visit the [Koinos Contract Standards repository](https://github.com/koinos/koinos-contract-standards) for more information.

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

message balance_object {
  uint64 value = 1;
}

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

// @description Checks the balance at an address
// @read-only true
message balance_of_arguments {
   bytes owner = 1 [(koinos.btype) = ADDRESS];
}

message balance_of_result {
   uint64 value = 1 [jstype = JS_STRING];
}

// @description Returns the name, symbol, and decimals of the token
// @read-only true
message get_info_arguments {}

message get_info_result {
   string name = 1;
   string symbol = 2;
   uint32 decimals = 3;
}

// @description Returns the allowance defined for a specific owner and account
// @read-only true
message allowance_arguments {
   bytes owner = 1 [(koinos.btype) = ADDRESS];
   bytes spender = 2 [(koinos.btype) = ADDRESS];
}

message allowance_result {
   uint64 value = 1 [jstype = JS_STRING];
}

message spender_value {
   bytes spender = 1 [(koinos.btype) = ADDRESS];
   uint64 value = 2 [jstype = JS_STRING];
}

// @description Returns a list of allowances for a given owner
// @read-only true
message get_allowances_arguments {
   bytes owner = 1 [(koinos.btype) = ADDRESS];
   bytes start = 2 [(koinos.btype) = ADDRESS];
   int32 limit = 3;
   bool descending = 4;
}

message get_allowances_result {
   bytes owner = 1 [(koinos.btype) = ADDRESS];
   repeated spender_value allowances = 2;
}

// @description Transfers the token
// @read-only false
// @result transfer_result
message transfer_arguments {
   bytes from = 1 [(koinos.btype) = ADDRESS];
   bytes to = 2 [(koinos.btype) = ADDRESS];
   uint64 value = 3 [jstype = JS_STRING];
   string memo = 4;
}

message transfer_result {}

// @description Mints the token
// @read-only false
// @result mint_result
message mint_arguments {
   bytes to = 1 [(koinos.btype) = ADDRESS];
   uint64 value = 2 [jstype = JS_STRING];
}

message mint_result {}

// @description Burns the token
// @read-only false
// @result burn_result
message burn_arguments {
   bytes from = 1 [(koinos.btype) = ADDRESS];
   uint64 value = 2 [jstype = JS_STRING];
}

message burn_result {}

// @description Adds an allownance for a given owner and account pairing
// @read-only false
// @result approve_result
message approve_arguments {
   bytes owner = 1 [(koinos.btype) = ADDRESS];
   bytes spender = 2 [(koinos.btype) = ADDRESS];
   uint64 value = 3 [jstype = JS_STRING];
}

message approve_result {}

message burn_event {
   bytes from = 1 [(koinos.btype) = ADDRESS];
   uint64 value = 2 [jstype = JS_STRING];
}

message mint_event {
   bytes to = 1 [(koinos.btype) = ADDRESS];
   uint64 value = 2 [jstype = JS_STRING];
}

message transfer_event {
   bytes from = 1 [(koinos.btype) = ADDRESS];
   bytes to = 2 [(koinos.btype) = ADDRESS];
   uint64 value = 3 [jstype = JS_STRING];
   string memo = 4;
}

message approve_event {
   bytes owner = 1 [(koinos.btype) = ADDRESS];
   bytes spender = 2 [(koinos.btype) = ADDRESS];
   uint64 value = 3 [jstype = JS_STRING];
}


```
Now that we have our Protobuf definition, let's generate the derived AssemblyScript code.
```sh
koinos-sdk-as-cli generate-contract-proto
```

```{ .txt .no-copy }
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
import { Arrays, authority, chain, error, Protobuf, Storage, System } from "@koinos/sdk-as";
import { token } from "./proto/token";

const SUPPLY_SPACE_ID = 0;
const BALANCES_SPACE_ID = 1;
const ALLOWANCES_SPACE_ID = 2;

export class Token {
  _name: string = "[token name]";
  _symbol: string = "[token symbol]";
  _decimals: u32 = 8;

  supply: Storage.Obj< token.balance_object > = new Storage.Obj(
    System.getContractId(),
    SUPPLY_SPACE_ID,
    token.balance_object.decode,
    token.balance_object.encode,
    () => new token.balance_object(),
    true
  );

  balances: Storage.Map< Uint8Array, token.balance_object > = new Storage.Map(
    System.getContractId(),
    BALANCES_SPACE_ID,
    token.balance_object.decode,
    token.balance_object.encode,
    () => new token.balance_object(),
    true
  );

  allowances: Storage.Map< Uint8Array, token.balance_object > = new Storage.Map(
    System.getContractId(),
    ALLOWANCES_SPACE_ID,
    token.balance_object.decode,
    token.balance_object.encode,
    () => new token.balance_object(),
    true
  );

  name(args: token.name_arguments): token.name_result {
    return new token.name_result(this._name);
  }

  symbol(args: token.symbol_arguments): token.symbol_result {
    return new token.symbol_result(this._symbol);
  }

  decimals(args: token.decimals_arguments): token.decimals_result {
    return new token.decimals_result(this._decimals);
  }

  get_info(args: token.get_info_arguments): token.get_info_result {
    return new token.get_info_result(this._name, this._symbol, this._decimals);
  }

  total_supply(args: token.total_supply_arguments): token.total_supply_result {
    return new token.total_supply_result(this.supply.get()!.value);
  }

  balance_of(args: token.balance_of_arguments): token.balance_of_result {
    return new token.balance_of_result(this.balances.get(args.owner!)!.value);
  }

  allowance(args: token.allowance_arguments): token.allowance_result {
    System.require(args.owner != null, "account 'owner' cannot be null");
    System.require(args.spender != null, "account 'spender' cannot be null");

    const key = new Uint8Array(50);
    key.set(args.owner!, 0);
    key.set(args.spender!, 25);

    return new token.allowance_result(this.allowances.get(key)!.value);
  }

  get_allowances(args: token.get_allowances_arguments): token.get_allowances_result {
    System.require(args.owner != null, "account 'owner' cannot be null");

    let key = new Uint8Array(50);
    key.set(args.owner!, 0);
    key.set(args.start ? args.start! : new Uint8Array(0), 25);

    let result = new token.get_allowances_result(args.owner, []);

    for (let i = 0; i < args.limit; i++) {
      const nextAllowance = args.descending
        ? this.allowances.getPrev(key)
        : this.allowances.getNext(key);

      if (!nextAllowance) {
        break;
      }

      if (!Arrays.equal(args.owner, nextAllowance.key!.slice(0, 25))) {
        break;
      }

      result.allowances.push(
        new token.spender_value(nextAllowance.key!.slice(25), nextAllowance.value.value)
      );

      key = nextAllowance.key!;
    }

    return result;
  }

  transfer(args: token.transfer_arguments): token.transfer_result {
    System.require(args.to != null, "account 'to' cannot be null");
    System.require(args.from != null, "account 'from' cannot be null");
    System.require(!Arrays.equal(args.from, args.to), 'cannot transfer to yourself');

    System.require(
      this._check_authority(args.from!, args.value),
      "account 'from' has not authorized transfer",
      error.error_code.authorization_failure
    );

    let fromBalance = this.balances.get(args.from!)!;
    System.require(fromBalance.value >= args.value, "account 'from' has insufficient balance", error.error_code.failure);

    let toBalance = this.balances.get(args.to!)!;

    fromBalance.value -= args.value;
    toBalance.value += args.value;

    this.balances.put(args.from!, fromBalance);
    this.balances.put(args.to!, toBalance);

    System.event(
      'token.transfer_event',
      Protobuf.encode(new token.transfer_event(args.from, args.to, args.value, args.memo), token.transfer_event.encode),
      [args.to!, args.from!]
    );

    return new token.transfer_result();
  }

  mint(args: token.mint_arguments): token.mint_result {
    System.require(args.to != null, "account 'to' cannot be null");
    System.require(args.value != 0, "account 'value' cannot be zero");

    System.requireAuthority(
      authority.authorization_type.contract_call,
      System.getContractId()
    );

    let supply = this.supply.get()!;
    System.require(supply.value <= u64.MAX_VALUE - args.value, 'mint would overflow supply', error.error_code.failure);

    let balance = this.balances.get(args.to!)!;

    supply.value += args.value;
    balance.value += args.value;

    this.supply.put(supply);
    this.balances.put(args.to!, balance);

    System.event(
      'token.mint_event',
      Protobuf.encode(new token.mint_event(args.to, args.value), token.mint_event.encode),
      [args.to!]
    );

    return new token.mint_result();
  }

  burn(args: token.burn_arguments): token.burn_result {
    System.require(args.from != null, "account 'from' cannot be null");

    System.require(
      this._check_authority(args.from!, args.value),
      "account 'from' has not authorized burn",
      error.error_code.authorization_failure
    );

    let fromBalance = this.balances.get(args.from!)!;
    System.require(fromBalance.value >= args.value, "account 'from' has insufficient balance", error.error_code.failure);

    let supply = this.supply.get()!;
    System.require(supply.value >= args.value, 'burn would underflow supply', error.error_code.failure);

    supply.value -= args.value;
    fromBalance.value -= args.value;

    this.supply.put(supply);
    this.balances.put(args.from!, fromBalance);

    System.event(
      'token.burn_event',
      Protobuf.encode(new token.burn_event(args.from, args.value), token.burn_event.encode),
      [args.from!]
    );

    return new token.burn_result();
  }

  approve(args: token.approve_arguments): token.approve_result {
    System.require(args.owner != null, "account 'owner' cannot be null");
    System.require(args.spender != null, "account 'spender' cannot be null");
    System.requireAuthority(authority.authorization_type.contract_call, args.owner!);

    const key = new Uint8Array(50);
    key.set(args.owner!, 0);
    key.set(args.spender!, 25);
    this.allowances.put(key, new token.balance_object(args.value));

    System.event(
      "token.approve_event",
      Protobuf.encode(new token.approve_event(args.owner, args.spender, args.value), token.approve_event.encode),
      [args.owner!, args.spender!]
    );

    return new token.approve_result();
  }

  _check_authority(account: Uint8Array, amount: u64): bool {
    const caller = System.getCaller().caller;
    if (caller && caller.length > 0) {
      let key = new Uint8Array(50);
      key.set(account, 0);
      key.set(caller, 25);
      const allowance = this.allowances.get(key)!;
      if (allowance.value >= amount) {
        allowance.value -= amount;
        this.allowances.put(key, allowance);
        return true;
      }
    }

    return System.checkAccountAuthority(account);
  }
}

```

---
## Time for tests
Let's open up `assembly/__tests__/Token.spec.ts` and write some tests.


```ts linenums="1" title="assembly/__tests__/Token.spec.ts"
import { Base58, MockVM, authority, Arrays, chain, Protobuf, System, protocol } from "@koinos/sdk-as";
import { Token } from "../Token";
import { token } from "../proto/token";

const CONTRACT_ID = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe");

const MOCK_ACCT1 = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG");
const MOCK_ACCT2 = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK");
const MOCK_ACCT3 = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqP");

const headBlock = new protocol.block(new Uint8Array(0), new protocol.block_header(new Uint8Array(0), 10));

describe("token", () => {
  beforeEach(() => {
    MockVM.reset();
    MockVM.setContractId(CONTRACT_ID);
    MockVM.setContractArguments(CONTRACT_ID); // Dummy value
    MockVM.setEntryPoint(0);
    MockVM.setCaller(new chain.caller_data(new Uint8Array(0), chain.privilege.user_mode));
    MockVM.setBlock(headBlock);
    MockVM.setContractMetadata(new chain.contract_metadata_object(new Uint8Array(0), false, false, false, false));
    MockVM.setHeadInfo(new chain.head_info(null, 0, 1));

    System.resetCache();
  });

  it("should get the name", () => {
    const tokenContract = new Token();
    const res = tokenContract.name(new token.name_arguments());
    expect(res.value).toBe("[token name]");
  });

  it("should get the symbol", () => {
    const tokenContract = new Token();
    const res = tokenContract.symbol(new token.symbol_arguments());
    expect(res.value).toBe("[token symbol]");
  });

  it("should get the decimals", () => {
    const tokenContract = new Token();
    const res = tokenContract.decimals(new token.decimals_arguments());
    expect(res.value).toBe(8);
  });

  it("should get token info", () => {
    const tokenContract = new Token();
    const res = tokenContract.get_info(new token.get_info_arguments());
    expect(res.name).toBe("[token name]");
    expect(res.symbol).toBe("[token symbol]");
    expect(res.decimals).toBe(8);
  });

  it("should/not burn tokens", () => {
    const tokenContract = new Token();
    let callerData = new chain.caller_data();
    callerData.caller = CONTRACT_ID;
    callerData.caller_privilege = chain.privilege.user_mode;
    MockVM.setCaller(callerData);

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    let auth = new MockVM.MockAuthority(authority.authorization_type.contract_call, CONTRACT_ID, true);
    MockVM.setAuthorities([auth]);

    // check total supply
    let totalSupplyRes = tokenContract.total_supply(new token.total_supply_arguments());
    expect(totalSupplyRes.value).toBe(0);

    // mint tokens
    const mintArgs = new token.mint_arguments(MOCK_ACCT1, 123);
    tokenContract.mint(mintArgs);

    totalSupplyRes = tokenContract.total_supply(new token.total_supply_arguments());
    expect(totalSupplyRes.value).toBe(123);

    let balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    let balanceRes = tokenContract.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(123);

    auth = new MockVM.MockAuthority(authority.authorization_type.contract_call, MOCK_ACCT1, true);
    MockVM.setAuthorities([auth]);

    callerData.caller = new Uint8Array(0);
    MockVM.setCaller(callerData);

    // burn tokens
    tokenContract.burn(new token.burn_arguments(MOCK_ACCT1, 10));

    // check events
    const events = MockVM.getEvents();
    expect(events.length).toBe(2);
    expect(events[0].name).toBe('token.mint_event');
    expect(events[0].impacted.length).toBe(1);
    expect(Arrays.equal(events[0].impacted[0], MOCK_ACCT1)).toBe(true);
    expect(events[1].name).toBe('token.burn_event');
    expect(events[1].impacted.length).toBe(1);
    expect(Arrays.equal(events[1].impacted[0], MOCK_ACCT1)).toBe(true);

    const burnEvent = Protobuf.decode<token.burn_event>(events[1].data, token.burn_event.decode);
    expect(Arrays.equal(burnEvent.from, MOCK_ACCT1)).toBe(true);
    expect(burnEvent.value).toBe(10);

    // check balance
    balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    balanceRes = tokenContract.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(113);

    // check total supply
    totalSupplyRes = tokenContract.total_supply(new token.total_supply_arguments());
    expect(totalSupplyRes.value).toBe(113);

    // save the MockVM state because the burn is going to revert the transaction
    MockVM.commitTransaction();

    // does not burn tokens
    expect(() => {
      const tokenContract = new Token();
      const burnArgs = new token.burn_arguments(MOCK_ACCT1, 200);
      tokenContract.burn(burnArgs);
    }).toThrow();

    // check error message
    expect(MockVM.getErrorMessage()).toBe("account 'from' has insufficient balance");

    MockVM.setAuthorities([]);

    callerData.caller_privilege = chain.privilege.user_mode;
    MockVM.setCaller(callerData);

    // save the MockVM state because the burn is going to revert the transaction
    MockVM.commitTransaction();

    expect(() => {
      // try to burn tokens
      const koinContract = new Token();
      const burnArgs = new token.burn_arguments(MOCK_ACCT1, 123);
      koinContract.burn(burnArgs);
    }).toThrow();

    // check error message
    expect(MockVM.getErrorMessage()).toBe("account 'from' has not authorized burn");

    // check balance
    balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    balanceRes = tokenContract.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(113);

    // check total supply
    totalSupplyRes = tokenContract.total_supply(new token.total_supply_arguments());
    expect(totalSupplyRes.value).toBe(113);
  });

  it("should mint tokens", () => {
    const tokenContract = new Token();

    // Contract ID as caller in user mode
    MockVM.setCaller(new chain.caller_data(CONTRACT_ID, chain.privilege.user_mode));

    // check total supply
    let totalSupplyRes = tokenContract.total_supply(new token.total_supply_arguments());
    expect(totalSupplyRes.value).toBe(0);

    // mint tokens
    const mintArgs = new token.mint_arguments(MOCK_ACCT1, 123);
    tokenContract.mint(mintArgs);

    // check events
    const events = MockVM.getEvents();
    expect(events.length).toBe(1);
    expect(events[0].name).toBe('token.mint_event');
    expect(events[0].impacted.length).toBe(1);
    expect(Arrays.equal(events[0].impacted[0], MOCK_ACCT1)).toBe(true);

    const mintEvent = Protobuf.decode<token.mint_event>(events[0].data, token.mint_event.decode);
    expect(Arrays.equal(mintEvent.to, MOCK_ACCT1)).toBe(true);
    expect(mintEvent.value).toBe(123);

    // check balance
    const balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    const balanceRes = tokenContract.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(123);

    // check total supply
    totalSupplyRes = tokenContract.total_supply(new token.total_supply_arguments());
    expect(totalSupplyRes.value).toBe(123);
  });

  it("should not mint tokens if not contract account", () => {
    const tokenContract = new Token();

    // set contract_call authority for MOCK_ACCT1 to true so that we cannot mint tokens
    const auth = new MockVM.MockAuthority(authority.authorization_type.contract_call, MOCK_ACCT1, true);
    MockVM.setAuthorities([auth]);

    // check total supply
    let totalSupplyRes = tokenContract.total_supply(new token.total_supply_arguments());
    expect(totalSupplyRes.value).toBe(0);

    // check balance
    const balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    let balanceRes = tokenContract.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(0);

    // save the MockVM state because the mint is going to revert the transaction
    MockVM.commitTransaction();

    expect(() => {
      // try to mint tokens
      const tokenContract = new Token();
      const mintArgs = new token.mint_arguments(MOCK_ACCT2, 123);
      tokenContract.mint(mintArgs);
    }).toThrow();

    // check balance
    balanceRes = tokenContract.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(0);

    // check total supply
    expect(totalSupplyRes.value).toBe(0);
  });

  it("should not mint tokens if new total supply overflows", () => {
    const tokenContract = new Token();

    // set kernel mode
    MockVM.setCaller(new chain.caller_data(new Uint8Array(0), chain.privilege.kernel_mode));

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    const auth = new MockVM.MockAuthority(authority.authorization_type.contract_call, CONTRACT_ID, true);
    MockVM.setAuthorities([auth]);

    let mintArgs = new token.mint_arguments(MOCK_ACCT2, 123);
    tokenContract.mint(mintArgs);

    // check total supply
    let totalSupplyRes = tokenContract.total_supply(new token.total_supply_arguments());
    expect(totalSupplyRes.value).toBe(123);

    // save the MockVM state because the mint is going to revert the transaction
    MockVM.commitTransaction();

    expect(() => {
      const tokenContract = new Token();
      const mintArgs = new token.mint_arguments(MOCK_ACCT2, u64.MAX_VALUE);
      tokenContract.mint(mintArgs);
    }).toThrow();

    // check total supply
    totalSupplyRes = tokenContract.total_supply(new token.total_supply_arguments());
    expect(totalSupplyRes.value).toBe(123);

    // check error message
    expect(MockVM.getErrorMessage()).toBe("mint would overflow supply");
  });

  it("should transfer tokens", () => {
    const tokenContract = new Token();

    // set kernel mode
    MockVM.setCaller(new chain.caller_data(new Uint8Array(0), chain.privilege.kernel_mode));

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    const authContractId = new MockVM.MockAuthority(authority.authorization_type.contract_call, CONTRACT_ID, true);

    // set contract_call authority for MOCK_ACCT1 to true so that we can transfer tokens
    const authMockAcct1 = new MockVM.MockAuthority(authority.authorization_type.contract_call, MOCK_ACCT1, true);
    MockVM.setAuthorities([authContractId, authMockAcct1]);

    // mint tokens
    const mintArgs = new token.mint_arguments(MOCK_ACCT1, 123);
    tokenContract.mint(mintArgs);

    // transfer tokens
    const transferArgs = new token.transfer_arguments(MOCK_ACCT1, MOCK_ACCT2, 10);
    tokenContract.transfer(transferArgs);

    // check balances
    let balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    let balanceRes = tokenContract.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(113);

    balanceArgs = new token.balance_of_arguments(MOCK_ACCT2);
    balanceRes = tokenContract.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(10);

    // check events
    const events = MockVM.getEvents();
    // 2 events, 1st one is the mint event, the second one is the transfer event
    expect(events.length).toBe(2);
    expect(events[1].name).toBe('token.transfer_event');
    expect(events[1].impacted.length).toBe(2);
    expect(Arrays.equal(events[1].impacted[0], MOCK_ACCT2)).toBe(true);
    expect(Arrays.equal(events[1].impacted[1], MOCK_ACCT1)).toBe(true);

    const transferEvent = Protobuf.decode<token.transfer_event>(events[1].data, token.transfer_event.decode);
    expect(Arrays.equal(transferEvent.from, MOCK_ACCT1)).toBe(true);
    expect(Arrays.equal(transferEvent.to, MOCK_ACCT2)).toBe(true);
    expect(transferEvent.value).toBe(10);
  });

  it("should not transfer tokens without the proper authorizations", () => {
    const tokenContract = new Token();

    // set kernel mode
    MockVM.setCaller(new chain.caller_data(new Uint8Array(0), chain.privilege.kernel_mode));

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    const authContractId = new MockVM.MockAuthority(authority.authorization_type.contract_call, CONTRACT_ID, true);
    // do not set authority for MOCK_ACCT1
    MockVM.setAuthorities([authContractId]);

    // mint tokens
    const mintArgs = new token.mint_arguments(MOCK_ACCT1, 123);
    tokenContract.mint(mintArgs);

    // save the MockVM state because the transfer is going to revert the transaction
    MockVM.commitTransaction();

    expect(() => {
      // try to transfer tokens without the proper authorizations for MOCK_ACCT1
      const tokenContract = new Token();
      const transferArgs = new token.transfer_arguments(MOCK_ACCT1, MOCK_ACCT2, 10);
      tokenContract.transfer(transferArgs);
    }).toThrow();

    // check balances
    let balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    let balanceRes = tokenContract.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(123);

    balanceArgs = new token.balance_of_arguments(MOCK_ACCT2);
    balanceRes = tokenContract.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(0);
  });

  it("should not transfer tokens to self", () => {
    const tokenContract = new Token();

    // set kernel mode
    MockVM.setCaller(new chain.caller_data(new Uint8Array(0), chain.privilege.kernel_mode));

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    const authContractId = new MockVM.MockAuthority(authority.authorization_type.contract_call, CONTRACT_ID, true);

    // set contract_call authority for MOCK_ACCT1 to true so that we can transfer tokens
    const authMockAcct1 = new MockVM.MockAuthority(authority.authorization_type.contract_call, MOCK_ACCT1, true);
    MockVM.setAuthorities([authContractId, authMockAcct1]);

    // mint tokens
    const mintArgs = new token.mint_arguments(MOCK_ACCT1, 123);
    tokenContract.mint(mintArgs);

    // save the MockVM state because the transfer is going to revert the transaction
    MockVM.commitTransaction();

    // try to transfer tokens
    expect(() => {
      const tokenContract = new Token();
      const transferArgs = new token.transfer_arguments(Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG"), MOCK_ACCT1, 10);
      tokenContract.transfer(transferArgs);
    }).toThrow();

    // check balances
    let balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    let balanceRes = tokenContract.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(123);

    // check error message
    expect(MockVM.getErrorMessage()).toBe('cannot transfer to yourself');
  });

  it("should not transfer if insufficient balance", () => {
    const tokenContract = new Token();

    // set kernel mode
    MockVM.setCaller(new chain.caller_data(new Uint8Array(0), chain.privilege.kernel_mode));

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    const authContractId = new MockVM.MockAuthority(authority.authorization_type.contract_call, CONTRACT_ID, true);

    // set contract_call authority for MOCK_ACCT1 to true so that we can transfer tokens
    const authMockAcct1 = new MockVM.MockAuthority(authority.authorization_type.contract_call, MOCK_ACCT1, true);
    MockVM.setAuthorities([authContractId, authMockAcct1]);

    // mint tokens
    const mintArgs = new token.mint_arguments(MOCK_ACCT1, 123);
    tokenContract.mint(mintArgs);

    // save the MockVM state because the transfer is going to revert the transaction
    MockVM.commitTransaction();

    // try to transfer tokens
    expect(() => {
      const tokenContract = new Token();
      const transferArgs = new token.transfer_arguments(MOCK_ACCT1, MOCK_ACCT2, 456);
      tokenContract.transfer(transferArgs);
    }).toThrow();

    // check balances
    let balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    let balanceRes = tokenContract.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(123);

    // check error message
    expect(MockVM.getErrorMessage()).toBe("account 'from' has insufficient balance");
  });

  it("should transfer tokens without authority", () => {
    const tokenContract = new Token();

    // set kernel mode
    MockVM.setCaller(new chain.caller_data(new Uint8Array(0), chain.privilege.kernel_mode));

    // set contract_call authority for CONTRACT_ID to true so that we can mint tokens
    const authContractId = new MockVM.MockAuthority(authority.authorization_type.contract_call, CONTRACT_ID, true);

    MockVM.setAuthorities([authContractId]);

    // mint tokens
    const mintArgs = new token.mint_arguments(MOCK_ACCT1, 123);
    tokenContract.mint(mintArgs);

    // set caller with MOCK_ACCT1 to allow transfer if the caller is the same from
    MockVM.setCaller(new chain.caller_data(MOCK_ACCT1, chain.privilege.kernel_mode));

    // transfer tokens
    const transferArgs = new token.transfer_arguments(MOCK_ACCT1, MOCK_ACCT2, 10);
    tokenContract.transfer(transferArgs);

    // check balances
    let balanceArgs = new token.balance_of_arguments(MOCK_ACCT1);
    let balanceRes = tokenContract.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(113);

    balanceArgs = new token.balance_of_arguments(MOCK_ACCT2);
    balanceRes = tokenContract.balance_of(balanceArgs);
    expect(balanceRes.value).toBe(10);

    // check events
    const events = MockVM.getEvents();
    // 2 events, 1st one is the mint event, the second one is the transfer event
    expect(events.length).toBe(2);
    expect(events[1].name).toBe('token.transfer_event');
    expect(events[1].impacted.length).toBe(2);
    expect(Arrays.equal(events[1].impacted[0], MOCK_ACCT2)).toBe(true);
    expect(Arrays.equal(events[1].impacted[1], MOCK_ACCT1)).toBe(true);

    const transferEvent = Protobuf.decode<token.transfer_event>(events[1].data, token.transfer_event.decode);
    expect(Arrays.equal(transferEvent.from, MOCK_ACCT1)).toBe(true);
    expect(Arrays.equal(transferEvent.to, MOCK_ACCT2)).toBe(true);
    expect(transferEvent.value).toBe(10);
  });

  it("should approve", () => {
    const tokenContract = new Token();

    expect(tokenContract.allowance(new token.allowance_arguments(MOCK_ACCT1, MOCK_ACCT2)).value).toBe(0);

    const mockAcc1Auth = new MockVM.MockAuthority(authority.authorization_type.contract_call, MOCK_ACCT1, true);
    MockVM.setAuthorities([mockAcc1Auth]);
    tokenContract.approve(new token.approve_arguments(MOCK_ACCT1, MOCK_ACCT2, 10));

    expect(tokenContract.allowance(new token.allowance_arguments(MOCK_ACCT1, MOCK_ACCT2)).value).toBe(10);

    MockVM.setAuthorities([mockAcc1Auth]);
    tokenContract.approve(new token.approve_arguments(MOCK_ACCT1, MOCK_ACCT3, 20));

    expect(tokenContract.allowance(new token.allowance_arguments(MOCK_ACCT1, MOCK_ACCT3)).value).toBe(20);

    MockVM.setAuthorities([new MockVM.MockAuthority(authority.authorization_type.contract_call, MOCK_ACCT2, true)]);
    tokenContract.approve(new token.approve_arguments(MOCK_ACCT2, MOCK_ACCT3, 30));

    expect(tokenContract.allowance(new token.allowance_arguments(MOCK_ACCT2, MOCK_ACCT3)).value).toBe(30);

    // check events
    const events = MockVM.getEvents();
    expect(events.length).toBe(3);
    expect(events[0].name).toBe('token.approve_event');
    expect(events[0].impacted.length).toBe(2);
    expect(Arrays.equal(events[0].impacted[0], MOCK_ACCT1)).toBe(true);
    expect(Arrays.equal(events[0].impacted[1], MOCK_ACCT2)).toBe(true);

    expect(events[1].name).toBe('token.approve_event');
    expect(events[1].impacted.length).toBe(2);
    expect(Arrays.equal(events[1].impacted[0], MOCK_ACCT1)).toBe(true);
    expect(Arrays.equal(events[1].impacted[1], MOCK_ACCT3)).toBe(true);

    expect(events[2].name).toBe('token.approve_event');
    expect(events[2].impacted.length).toBe(2);
    expect(Arrays.equal(events[2].impacted[0], MOCK_ACCT2)).toBe(true);
    expect(Arrays.equal(events[2].impacted[1], MOCK_ACCT3)).toBe(true);

    // Tests basic allowances return
    let allowances = tokenContract.get_allowances(new token.get_allowances_arguments(MOCK_ACCT1, new Uint8Array(0), 10));
    expect(Arrays.equal(allowances.owner, MOCK_ACCT1)).toBe(true);
    expect(allowances.allowances.length).toBe(2);
    expect(Arrays.equal(allowances.allowances[0].spender, MOCK_ACCT2)).toBe(true);
    expect(allowances.allowances[0].value).toBe(10);
    expect(Arrays.equal(allowances.allowances[1].spender, MOCK_ACCT3)).toBe(true);
    expect(allowances.allowances[1].value).toBe(20);

    // Tests allowances descending
    allowances = tokenContract.get_allowances(new token.get_allowances_arguments(MOCK_ACCT1, MOCK_ACCT3, 10, true));
    expect(Arrays.equal(allowances.owner, MOCK_ACCT1)).toBe(true);
    expect(allowances.allowances.length).toBe(1);
    expect(Arrays.equal(allowances.allowances[0].spender, MOCK_ACCT2)).toBe(true);
    expect(allowances.allowances[0].value).toBe(10);

    // Tests allowances limit
    allowances = tokenContract.get_allowances(new token.get_allowances_arguments(MOCK_ACCT1, new Uint8Array(0), 1));
    expect(Arrays.equal(allowances.owner, MOCK_ACCT1)).toBe(true);
    expect(allowances.allowances.length).toBe(1);
    expect(Arrays.equal(allowances.allowances[0].spender, MOCK_ACCT2)).toBe(true);
    expect(allowances.allowances[0].value).toBe(10);

    // Tests allowances pagination
    allowances = tokenContract.get_allowances(new token.get_allowances_arguments(MOCK_ACCT1, MOCK_ACCT2, 10));
    expect(Arrays.equal(allowances.owner, MOCK_ACCT1)).toBe(true);
    expect(allowances.allowances.length).toBe(1);
    expect(Arrays.equal(allowances.allowances[0].spender, MOCK_ACCT3)).toBe(true);
    expect(allowances.allowances[0].value).toBe(20);

    // Tests another owner's allowances
    allowances = tokenContract.get_allowances(new token.get_allowances_arguments(MOCK_ACCT2, new Uint8Array(0), 10));
    expect(Arrays.equal(allowances.owner, MOCK_ACCT2)).toBe(true);
    expect(allowances.allowances.length).toBe(1);
    expect(Arrays.equal(allowances.allowances[0].spender, MOCK_ACCT3)).toBe(true);
    expect(allowances.allowances[0].value).toBe(30);
  });

  it("should require an approval", () => {
    const tokenContract = new Token();

    MockVM.setCaller(new chain.caller_data(CONTRACT_ID, chain.privilege.user_mode));
    tokenContract.mint(new token.mint_arguments(MOCK_ACCT1, 100));

    MockVM.setCaller(new chain.caller_data(MOCK_ACCT2, chain.privilege.user_mode));

    // should not transfer because allowance does not exist
    expect(() => {
      const tokenContract = new Token();
      tokenContract.transfer(new token.transfer_arguments(MOCK_ACCT1, MOCK_ACCT2, 10));
    }).toThrow();

    expect(MockVM.getErrorMessage()).toBe("account 'from' has not authorized transfer");

    // create allowance for 20 tokens
    MockVM.setCaller(new chain.caller_data(new Uint8Array(0), chain.privilege.kernel_mode));
    MockVM.setAuthorities([new MockVM.MockAuthority(authority.authorization_type.contract_call, MOCK_ACCT1, true)]);
    tokenContract.approve(new token.approve_arguments(MOCK_ACCT1, MOCK_ACCT2, 20));

    MockVM.setCaller(new chain.caller_data(MOCK_ACCT2, chain.privilege.user_mode));

    // should not transfer because allowance is too small
    expect(() => {
      const tokenContract = new Token();
      tokenContract.transfer(new token.transfer_arguments(MOCK_ACCT1, MOCK_ACCT2, 25));
    }).toThrow();

    // should transfer partial amount of allowance
    tokenContract.transfer(new token.transfer_arguments(MOCK_ACCT1, MOCK_ACCT2, 10));
    expect(tokenContract.balance_of(new token.balance_of_arguments(MOCK_ACCT1)).value).toBe(90);
    expect(tokenContract.balance_of(new token.balance_of_arguments(MOCK_ACCT2)).value).toBe(10);
    expect(tokenContract.allowance(new token.allowance_arguments(MOCK_ACCT1, MOCK_ACCT2)).value).toBe(10);
  });
});

```

Run the build debug command

```sh
koinos-sdk-as-cli build debug 0
```

``` { .text .no-copy }
Compiling index.ts...
node ./node_modules/assemblyscript/bin/asc assembly/index.ts --target debug --use abort= --use BUILD_FOR_TESTING=0 --disable sign-extension --config asconfig.json
```

And now let's run the tests

```sh
koinos-sdk-as-cli run-tests
```

``` { .text .no-copy }
Running tests...
yarn asp --verbose --config as-pect.config.js
$ /home/sgerbino/Workspace/token/node_modules/.bin/asp --verbose --config as-pect.config.js
       ___   _____                       __    
      /   | / ___/      ____  ___  _____/ /_   
     / /| | \__ \______/ __ \/ _ \/ ___/ __/   
    / ___ |___/ /_____/ /_/ /  __/ /__/ /_     
   /_/  |_/____/     / .___/\___/\___/\__/     
                    /_/                        

⚡AS-pect⚡ Test suite runner [8.1.0]
Using config: /home/sgerbino/Workspace/token/as-pect.config.js
ASC Version: 0.27.29
[Log]Using code coverage: assembly/*.ts
[Log]Using coverage: assembly/*.ts
[Describe]: token

 [Success]: ✔ should get the name
 [Success]: ✔ should get the symbol
 [Success]: ✔ should get the decimals
 [Success]: ✔ should get token info
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Event] token.burn_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EAo=
[Contract Exit] account 'from' has insufficient balance
[Contract Exit] account 'from' has not authorized burn
 [Success]: ✔ should/not burn tokens
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
 [Success]: ✔ should mint tokens
[Contract Exit] account '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe' authorization failed
 [Success]: ✔ should not mint tokens if not contract account
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6EHs=
[Contract Exit] mint would overflow supply
 [Success]: ✔ should not mint tokens if new total supply overflows
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Event] token.transfer_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6GAo=
 [Success]: ✔ should transfer tokens
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Contract Exit] account 'from' has not authorized transfer
 [Success]: ✔ should not transfer tokens without the proper authorizations
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Contract Exit] cannot transfer to yourself
 [Success]: ✔ should not transfer tokens to self
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Contract Exit] account 'from' has insufficient balance
 [Success]: ✔ should not transfer if insufficient balance
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Event] token.transfer_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6GAo=
 [Success]: ✔ should transfer tokens without authority
[Event] token.approve_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6GAo=
[Event] token.approve_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqP'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc+GBQ=
[Event] token.approve_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqP'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc+GB4=
 [Success]: ✔ should approve
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EGQ=
[Contract Exit] account 'from' has not authorized transfer
[Event] token.approve_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6GBQ=
[Contract Exit] account 'from' has not authorized transfer
[Event] token.transfer_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6GAo=
 [Success]: ✔ should require an approval

    [File]: assembly/__tests__/Token.spec.ts
  [Groups]: 2 pass, 2 total
  [Result]: ✔ PASS
[Snapshot]: 0 total, 0 added, 0 removed, 0 different
 [Summary]: 15 pass,  0 fail, 15 total
    [Time]: 419.176ms

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Coverage Report:

┌───────────────────┬───────┬───────┬──────┬───────┬───────────┐
│ File              │ Total │ Block │ Func │ Expr  │ Uncovered │
├───────────────────┼───────┼───────┼──────┼───────┼───────────┤
│ assembly/Token.ts │ 97.7% │ 100%  │ 100% │ 83.3% │ 80:39     │
├───────────────────┼───────┼───────┼──────┼───────┼───────────┤
│ total             │ 97.7% │ 100%  │ 100% │ 83.3% │           │
└───────────────────┴───────┴───────┴──────┴───────┴───────────┘

  [Summary]
    [Tests]: 15 / 15
   [Groups]: 2 / 2
[Snapshots]: 0 / 0, Added 0, Changed 0
   [Result]: ✔ Pass!

Done in 2.12s.
```

---
## Customizing the token
Let's customize the specifics of our token project by modifying `./assembly/Token.ts`. Define the following:

- `_name`: The name of your token

- `_symbol`: The symbol for your token

- `_decimals`: The decimal places for your token

Let's change the default values to the name and symbol of our token.

```ts linenums="9" title="assembly/Token.ts" hl_lines="9-11"
import { Arrays, authority, chain, error, Protobuf, Storage, System } from "@koinos/sdk-as";
import { token } from "./proto/token";

const SUPPLY_SPACE_ID = 0;
const BALANCES_SPACE_ID = 1;
const ALLOWANCES_SPACE_ID = 2;

export class Token {
  _name: string = "My Token Name";
  _symbol: string = "MTN";
  _decimals: u32 = 8;


```

In the highlighted lines we changed the `[token name]` variable to `My Token Name` and the `symbol` variable to `MTN`.

Keep in mind that since this token name and symbol have already been minted to the testnet you should replace your own name and symbol with the ones used in this guide.

Let's run the tests again and see what happens.

```sh
koinos-sdk-as-cli run-tests
```


``` { .text .no-copy }
Running tests...
yarn asp --verbose --config as-pect.config.js
$ /home/sgerbino/Workspace/token/node_modules/.bin/asp --verbose --config as-pect.config.js
       ___   _____                       __    
      /   | / ___/      ____  ___  _____/ /_   
     / /| | \__ \______/ __ \/ _ \/ ___/ __/   
    / ___ |___/ /_____/ /_/ /  __/ /__/ /_     
   /_/  |_/____/     / .___/\___/\___/\__/     
                    /_/                        

⚡AS-pect⚡ Test suite runner [8.1.0]
Using config: /home/sgerbino/Workspace/token/as-pect.config.js
ASC Version: 0.27.29
[Log]Using code coverage: assembly/*.ts
[Log]Using coverage: assembly/*.ts
[Describe]: token

    [Fail]: ✖ should get the name
  [Actual]: "My Token Name"
[Expected]: "[token name]"
   [Stack]: RuntimeError: unreachable
            at node_modules/@as-pect/assembly/assembly/internal/assert/assert (wasm://wasm/0012d0ca:wasm-function[319]:0x2ac3)
            at node_modules/@as-pect/assembly/assembly/internal/Expectation/Expectation<~lib/string/String|null>#toBe (wasm://wasm/0012d0ca:wasm-function[938]:0x120a3)
            at start:assembly/__tests__/Token.spec~anonymous|0~anonymous|1 (wasm://wasm/0012d0ca:wasm-function[939]:0x12156)
            at node_modules/@as-pect/assembly/assembly/internal/call/__call (wasm://wasm/0012d0ca:wasm-function[561]:0x37e5)
            at export:node_modules/@as-pect/assembly/assembly/internal/call/__call (wasm://wasm/0012d0ca:wasm-function[1267]:0x24d50)
    [Fail]: ✖ should get the symbol
  [Actual]: "MTN"
[Expected]: "[token symbol]"
   [Stack]: RuntimeError: unreachable
            at node_modules/@as-pect/assembly/assembly/internal/assert/assert (wasm://wasm/0012d0ca:wasm-function[319]:0x2ac3)
            at node_modules/@as-pect/assembly/assembly/internal/Expectation/Expectation<~lib/string/String|null>#toBe (wasm://wasm/0012d0ca:wasm-function[938]:0x120a3)
            at start:assembly/__tests__/Token.spec~anonymous|0~anonymous|2 (wasm://wasm/0012d0ca:wasm-function[942]:0x122e3)
            at node_modules/@as-pect/assembly/assembly/internal/call/__call (wasm://wasm/0012d0ca:wasm-function[561]:0x37e5)
            at export:node_modules/@as-pect/assembly/assembly/internal/call/__call (wasm://wasm/0012d0ca:wasm-function[1267]:0x24d50)
 [Success]: ✔ should get the decimals
    [Fail]: ✖ should get token info
  [Actual]: "My Token Name"
[Expected]: "[token name]"
   [Stack]: RuntimeError: unreachable
            at node_modules/@as-pect/assembly/assembly/internal/assert/assert (wasm://wasm/0012d0ca:wasm-function[319]:0x2ac3)
            at node_modules/@as-pect/assembly/assembly/internal/Expectation/Expectation<~lib/string/String|null>#toBe (wasm://wasm/0012d0ca:wasm-function[938]:0x120a3)
            at start:assembly/__tests__/Token.spec~anonymous|0~anonymous|4 (wasm://wasm/0012d0ca:wasm-function[951]:0x127e5)
            at node_modules/@as-pect/assembly/assembly/internal/call/__call (wasm://wasm/0012d0ca:wasm-function[561]:0x37e5)
            at export:node_modules/@as-pect/assembly/assembly/internal/call/__call (wasm://wasm/0012d0ca:wasm-function[1267]:0x24d50)
```

We now get these errors because we haven't updated the tests to reflect the changes we made to the token. Let's update the tests to reflect the changes we made to the token.

In the following code snippets the highlighted lines were added.

```ts linenums="25" title="assembly/__tests__/Token.spec.ts" hl_lines="4 10 22-23"
  it("should get the name", () => {
    const tokenContract = new Token();
    const res = tokenContract.name(new token.name_arguments());
    expect(res.value).toBe("My Token Name");
  });

  it("should get the symbol", () => {
    const tokenContract = new Token();
    const res = tokenContract.symbol(new token.symbol_arguments());
    expect(res.value).toBe("MTN");
  });

  it("should get the decimals", () => {
    const tokenContract = new Token();
    const res = tokenContract.decimals(new token.decimals_arguments());
    expect(res.value).toBe(8);
  });

  it("should get token info", () => {
    const tokenContract = new Token();
    const res = tokenContract.get_info(new token.get_info_arguments());
    expect(res.name).toBe("My Token Name");
    expect(res.symbol).toBe("MTN");
    expect(res.decimals).toBe(8);
  });

```

If we run the tests again we should now have an all green 100% pass.

```sh
koinos-sdk-as-cli run-tests
```


``` { .text .no-copy }
Running tests...
yarn asp --verbose --config as-pect.config.js
$ /home/sgerbino/Workspace/token/node_modules/.bin/asp --verbose --config as-pect.config.js
       ___   _____                       __    
      /   | / ___/      ____  ___  _____/ /_   
     / /| | \__ \______/ __ \/ _ \/ ___/ __/   
    / ___ |___/ /_____/ /_/ /  __/ /__/ /_     
   /_/  |_/____/     / .___/\___/\___/\__/     
                    /_/                        

⚡AS-pect⚡ Test suite runner [8.1.0]
Using config: /home/sgerbino/Workspace/token/as-pect.config.js
ASC Version: 0.27.29
[Log]Using code coverage: assembly/*.ts
[Log]Using coverage: assembly/*.ts
[Describe]: token

 [Success]: ✔ should get the name
 [Success]: ✔ should get the symbol
 [Success]: ✔ should get the decimals
 [Success]: ✔ should get token info
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Event] token.burn_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EAo=
[Contract Exit] account 'from' has insufficient balance
[Contract Exit] account 'from' has not authorized burn
 [Success]: ✔ should/not burn tokens
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
 [Success]: ✔ should mint tokens
[Contract Exit] account '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe' authorization failed
 [Success]: ✔ should not mint tokens if not contract account
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6EHs=
[Contract Exit] mint would overflow supply
 [Success]: ✔ should not mint tokens if new total supply overflows
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Event] token.transfer_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6GAo=
 [Success]: ✔ should transfer tokens
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Contract Exit] account 'from' has not authorized transfer
 [Success]: ✔ should not transfer tokens without the proper authorizations
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Contract Exit] cannot transfer to yourself
 [Success]: ✔ should not transfer tokens to self
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Contract Exit] account 'from' has insufficient balance
 [Success]: ✔ should not transfer if insufficient balance
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EHs=
[Event] token.transfer_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6GAo=
 [Success]: ✔ should transfer tokens without authority
[Event] token.approve_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6GAo=
[Event] token.approve_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqP'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc+GBQ=
[Event] token.approve_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqP'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc+GB4=
 [Success]: ✔ should approve
[Event] token.mint_event / [ '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG' ] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EGQ=
[Contract Exit] account 'from' has not authorized transfer
[Event] token.approve_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6GBQ=
[Contract Exit] account 'from' has not authorized transfer
[Event] token.transfer_event / [
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK',
  '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG'
] / ChkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc3EhkAiCtotTmdMTyQZ/OEFgfmKMEtVCA8jEc6GAo=
 [Success]: ✔ should require an approval

    [File]: assembly/__tests__/Token.spec.ts
  [Groups]: 2 pass, 2 total
  [Result]: ✔ PASS
[Snapshot]: 0 total, 0 added, 0 removed, 0 different
 [Summary]: 15 pass,  0 fail, 15 total
    [Time]: 419.176ms

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Coverage Report:

┌───────────────────┬───────┬───────┬──────┬───────┬───────────┐
│ File              │ Total │ Block │ Func │ Expr  │ Uncovered │
├───────────────────┼───────┼───────┼──────┼───────┼───────────┤
│ assembly/Token.ts │ 97.7% │ 100%  │ 100% │ 83.3% │ 80:39     │
├───────────────────┼───────┼───────┼──────┼───────┼───────────┤
│ total             │ 97.7% │ 100%  │ 100% │ 83.3% │           │
└───────────────────┴───────┴───────┴──────┴───────┴───────────┘

  [Summary]
    [Tests]: 15 / 15
   [Groups]: 2 / 2
[Snapshots]: 0 / 0, Added 0, Changed 0
   [Result]: ✔ Pass!

Done in 2.12s.
```


---
## Compiling the contract
We made all the necessary modifications and our tests are passing, we are now ready to build the release version of the token contract.

Let's run the build script for release.

```sh
koinos-sdk-as-cli build-all release 0 token.proto
```

```{ .txt .no-copy }
Compiling index.ts...
node ./node_modules/assemblyscript/bin/asc assembly/index.ts --target release --use abort= --use BUILD_FOR_TESTING=0 --disable sign-extension --config asconfig.json
❯ koinos-sdk-as-cli build-all release 0 token.proto
Generating ABI file...
 yarn protoc --plugin=protoc-gen-abi=./node_modules/.bin/koinos-abi-proto-gen --abi_out=abi/ assembly/proto/token.proto
yarn run v1.22.19
warning ../../../../../package.json: No license field
$ /path/to/token/node_modules/.bin/protoc --plugin=protoc-gen-abi=./node_modules/.bin/koinos-abi-proto-gen --abi_out=abi/ assembly/proto/token.proto
installing minimist@^1.2.0
installing uglify-js@^3.7.7
installing escodegen@^1.13.0
Done in 2.25s.
Generating proto files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/*.proto
yarn run v1.22.19
warning ../../../../../package.json: No license field
$ /path/to/token/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/token.proto
Done in 0.44s.
Generating boilerplate.ts and index.ts files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/token.proto
yarn run v1.22.19
warning ../../../../../package.json: No license field
$ /path/to/token/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/token.proto
Done in 0.35s.
Compiling index.ts...
node ./node_modules/assemblyscript/bin/asc assembly/index.ts --target release --use abort= --use BUILD_FOR_TESTING=0 --disable sign-extension --config asconfig.json
```

After the build completes, locate your `.wasm` and `.abi` files:

- `.wasm` file: `./build/release/contract.wasm`
- `.abi` file: `./abi/token.abi`

With these files, we can upload our contract to the blockchain by following the [Deploying a contract](../deploy-contract.md) documentation.

## Minting the token

Now that our contract is deployed to the testnet let's register our contract so we can mint tokens by issuing the `register` command `register <name:contract-name> <address:address> [abi-filename:file]`. Note that we are registering the address that we uploaded to (see above).


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
value:  "MTN"
```

We can now issue the `mint` command to mint our tokens. Let's create a new wallet we can mint the tokens to.

```
create mint_to.wallet password
Created and opened new wallet: mint_to.wallet
Address: 14xHsbnNnHVqDXaHq99A3ZEAEzQAwd9mtt
```

We need to switch back to our `test.wallet` so we can mint the tokens.

```
test.mint 14xHsbnNnHVqDXaHq99A3ZEAEzQAwd9mtt 100000000000000
```

!!! note
    Since we are using the `register` command to mint the tokens, the decimals of the token are not taken into consideration. When we created out token contract we did not change the default 8 decimal places (see highlighted).

    ```ts linenums="13" title="token/assembly/Token.ts" hl_lines="5"
    export class Token {
      // SETTINGS BEGIN
      _name: string = "My Token Name";
      _symbol: string = "MTN";
      _decimals: u32 = 8;

      // set _maxSupply to zero if there is no max supply
      // if set to zero, the supply would still be limited by how many tokens can fit in a u64 (u64.MAX_VALUE)
      _maxSupply: u64 = 0;


    ```

    We therefore need to enter the number of tokens to mint in the smallest unit of the token. In this case, we need to enter `100000000` to mint 1 token. Later, we will use the `register_token` command which will take the decimals into account.

We should get this response:
```
Calling test.mint with arguments 'to:  "14xHsbnNnHVqDXaHq99A3ZEAEzQAwd9mtt"
value:  100000000000000
'
Transaction with ID 0x1220e558d2d1d634321ce90e452d126a4b6b89723345b4fa9f936017770c0e28bc84 containing 1 operations submitted.
Mana cost: 0.03434252 (Disk: 95, Network: 284, Compute: 514975)
```



## Transferring tokens

Let's transfer some of the tokens we just minted to a new wallet. We can use the same contract we just registered, however the CLI provides a command, `register_token` that provides a cleaner interface for interacting with tokens directly.

Open the `mint_to.wallet` and this time register the token contract using the `register_token` command.

```
register_token mtn 163m4hKj1QHLCyHgnyNPw8TZU5ov25QGQX
```

``` { .text .no-copy }
Contract 'mtn' at address 163m4hKj1QHLCyHgnyNPw8TZU5ov25QGQX registered
```

We can now issue the `mtn.transfer` command and transfer some tokens.

```
mtn.transfer 1Npov1QbcRUuw17xoWDGKEAfk2X5hJ8ueW 0.00000001
```

``` { .text .no-copy }
Transferring 0.00000001 MTN to 1Npov1QbcRUuw17xoWDGKEAfk2X5hJ8ueW
Transaction with ID 0x12202aa89a221ac7be8c4cbc42ff0d4cdf653a52f7b96a5824de826947684e882c37 containing 1 operations submitted.
Mana cost: 0.03231164 (Disk: 95, Network: 308, Compute: 456741)
```

!!! note
    When using the `register_token` command as indicated by the documentation in the [Koinos CLI: Register token](../cli.md#register-token) section, the decimals of the token are taken into consideration. As demonstrated above, we are sending 0.00000001 MTN as indicated by the 8 decimal places. If you want to use `register_token` with an offline wallet, you need to provide the precision and symbol manually.

    ```
    register_token mtn 163m4hKj1QHLCyHgnyNPw8TZU5ov25QGQX MTN 8
    ```

Congratulations, We successfully deployed our contract to the testnet, minted a million tokens and made a transfer! We can check the [block explorer](https://harbinger.koinosblocks.com/) and see that we now have the newly minted tokens in our wallet and that tokens were transferred from our minted wallet.




