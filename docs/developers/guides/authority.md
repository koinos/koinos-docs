# Authority
Welcome to the contract authority guide. In this guide, we will explore how to use Koinos smart contracts to implement custom authorization logic for a smart contract or a wallet. Understanding the authority system can help you better secure your smart contracts by defining the exact logic you need for authorized access.

Before embarking on this journey, ensure that you have already setup your Koinos AssemblyScript SDK environment by following [this guide](../as-sdk.md).

It will also help for you to be familiar with the Koinos authority system, which you can read about [here](../authority.md).

---
## Setting up the project
Let's begin by creating a boilerplate smart contract project using the Koinos AssemblyScript SDK.

```sh
koinos-sdk-as-cli create authority
```

```{ .txt .no-copy }
Generating contract at "/home/$USER/Workspace/authority" ...

Contract successfully generated!

You're all set! Run the following set of commands to verify that the generated contract is correctly setup:

  cd /home/$USER/Workspace/authority && yarn install && yarn build:debug && yarn test
```

Change your directory to the project directory and install dependencies.
```sh
cd authority
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
Done in 62.51s.
```

---
## Generating the authorize stubs
Because we are creating an authority contract we will invoke the `koinos-sdk-as-cli` in order to stub out the implementation for us. We do not need the boilerplate "Hello World" implementation in `assembly/authority/proto/authority.proto` and `assembly/Authority.ts`.

We will start by removing it from `assembly/authority/proto/authority.proto`.

```proto linenums="1" title="assembly/authority/proto/authority.proto"
syntax = "proto3";

package authority;
```

```sh
koinos-sdk-as-cli generate-contract-as --generate_authorize authority.proto
```
``` { .txt, .no-copy }
Generating boilerplate.ts and index.ts files...
GENERATE_AUTHORIZE_ENTRY_POINT=1 yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/authority.proto
yarn run v1.22.22
$ /home/$USER/Workspace/authority/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/authority.proto
@protobuf-ts/protoc installed protoc v26.1.
Done in 5.07s.
```

In the following code snippets the highlighted lines were added by the previous invocation.

```ts linenums="1" title="assembly/index.ts" hl_lines="11-20"
import { System, Protobuf, authority } from "@koinos/sdk-as";
import { Authority as ContractClass } from "./Authority";
import { authority as ProtoNamespace } from "./proto/authority";

export function main(): i32 {
  const contractArgs = System.getArguments();
  let retbuf = new Uint8Array(1024);

  const c = new ContractClass();

  switch (contractArgs.entry_point) {
    case 0x4a2dbd90: {
      const args = Protobuf.decode<authority.authorize_arguments>(
        contractArgs.args,
        authority.authorize_arguments.decode
      );
      const res = c.authorize(args);
      retbuf = Protobuf.encode(res, authority.authorize_result.encode);
      break;
    }

    default:
      System.exit(1);
      break;
  }

  System.exit(0, retbuf);
  return 0;
}

main();
```

```ts linenums="1" title="assembly/Authority.boilerplate.ts" hl_lines="5-15"
import { System, Protobuf, authority } from "@koinos/sdk-as";
import { authority } from "./proto/authority";

export class Authority {
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    // const call = args.call;
    // const type = args.type;

    // YOUR CODE HERE

    const res = new authority.authorize_result();
    res.value = true;

    return res;
  }
}

```

When we originally created this smart contract, we were given an example implementation of Hello World. We no longer need that, so let's copy the boilerplate over the original contract.

```sh
rm rm assembly/Authority.ts
mv assembly/Authority.boilerplate.ts assembly/Authority.ts
```

Now we move on to the crux of the matter, implementing our authority override!

---
## The implementation
For this guide, we will implement a 2 of 3 multi-signature wallet. The wallet will look for signatures on 3 keys and authorize the transaction if 2 of the 3 keys have signed the transaction. This is a simple example, but explains how more complex authorization schemes could be built using this system.

Open up your implementation file.

```sh
vi assembly/Authority.ts
```

To accomplish this, we will check the authority of each of our addresses. By default, this will simply check if they have signed the transaction. If they also have authority overrides, those will be called automatically on our behalf.

This example contract has certain addresses hardcoded. You can replace those addresses with addresses of your own.


```ts linenums="1" title="assembly/Authority.ts"
import { authority, Base58, System } from "@koinos/sdk-as";

export class Authority {
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    const addresses = [
      Base58.decode('1G6cEhMHaZ6aqihbu1Jr6B1zpdw5zUF2z4'),
      Base58.decode('18xkku99bjCGkhMpsjqpksthqtXH4Dm4vJ'),
      Base58.decode('1BDFBhzrrycBvS6DS6HuwRHopWA61AEXjZ')];

    const threshold = 2;
    let count = 0;

    // Count how many of the addresses signed the transaction
    for (let i = 0; i < addresses.length; i++) {
      if (System.checkAuthority(args.type, addresses[i])) {
        count++;
      }
    }

    // Authorize if count was greater than or equal to the threshold
    const res = new authority.authorize_result();
    res.value = count >= threshold;

    return res;
  }
}
```


## Building the contract
Great! It's time to build our contract.

First, we need to generate the assembly script from the proto file. While the proto file does not define any new types, the generated files still expect this file to exist. Skipping this step will cause the build to fail without further modifications.

```sh
koinos-sdk-as-cli generate-contract-proto
```

```{ .txt, .no-copy }
Generating Contract AS proto files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/*.proto
yarn run v1.22.22
$ /home/$USER/Workspace/authority/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/authority.proto
Done in 0.21s.
```

Next, we can build the actual contract.

```sh
koinos-sdk-as-cli build debug 0
```

```{ .txt .no-copy }
Compiling index.ts...
node ./node_modules/assemblyscript/bin/asc assembly/index.ts --target debug --use abort= --use BUILD_FOR_TESTING=0 --disable sign-extension --config asconfig.json
```

---
## Time for tests
We need to start by cleaning up the tests given to use with the "Hello World" example. Go ahead and delete all of the contents of the existing test at `assembly/__tests__/Authority.spec.ts`.

Now we need to test that our `authorize()` function works in all cases. Testing a 2 or 3 multisig is not hard to exhaust all cases, which is what we will do.


```sh
vi assembly/__tests__/Authority.spec.ts
```

```ts linenums="1" title="assembly/__tests__/Authority.spec.ts"
import { Authority } from '../Authority';
import { authority, Base58, MockVM } from "@koinos/sdk-as";

const CORRECT_AUTH_1 = new MockVM.MockAuthority(authority.authorization_type.contract_call, Base58.decode("1G6cEhMHaZ6aqihbu1Jr6B1zpdw5zUF2z4"), true);
const CORRECT_AUTH_2 = new MockVM.MockAuthority(authority.authorization_type.contract_call, Base58.decode("18xkku99bjCGkhMpsjqpksthqtXH4Dm4vJ"), true);
const CORRECT_AUTH_3 = new MockVM.MockAuthority(authority.authorization_type.contract_call, Base58.decode("1BDFBhzrrycBvS6DS6HuwRHopWA61AEXjZ"), true);
const INCORRECT_AUTH = new MockVM.MockAuthority(authority.authorization_type.contract_call, Base58.decode("1PNSZvkoWh85sebw8A2DAW76EFwygCiXMj"), true);

describe('contract', () => {
  beforeEach(() => {
    MockVM.reset();
  })

  it("should not authorize with one signature", () => {
    let contract = new Authority();

    MockVM.setAuthorities([CORRECT_AUTH_1]);
    expect(contract.authorize(new authority.authorize_arguments()).value).toBe(false);

    MockVM.setAuthorities([CORRECT_AUTH_2]);
    expect(contract.authorize(new authority.authorize_arguments()).value).toBe(false);

    MockVM.setAuthorities([CORRECT_AUTH_3]);
    expect(contract.authorize(new authority.authorize_arguments()).value).toBe(false);

    MockVM.setAuthorities([INCORRECT_AUTH]);
    expect(contract.authorize(new authority.authorize_arguments()).value).toBe(false);
  });

  it("should authorize with two correct signatures", () => {
    let contract = new Authority();

    MockVM.setAuthorities([CORRECT_AUTH_1, CORRECT_AUTH_2]);
    expect(contract.authorize(new authority.authorize_arguments()).value).toBe(true);

    MockVM.setAuthorities([CORRECT_AUTH_1, CORRECT_AUTH_3]);
    expect(contract.authorize(new authority.authorize_arguments()).value).toBe(true);

    MockVM.setAuthorities([CORRECT_AUTH_2, CORRECT_AUTH_3]);
    expect(contract.authorize(new authority.authorize_arguments()).value).toBe(true);
  });

  it("should not authorize with one correct and one incorrect signatures", () => {
    let contract = new Authority();

    MockVM.setAuthorities([INCORRECT_AUTH, CORRECT_AUTH_1]);
    expect(contract.authorize(new authority.authorize_arguments()).value).toBe(false);

    MockVM.setAuthorities([INCORRECT_AUTH, CORRECT_AUTH_2]);
    expect(contract.authorize(new authority.authorize_arguments()).value).toBe(false);

    MockVM.setAuthorities([INCORRECT_AUTH, CORRECT_AUTH_3]);
    expect(contract.authorize(new authority.authorize_arguments()).value).toBe(false);
  });

  it ("should authorize with three correct signatures", () => {
    let contract = new Authority();

    MockVM.setAuthorities([CORRECT_AUTH_1, CORRECT_AUTH_2, CORRECT_AUTH_3]);
    expect(contract.authorize(new authority.authorize_arguments()).value).toBe(true);
  });

  it("should authorize with two correct and one incorrect signatures", () => {
    let contract = new Authority();

    MockVM.setAuthorities([INCORRECT_AUTH, CORRECT_AUTH_1, CORRECT_AUTH_2]);
    expect(contract.authorize(new authority.authorize_arguments()).value).toBe(true);

    MockVM.setAuthorities([INCORRECT_AUTH, CORRECT_AUTH_1, CORRECT_AUTH_3]);
    expect(contract.authorize(new authority.authorize_arguments()).value).toBe(true);

    MockVM.setAuthorities([INCORRECT_AUTH, CORRECT_AUTH_2, CORRECT_AUTH_3]);
    expect(contract.authorize(new authority.authorize_arguments()).value).toBe(true);
  });

});

```

And finally, let's run our tests.

```sh
koinos-sdk-as-cli run-tests
```

```{ .txt .no-copy }
Running tests...
yarn asp --verbose --config as-pect.config.js
yarn run v1.22.22
$ /home/$USER/Workspace/authority/node_modules/.bin/asp --verbose --config as-pect.config.js
       ___   _____                       __
      /   | / ___/      ____  ___  _____/ /_
     / /| | \__ \______/ __ \/ _ \/ ___/ __/
    / ___ |___/ /_____/ /_/ /  __/ /__/ /_
   /_/  |_/____/     / .___/\___/\___/\__/
                    /_/

⚡AS-pect⚡ Test suite runner [6.2.4]

[Log] Loading asc compiler
Assemblyscript Folder:assemblyscript
[Log] Compiler loaded in 182.741ms.
[Log] Using configuration /home/$USER/Workspace/authority/as-pect.config.js
[Log] Using VerboseReporter
[Log] Including files: assembly/__tests__/**/*.spec.ts
[Log] Running tests that match: (:?)
[Log] Running groups that match: (:?)
[Log] Effective command line args:
  [TestFile.ts] node_modules/@as-pect/assembly/assembly/index.ts --runtime incremental --debug --binaryFile output.wasm --explicitStart --use ASC_RTRACE=1 --exportTable --importMemory --transform /home/$USER/Workspace/authority/node_modules/@as-covers/transform/lib/index.js,/home/$USER/Workspace/authority/node_modules/@as-pect/core/lib/transform/index.js --lib node_modules/@as-covers/assembly/index.ts

[Describe]: contract

 [Success]: ✔ should not authorize with one signature RTrace: +677
 [Success]: ✔ should authorize with two correct signatures RTrace: +511
 [Success]: ✔ should not authorize with one correct and one incorrect signatures RTrace: +511
 [Success]: ✔ should authorize with three correct signatures RTrace: +172
 [Success]: ✔ should authorize with two correct and one incorrect signatures RTrace: +514

    [File]: assembly/__tests__/Authority.spec.ts
  [Groups]: 2 pass, 2 total
  [Result]: ✔ PASS
[Snapshot]: 0 total, 0 added, 0 removed, 0 different
 [Summary]: 5 pass,  0 fail, 5 total
    [Time]: 67.959ms

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  [Result]: ✔ PASS
   [Files]: 1 total
  [Groups]: 2 count, 2 pass
   [Tests]: 5 pass, 0 fail, 5 total
    [Time]: 2506.885ms
┌───────────────────────┬───────┬───────┬──────┬──────┬───────────┐
│ File                  │ Total │ Block │ Func │ Expr │ Uncovered │
├───────────────────────┼───────┼───────┼──────┼──────┼───────────┤
│ assembly/Authority.ts │ 100%  │ 100%  │ 100% │ N/A  │           │
├───────────────────────┼───────┼───────┼──────┼──────┼───────────┤
│ total                 │ 100%  │ 100%  │ 100% │ N/A  │           │
└───────────────────────┴───────┴───────┴──────┴──────┴───────────┘

Done in 2.61s.
```

Great job! You now have a contract that implements a 2 of 3 multisig!

!!! note
    It is not enough to just implement `authorize()` in your smart contract. You must indicate that you are overriding the `authorize()` function when uploading your smart contract. For details and examples of how this works check out the [Authority: Uploading the contract](../authority.md#uploading-the-contract) section.

    For more information on uploading contracts, visit the [Deploying a contract](../deploy-contract.md).
