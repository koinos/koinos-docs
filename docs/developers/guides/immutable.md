# Immutable
Welcome to the guide on creating immutable smart contracts! In this comprehensive resource, we will delve into the concept of immutability within blockchain technology and explore the crucial steps to design and deploy smart contracts that remain tamper-proof and unchangeable once executed. Immutability is a fundamental feature of blockchain systems, ensuring that data and code deployed on the blockchain cannot be altered or manipulated after deployment. Understanding how to leverage immutability effectively is essential for building secure and reliable decentralized applications (DApps).

Before embarking on this journey, ensure that you have already setup your Koinos AssemblyScript SDK environment by following [this guide](../as-sdk.md).

---
## Setting up the project
Let's begin by creating a boilerplate smart contract project using the Koinos AssemblyScript SDK.

```sh
koinos-sdk-as-cli create immutable
```

```{ .txt .no-copy }
Generating contract at "/home/$USER/Workspace/immutable" ...

Contract successfully generated!

You're all set! Run the following set of commands to verify that the generated contract is correctly setup:

  cd /home/$USER/Workspace/immutable && yarn install && yarn build:debug && yarn test
```

Change your directory to the project directory and install dependencies.
```sh
cd immutable
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
Because we are creating an immutable contract we will invoke the `koinos-sdk-as-cli` in order to stub out the implementation for us. We can leave the boilerplate "Hello World" implementation in `assembly/immutable/proto/immutable.proto` and `assembly/Immutable.ts`.

```sh
koinos-sdk-as-cli generate-contract-as --generate_authorize immutable.proto
```
``` { .txt, .no-copy }
Generating boilerplate.ts and index.ts files...
GENERATE_AUTHORIZE_ENTRY_POINT=1 yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/immutable.proto
yarn run v1.22.22
$ /home/$USER/Workspace/immutable/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/immutable.proto
@protobuf-ts/protoc installed protoc v26.1.
Done in 5.07s.
```

In the following code snippets the highlighted lines were added by the previous invocation.

```ts linenums="1" title="assembly/index.ts" hl_lines="11-20"
import { System, Protobuf, authority } from "@koinos/sdk-as";
import { Immutable as ContractClass } from "./Immutable";
import { immutable as ProtoNamespace } from "./proto/immutable";

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

    case 0x2cf24dba: {
      const args = Protobuf.decode<ProtoNamespace.hello_arguments>(
        contractArgs.args,
        ProtoNamespace.hello_arguments.decode
      );
      const res = c.hello(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.hello_result.encode);
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

```ts linenums="1" title="assembly/Immutable.boilerplate.ts" hl_lines="5-15"
import { System, Protobuf, authority } from "@koinos/sdk-as";
import { immutable } from "./proto/immutable";

export class Immutable {
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    // const call = args.call;
    // const type = args.type;

    // YOUR CODE HERE

    const res = new authority.authorize_result();
    res.value = true;

    return res;
  }

  hello(args: immutable.hello_arguments): immutable.hello_result {
    // const name = args.name;

    // YOUR CODE HERE

    const res = new immutable.hello_result();
    // res.value = ;

    return res;
  }
}
```

When we originally created this smart contract, we were given an example implementation of Hello World. Let's copy that code and move it to our new boiler plate file.

```ts linenums="1" title="assembly/Immutable.ts" hl_lines="5-13"
import { System } from "@koinos/sdk-as";
import { immutable } from "./proto/immutable";

export class Immutable {
  hello(args: immutable.hello_arguments): immutable.hello_result {
    const name = args.name!;

    const res = new immutable.hello_result();
    res.value = `Hello, ${name}!`;

    System.log(res.value!);

    return res;
  }
}

```

With the implementation copied into our boilerplate it should look like the following snippet.

```ts linenums="1" title="assembly/Immutable.boilerplate.ts"
import { System, Protobuf, authority } from "@koinos/sdk-as";
import { immutable } from "./proto/immutable";

export class Immutable {
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    // const call = args.call;
    // const type = args.type;

    // YOUR CODE HERE

    const res = new authority.authorize_result();
    res.value = true;

    return res;
  }

  hello(args: immutable.hello_arguments): immutable.hello_result {
    const name = args.name!;

    const res = new immutable.hello_result();
    res.value = `Hello, ${name}!`;

    System.log(res.value!);

    return res;
  }
}
```

Excellent! Now we have can replace the entire `Immutable.ts` file with our `Immutable.boilerplate.ts` contents.
```sh
rm assembly/Immutable.ts
mv assembly/Immutable.boilerplate.ts assembly/Immutable.ts
```

Now we move on to the crux of the matter, making our smart contract immutable!

---
## The implementation
To make a contract immutable, we must indicate that it cannot be re-uploaded. The authority system is capable of more complex decisions and it is recommended to read about it in the [Authority](../authority.md) section. Let's demonstrate an implementation that locks down the contract and enforces immutability.

Open up your implementation file.

```sh
vi assembly/Immutable.ts
```

To accomplish this, we simply return `false` from the `authorize()` method.

```ts linenums="1" title="assembly/Immutable.ts" hl_lines="6"
import { System, Protobuf, authority } from "@koinos/sdk-as";
import { immutable } from "./proto/immutable";

export class Immutable {
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    return new authority.authorize_result(false);
  }

  hello(args: immutable.hello_arguments): immutable.hello_result {
    const name = args.name!;

    const res = new immutable.hello_result();
    res.value = `Hello, ${name}!`;

    System.log(res.value!);

    return res;
  }
}
```


## Building the contract
Great! It's time to build our contract. Before proceeding let's generate the AssemblyScript code for our "Hello World" implementation.

```sh
koinos-sdk-as-cli generate-contract-proto
```

```{ .txt, .no-copy }
Generating Contract AS proto files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/*.proto
yarn run v1.22.22
$ /home/$USER/Workspace/immutable/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/immutable.proto
Done in 0.60s.
```

!!! note
    This generates the file `assembly/proto/immutable.ts` with the following contents.

    ```ts linenums="1" title="assembly/proto/immutable.ts"
    import { Writer, Reader } from "as-proto";

    export namespace immutable {
        export class hello_arguments {
            static encode(message: hello_arguments, writer: Writer): void {
                const unique_name_name = message.name;
                if (unique_name_name !== null) {
                    writer.uint32(10);
                    writer.string(unique_name_name);
                }
            }

            static decode(reader: Reader, length: i32): hello_arguments {
                const end: usize = length < 0 ? reader.end : reader.ptr + length;
                const message = new hello_arguments();

                while (reader.ptr < end) {
                    const tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }

                return message;
            }

            name: string | null;

            constructor(name: string | null = null) {
                this.name = name;
            }
        }

        export class hello_result {
            static encode(message: hello_result, writer: Writer): void {
                const unique_name_value = message.value;
                if (unique_name_value !== null) {
                    writer.uint32(10);
                    writer.string(unique_name_value);
                }
            }

            static decode(reader: Reader, length: i32): hello_result {
                const end: usize = length < 0 ? reader.end : reader.ptr + length;
                const message = new hello_result();

                while (reader.ptr < end) {
                    const tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.string();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }

                return message;
            }

            value: string | null;

            constructor(value: string | null = null) {
                this.value = value;
            }
        }
    }
    ```

    This code is for serialization and deserialization of the "Hello World" method and is not related to making our contract immutable.

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
Since we are using the default "Hello World" implementation, we were given our test for free. Let's have a look at the test file provided.

```sh
cat assembly/__tests__/Immutable.spec.ts
```

```ts linenums="1" title="assembly/__tests__/Immutable.spec.ts"
import { Immutable } from '../Immutable';
import { immutable } from '../proto/immutable';

describe('contract', () => {
  it("should return 'hello, NAME!'", () => {
    const c = new Immutable();

    const args = new immutable.hello_arguments('World');
    const res = c.hello(args);

    expect(res.value).toStrictEqual('Hello, World!');
  });
});
```

Why don't we do our due diligence and ensure our `authorize()` method actually returns `false` by adding a test.

```sh
vi assembly/__tests__/Immutable.spec.ts
```

Add the following highlighted lines.

```ts linenums="1" title="assembly/__tests__/Immutable.spec.ts" hl_lines="3 15-22"
import { Immutable } from '../Immutable';
import { immutable } from '../proto/immutable';
import { authority } from "@koinos/sdk-as";

describe('contract', () => {
  it("should return 'hello, NAME!'", () => {
    const c = new Immutable();

    const args = new immutable.hello_arguments('World');
    const res = c.hello(args);

    expect(res.value).toStrictEqual('Hello, World!');
  });

  it("should not authorize", () => {
    const c = new Immutable();

    const args = new authority.authorize_arguments();
    const res = c.authorize(args);

    expect(res.value).toStrictEqual(false);
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
$ /home/$USER/Workspace/immutable/node_modules/.bin/asp --verbose --config as-pect.config.js
       ___   _____                       __    
      /   | / ___/      ____  ___  _____/ /_   
     / /| | \__ \______/ __ \/ _ \/ ___/ __/   
    / ___ |___/ /_____/ /_/ /  __/ /__/ /_     
   /_/  |_/____/     / .___/\___/\___/\__/     
                    /_/                        

⚡AS-pect⚡ Test suite runner [6.2.4]

[Log] Loading asc compiler
Assemblyscript Folder:assemblyscript
[Log] Compiler loaded in 171.92ms.
[Log] Using configuration /home/$USER/Workspace/immutable/as-pect.config.js
[Log] Using VerboseReporter
[Log] Including files: assembly/__tests__/**/*.spec.ts
[Log] Running tests that match: (:?)
[Log] Running groups that match: (:?)
[Log] Effective command line args:
  [TestFile.ts] node_modules/@as-pect/assembly/assembly/index.ts --runtime incremental --debug --binaryFile output.wasm --explicitStart --use ASC_RTRACE=1 --exportTable --importMemory --transform /home/$USER/Workspace/immutable/node_modules/@as-covers/transform/lib/index.js,/home/$USER/Workspace/immutable/node_modules/@as-pect/core/lib/transform/index.js --lib node_modules/@as-covers/assembly/index.ts

[Describe]: contract

[Log] Hello, World!
 [Success]: ✔ should return 'hello, NAME!' RTrace: +21
 [Success]: ✔ should not authorize RTrace: +14

    [File]: assembly/__tests__/Immutable.spec.ts
  [Groups]: 2 pass, 2 total
  [Result]: ✔ PASS
[Snapshot]: 0 total, 0 added, 0 removed, 0 different
 [Summary]: 2 pass,  0 fail, 2 total
    [Time]: 15.483ms

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  [Result]: ✔ PASS
   [Files]: 1 total
  [Groups]: 2 count, 2 pass
   [Tests]: 2 pass, 0 fail, 2 total
    [Time]: 2522.981ms
┌───────────────────────┬───────┬───────┬──────┬──────┬───────────┐
│ File                  │ Total │ Block │ Func │ Expr │ Uncovered │
├───────────────────────┼───────┼───────┼──────┼──────┼───────────┤
│ assembly/Immutable.ts │ 100%  │ 100%  │ 100% │ N/A  │           │
├───────────────────────┼───────┼───────┼──────┼──────┼───────────┤
│ total                 │ 100%  │ 100%  │ 100% │ N/A  │           │
└───────────────────────┴───────┴───────┴──────┴──────┴───────────┘

Done in 2.71s.
```

Awesome, you have written a basic smart contract that is immutable with unit tests! Bravo!

!!! note
    It is not enough to just implement `authorize()` in your smart contract. You must indicate that you are overriding the `authorize()` function when uploading your smart contract. For details and examples of how this works check out the [Authority: Uploading the contract](../authority.md#uploading-the-contract) section.

    For more information on uploading contracts, visit the [Deploying a contract](../deploy-contract.md).