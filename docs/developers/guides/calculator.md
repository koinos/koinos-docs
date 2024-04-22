# Calculator
Welcome to our comprehensive guide on building a smart contract calculator using the AssemblyScript SDK for Koinos. In this tutorial, we'll dive into the exciting world of decentralized finance (DeFi) by harnessing the power of Koinos blockchain technology. Whether you're a seasoned developer looking to expand your skill set or a newcomer eager to explore the possibilities of blockchain, this step-by-step tutorial will walk you through the process of creating a robust and efficient calculator smart contract. With clear explanations, code snippets, and practical examples, you'll learn how to leverage the features of the AssemblyScript SDK to implement mathematical operations securely and transparently on the Koinos blockchain. Let's embark on this journey together and unlock the potential of decentralized computation!

Before embarking on this journey, ensure that you have already setup your Koinos AssemblyScript SDK environment by following [this guide](../as-sdk.md).

---
## Setting up the project
Let's begin by creating a boilerplate smart contract project using the Koinos AssemblyScript SDK.

```sh
koinos-sdk-as-cli create calculator
```

```{ .txt .no-copy }
Generating contract at "/home/$USER/Workspace/calculator" ...

Contract successfully generated!

You're all set! Run the following set of commands to verify that the generated contract is correctly setup:

  cd /home/$USER/Workspace/calculator && yarn install && yarn build:debug && yarn test
```

Change your directory to the project directory and install dependencies.
```sh
cd calculator
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
Building a contract will usually consist of behaviors and data. The behavior is defined by the smart contract. But the data is defined by Protobuf. We generate data structures with Protobuf so that the smart contract can easily integrate with other Koinos tools. We have defined the arguments and results we will use in our calculator. We use the `*_arguments` convention for contract function arguments and `*_result` for contract function results.

Let's begin by defining our entry point arguments and results.
```sh
vi assembly/proto/calculator.proto
```

We can remove the boilerplate code and replace it with our standard calculator arguments and results.

```proto
/**
 * @file assembly/proto/calculator.proto
 * @brief Defines inputs and outputs of the calculator smart contract.
 */
syntax = "proto3";

package calculator;

message add_arguments {
  int64 x = 1;
  int64 y = 2;
}

message add_result {
  int64 value = 1;
}

message sub_arguments {
  int64 x = 1;
  int64 y = 2;
}

message sub_result {
  int64 value = 1;
}

message mul_arguments {
  int64 x = 1;
  int64 y = 2;
}

message mul_result {
  int64 value = 1;
}

message div_arguments {
  int64 x = 1;
  int64 y = 2;
}

message div_result {
  int64 value = 1;
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
$ /home/$USER/Workspace/calculator/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/calculator.proto
@protobuf-ts/protoc installed protoc v26.1.
Done in 20.43s.
❯ koinos-sdk-as-cli generate-contract-proto
Generating Contract AS proto files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/*.proto
yarn run v1.22.22
$ /home/$USER/Workspace/calculator/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/calculator.proto
Done in 0.68s.
```

Note that after executing this command the file `assembly/proto/calculator.ts` was automatically generated and contains code that will assist us in serializing and deserializing data in and out of the KVM.

---
## The implementation
Now, we have defined the data in which arguments come into our contract and also the data which is returned by our contract. All we need now is our implementation.

Let's use the tools to automatically generate the boilerplate implementation.
```sh
koinos-sdk-as-cli generate-contract-as calculator.proto
```

```{ .txt .no-copy }
Generating boilerplate.ts and index.ts files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/calculator.proto
yarn run v1.22.22
$ /home/$USER/Workspace/calculator/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/calculator.proto
Done in 0.94s.
```

After invoking this command, we have two newly generated files. The first is `assembly/index.ts` which is the first location our smart contract codes begin executing. This file acts as a router to call the appropriate method on our class becaused on how the smart contract was invoked.

The second file that was generated is `assembly/Calculator.boilerplate.ts`. This is where our implementation lives. We should rename this file to `Calculator.ts` and begin our implementation.

```sh
rm assembly/Calculator.ts
mv assembly/Calculator.boilerplate.ts assembly/Calculator.ts
vi assembly/Calculator.ts
```

Finally, let's open our implementation file and write some simple arithmetic to complete our calculator's functionality.

```ts
/**
 * @file assembly/Calculator.ts
 * @brief Implements calculator smart contract functionality.
 */
import { System, Protobuf, authority } from "@koinos/sdk-as";
import { calculator } from "./proto/calculator";

export class Calculator {
  add(args: calculator.add_arguments): calculator.add_result {
    const res = new calculator.add_result();
    res.value = args.x + args.y;
    return res;
  }

  sub(args: calculator.sub_arguments): calculator.sub_result {
    const res = new calculator.sub_result();
    res.value = args.x - args.y;
    return res;
  }

  mul(args: calculator.mul_arguments): calculator.mul_result {
    const res = new calculator.mul_result();
    res.value = args.x * args.y;
    return res;
  }

  div(args: calculator.div_arguments): calculator.div_result {
    System.require(args.y != 0, "cannot divide by zero");
    const res = new calculator.div_result();
    res.value = args.x / args.y;
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
All code needs tests. The most basic form of a testing is, of course, unit tests. Let's use the built-in unit test system to exercise our calculator code.

Let's open up `assembly/__tests__/Calculator.spec.ts` and write some tests.

```sh
vi assembly/__tests__/Calculator.spec.ts
```

Let's add the following test code.

```ts
/**
 * @file assembly/__tests__/Calculator.spec.ts
 * @brief Implements unit tests for the calculator smart contract.
 */
import { Calculator } from '../Calculator';
import { calculator } from '../proto/calculator';

describe('calculator', () => {
  it("should return the sum", () => {
    const c = new Calculator();

    const args = new calculator.add_arguments(1, 2);
    const res = c.add(args);

    expect(res.value).toStrictEqual(3);
  });

  it("should return the difference", () => {
    const c = new Calculator();

    const args = new calculator.sub_arguments(3, 2);
    const res = c.sub(args);

    expect(res.value).toStrictEqual(1);
  });

  it("should return the product", () => {
    const c = new Calculator();

    const args = new calculator.mul_arguments(5, 5);
    const res = c.mul(args);

    expect(res.value).toStrictEqual(25);
  });

  it("should return the quotient", () => {
    const c = new Calculator();

    const args = new calculator.div_arguments(30, 3);
    const res = c.div(args);

    expect(res.value).toStrictEqual(10);
  });

  it("should prevent divide by zero", () => {
    expect(() => {
      const c = new Calculator();
      const args = new calculator.div_arguments(10, 0);
      c.div(args);
    }).toThrow("cannot divide by zero");
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
$ /home/sgerbino/Workspace/calculator/node_modules/.bin/asp --verbose --config as-pect.config.js
       ___   _____                       __    
      /   | / ___/      ____  ___  _____/ /_   
     / /| | \__ \______/ __ \/ _ \/ ___/ __/   
    / ___ |___/ /_____/ /_/ /  __/ /__/ /_     
   /_/  |_/____/     / .___/\___/\___/\__/     
                    /_/                        

⚡AS-pect⚡ Test suite runner [6.2.4]

[Log] Loading asc compiler
Assemblyscript Folder:assemblyscript
[Log] Compiler loaded in 191.046ms.
[Log] Using configuration /home/sgerbino/Workspace/calculator/as-pect.config.js
[Log] Using VerboseReporter
[Log] Including files: assembly/__tests__/**/*.spec.ts
[Log] Running tests that match: (:?)
[Log] Running groups that match: (:?)
[Log] Effective command line args:
  [TestFile.ts] node_modules/@as-pect/assembly/assembly/index.ts --runtime incremental --debug --binaryFile output.wasm --explicitStart --use ASC_RTRACE=1 --exportTable --importMemory --transform /home/sgerbino/Workspace/calculator/node_modules/@as-covers/transform/lib/index.js,/home/sgerbino/Workspace/calculator/node_modules/@as-pect/core/lib/transform/index.js --lib node_modules/@as-covers/assembly/index.ts

[Describe]: calculator

 [Success]: ✔ should return the sum RTrace: +14
 [Success]: ✔ should return the difference RTrace: +14
 [Success]: ✔ should return the product RTrace: +14
 [Success]: ✔ should return the quotient RTrace: +14
[Contract Exit] cannot divide by zero
 [Success]: ✔ should prevent divide by zero RTrace: +22

    [File]: assembly/__tests__/Calculator.spec.ts
  [Groups]: 2 pass, 2 total
  [Result]: ✔ PASS
[Snapshot]: 0 total, 0 added, 0 removed, 0 different
 [Summary]: 5 pass,  0 fail, 5 total
    [Time]: 20.811ms

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  [Result]: ✔ PASS
   [Files]: 1 total
  [Groups]: 2 count, 2 pass
   [Tests]: 5 pass, 0 fail, 5 total
    [Time]: 2602.673ms
┌────────────────────────┬───────┬───────┬──────┬──────┬───────────┐
│ File                   │ Total │ Block │ Func │ Expr │ Uncovered │
├────────────────────────┼───────┼───────┼──────┼──────┼───────────┤
│ assembly/Calculator.ts │ 100%  │ 100%  │ 100% │ N/A  │           │
├────────────────────────┼───────┼───────┼──────┼──────┼───────────┤
│ total                  │ 100%  │ 100%  │ 100% │ N/A  │           │
└────────────────────────┴───────┴───────┴──────┴──────┴───────────┘

Done in 2.81s.
```

Excellent, you have written a basic smart contract with custom data types and methods, some simple arithmetic functionality, and unit tests! Bravo!
