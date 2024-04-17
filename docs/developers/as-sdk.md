# AssemblyScript SDK
The Koinos AssemblyScript SDK is a powerful toolkit designed for developers to construct smart contracts on the Koinos blockchain. Leveraging AssemblyScript, a subset of TypeScript, this SDK offers a familiar and developer-friendly environment for coding smart contracts. It provides essential functionalities such as data manipulation, transaction handling, and contract interactions, enabling developers to create complex decentralized applications (dApps) with ease. With its comprehensive documentation and well-defined APIs, the Koinos AssemblyScript SDK streamlines the process of building, testing, and deploying smart contracts, empowering developers to unleash the full potential of the Koinos blockchain ecosystem.

## Setup the environment
To begin, you must first install NodeJS. Follow the official guide to [install NodeJS](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs).

As of the time of writing let's check the version of `node` in use.
```sh
node -v
```

```{ .txt .no-copy }
v18.13.0
```

The Koinos AssemblyScript SDK uses Yarn v1, so let's first install it.
```sh
npm install -g yarn
```

Ensure that `yarn` is in your executable path and the correct version.
```sh
yarn -v
```

```{ .txt .no-copy }
1.22.22
```

Next, we will install the Koinos AssemblyScript SDK CLI.
```sh
yarn global add @koinos/sdk-as-cli
```

```{ .txt .no-copy }
yarn global v1.22.22
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Installed "@koinos/sdk-as-cli@1.0.2" with binaries:
      - koinos-sdk-as-cli
Done in 12.15s
```

Let's verify the program was properly installed and exists in our path.
```sh
koinos-sdk-as-cli -V
```

```{ .txt .no-copy }
1.0.2
```

## Verifying installation
In order to verify that we've installed the necessary components correctly we will create and build a hello world contract. From your preferred working directory let's instruct `koinos-sdk-as-cli` to create a `helloworld` contract.

```sh
koinos-sdk-as-cli create helloworld
```

```{ .txt .no-copy }
Generating contract at "/home/$USER/Workspace/helloworld" ...

Contract successfully generated!

You're all set! Run the following set of commands to verify that the generated contract is correctly setup:

  cd /home/$USER/Workspace/helloworld && yarn install && yarn build:debug && yarn test
```

Now let's go into the newly created directory and follow the instructions to build and test. First let's use `yarn install` to download the dependencies followed by `yarn build:debug` to compile the contract.
```sh
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
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > cacache > @npmcli/move-file@2.0.1: This functionality has been moved to @npmcli/fs
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > @npmcli/arborist > @npmcli/move-file@2.0.1: This functionality has been moved to @npmcli/fs
warning @koinos/sdk-as > @koinos/mock-vm > somap > npm > readdir-scoped-modules > debuglog@1.0.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
warning local-koinos > koilib > multibase@4.0.6: This module has been superseded by the multiformats module
[2/4] Fetching packages...
[3/4] Linking dependencies...
warning "@koinos/sdk-as > @as-covers/core > @as-covers/transform > visitor-as@0.6.0" has incorrect peer dependency "assemblyscript@^0.18.31".
warning " > ts-node@10.9.2" has unmet peer dependency "@types/node@*".
warning Workspaces can only be enabled in private projects.
[4/4] Building fresh packages...
success Saved lockfile.
Done in 79.88s.
```

```sh
yarn build:debug
```

```{ .txt .no-copy }
yarn run v1.22.22
$ koinos-sdk-as-cli build-all debug 0 helloworld.proto
Generating ABI file...
 yarn protoc --plugin=protoc-gen-abi=./node_modules/.bin/koinos-abi-proto-gen --abi_out=abi/ assembly/proto/helloworld.proto 
$ /home/$USER/Workspace/helloworld/node_modules/.bin/protoc --plugin=protoc-gen-abi=./node_modules/.bin/koinos-abi-proto-gen --abi_out=abi/ assembly/proto/helloworld.proto
@protobuf-ts/protoc installed protoc v26.1.
installing minimist@^1.2.0
installing uglify-js@^3.7.7
installing escodegen@^1.13.0
Generating proto files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/*.proto
$ /home/$USER/Workspace/helloworld/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=. assembly/proto/helloworld.proto
Generating boilerplate.ts and index.ts files...
yarn protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/helloworld.proto
$ /home/$USER/Workspace/helloworld/node_modules/.bin/protoc --plugin=protoc-gen-as=./node_modules/.bin/koinos-as-gen --as_out=assembly/ assembly/proto/helloworld.proto
Compiling index.ts...
node ./node_modules/assemblyscript/bin/asc assembly/index.ts --target debug --use abort= --use BUILD_FOR_TESTING=0 --disable sign-extension --config asconfig.json
Done in 10.91s.
```

Finally, we will run the unit tests to ensure that the compiled contract is working as expected.
```sh
yarn test
```

```{ .txt .no-copy }
yarn run v1.22.22
$ koinos-sdk-as-cli run-tests
Running tests...
yarn asp --verbose --config as-pect.config.js
$ /home/$USER/Workspace/helloworld/node_modules/.bin/asp --verbose --config as-pect.config.js
       ___   _____                       __    
      /   | / ___/      ____  ___  _____/ /_   
     / /| | \__ \______/ __ \/ _ \/ ___/ __/   
    / ___ |___/ /_____/ /_/ /  __/ /__/ /_     
   /_/  |_/____/     / .___/\___/\___/\__/     
                    /_/                        

⚡AS-pect⚡ Test suite runner [6.2.4]

[Log] Loading asc compiler
Assemblyscript Folder:assemblyscript
[Log] Compiler loaded in 185.724ms.
[Log] Using configuration /home/$USER/Workspace/helloworld/as-pect.config.js
[Log] Using VerboseReporter
[Log] Including files: assembly/__tests__/**/*.spec.ts
[Log] Running tests that match: (:?)
[Log] Running groups that match: (:?)
[Log] Effective command line args:
  [TestFile.ts] node_modules/@as-pect/assembly/assembly/index.ts --runtime incremental --debug --binaryFile output.wasm --explicitStart --use ASC_RTRACE=1 --exportTable --importMemory --transform /home/$USER/Workspace/helloworld/node_modules/@as-covers/transform/lib/index.js,/home/$USER/Workspace/helloworld/node_modules/@as-pect/core/lib/transform/index.js --lib node_modules/@as-covers/assembly/index.ts

[Describe]: contract

[Log] Hello, World!
 [Success]: ✔ should return 'hello, NAME!' RTrace: +21

    [File]: assembly/__tests__/Helloworld.spec.ts
  [Groups]: 2 pass, 2 total
  [Result]: ✔ PASS
[Snapshot]: 0 total, 0 added, 0 removed, 0 different
 [Summary]: 1 pass,  0 fail, 1 total
    [Time]: 17.675ms

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  [Result]: ✔ PASS
   [Files]: 1 total
  [Groups]: 2 count, 2 pass
   [Tests]: 1 pass, 0 fail, 1 total
    [Time]: 2693.936ms
┌────────────────────────┬───────┬───────┬──────┬──────┬───────────┐
│ File                   │ Total │ Block │ Func │ Expr │ Uncovered │
├────────────────────────┼───────┼───────┼──────┼──────┼───────────┤
│ assembly/Helloworld.ts │ 100%  │ 100%  │ 100% │ N/A  │           │
├────────────────────────┼───────┼───────┼──────┼──────┼───────────┤
│ total                  │ 100%  │ 100%  │ 100% │ N/A  │           │
└────────────────────────┴───────┴───────┴──────┴──────┴───────────┘

Done in 3.20s.
```

## Next steps
If your output matches that of this guide, congratulations you have successful installed and used the Koinos AssemblyScript SDK. For next steps, check out the smart contract guides!