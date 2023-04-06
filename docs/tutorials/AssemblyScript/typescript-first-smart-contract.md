# Create your first Koinos smart contract in minutes!

Originally published by Roamin on [Hashnode](https://hashnode.com/@Roamin)

In this tutorial we will create a simple smart contract in AssemblyScript and compile it to a WASM file that can be deployed to the Koinos Blockchain.

## Setting up the dev environment

### Install NodeJS

We will need NodeJS installed in order to develop, build and deploy the smart contract. If it is not yet installed on your system please head over to [the NodeJS website](https://nodejs.org/) and follow the installation guide.

### Download the SDK CLI

In this example we will be using the [Yarn package manger](https://yarnpkg.com/getting-started/install), but NPM will work as well.

Install the AssemblyScript CLI by running this command:

`yarn global add @roamin/sdk-as-cli`


The CLI should be installed globally, we can check by running this command:

`koinos-sdk-as-cli -V`

The output should read:

`1.0.4`


### Create the smart contract

To create the smart contract boilerplate we can run the following command:

`koinos-sdk-as-cli create myawesomecontract`

The CLI command `create` takes one argument which is the name of the contract in this case the smart contract is called `myawesomecontract` 

 
The output should look something like this:

[cli code example](/images/first-step.png)

The CLI also outputs a set of commands that we can run to check if the contract was correctly generated. 

From within the myawesomecontract directory run these commands:

`yarn install && yarn build:debug && yarn test`

Let us look at each command and break down what it does.  

-  `yarn install`:  installs all the dependencies that we need to compile and test a Koinos smart contract

-  `yarn build:debug`: this compiles the smart contract into WASM (the debug version of the WASM file)

`yarn test`: this runs the unit tests of the smart contract

If successful the output should look something like this:  

[build results image](/images/build-result.png)

The CLI generates a boilerplate smart contract which allows us to quickly setup a new contract and make sure the development environment is working properly.


### The generated smart contract code

 
Let's open the `myawesomecontract` folder in our code editor. The content should be similar to this:

[file structure image](/images/vscode-file-structure-image.png)

We will mainly focus on the assembly folder, it's where all the smart contract-related code lives.

`assembly` folder:

[assembly folder image](/images/assembly-folder-image.png)

 
- the `__tests__` folder is for creating the unit tests for the contract
  
- the `proto` folder is where your proto files live

-  `index.ts` file is the entry point of the contract, it's the file that will be called by the Koinos blockchain/VM when interacting with the contract

-  `Myawesomecontract.boilerplate.ts` is the code that the CLI auto-generated based on the proto file description
- 
-  `Myawesomecontract.ts` is the actual code of the smart contract

-  `tsconfig.json` is used to tell the IDE what types are available in AssemblyScript, AS is like TypeScript but with WebAssembly types

`proto` folder:

The Koinos blockchain  leverages Google's Protocol Buffers (Protobuf). 
[Protobuf website](https://developers.google.com/protocol-buffers)

> Protocol buffers are Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data – think XML, but smaller, faster, and simpler.
  
How does Koinos leverage Protobuf?

Simple, it's just everywhere in the codebase of the blockchain framework. It's used for interacting with the blockchain, it's used by the microservices that composed the blockchain framework and it's also used to store data on the blockchain. So, this means that since our smart contract most likely needs to store data and you're creating a smart contract for someone to use, you'll need to learn about Protobuf, but don't worry, it's super simple. It's just describing what's called messages that are just structures that you could find in any programming language. (a structure name and properties (a property type and a property name))


The proto folder should look like this:
  
[proto folder image](/images/proto-folder-image.png)

These are the files in the 
- myawesomecontract.proto is the file we will be working in 
- myawesomecontract.ts is the AssemblyScript code that is auto-generated from the above proto file


Let's have a look at the myawesomecontract.proto file

```
syntax = "proto3";

package myawesomecontract;

  

// @description Says Hello!

// @read-only true

message hello_arguments {

string name = 1;

}

  

message hello_result {

string value = 1;

}
 ``` 

We will focus on the important parts of this file:

-  `package myawesomecontract` the package name to which this proto file belongs, in this case, it's the name of the smart contract
-  `message hello_arguments` is divided into 3 parts:
	-  `message` this indicates that we are declaring a new proto message
	-  `hello` is the name of the smart contract function this message describes
	-  `arguments` describes the arguments of the function
-  `message hello_result` the message that describes the result of the function `hello`

A smart contract function always contains an `arguments message` and a `result message` (even if the message is empty). Each `arguments message` must contain `comments`:

-  `@description` is used to describe what the function does
-  `@read-only` is used to indicate if the function needs to write to the blockchain state or not

Inside the `hello_arguments`, you can see string `name = 1`; this means that our `hello_arguments` message has one property called `name` and that it is a string.

To summarize, in this proto file we are describing a `hello` function that takes a `string` called `name` as argument and returns a `string` called value as result. 


You can learn more about Protobuf directly on [Google's Protobuf website](https://developers.google.com/protocol-buffers/docs/proto3)


After creating or modifying the proto we will need to compile it so that the new AS files get generated.
 
 We can use the CLI:

`koinos-sdk-as-cli build-all debug 0 myawesomecontract.proto`

This command will re/generate the `myawesomecontract.ts` file, the index.ts file as well as the Myawesomecontract.boilerplate.ts file.

Let's have a look at the generated Myawesomecontract.boilerplate.ts file. The comments describe each function.

```
// import of the different helpers available in the Koinos AS SDK
import { System, Protobuf, authority } from "koinos-sdk-as";

// import of the AS generated proto file myawesomecontract.ts
import { myawesomecontract } from "./proto/myawesomecontract";

// exports the contract class
export class Myawesomecontract {

// description of the hello function
hello(

// arguments of the hello function, which are of type "hello_arguments"
args: myawesomecontract.hello_arguments

):

// result of the hello function, which is of type "hello_result"
myawesomecontract.hello_result {


/*
"name" variable that's directly extracted from the "hello_arguments"
that we described in our proto file
*/

// const name = args.name;

  

// this where you would describe your smart contract function's logic

  

// "res" variable that is of type "hello_result"

const res = new myawesomecontract.hello_result();

/*

"value" variable that's directly extracted from the "hello_result"

that we described in our proto file

*/

// res.value = ;

  

      return res;

    }
}
```
  
  

The `*.boilerplate.ts` is very useful when we are creating the contract or when we update the `proto` file. It will generate the boilerplate code of the smart contract functions.

Let's have a look at the actual smart contract implementation, comments have been added to the code that hasn't been explained previously:

`Myawesomecontract.ts`

```
import { System } from "koinos-sdk-as";

import { myawesomecontract } from "./proto/myawesomecontract";


export class Myawesomecontract {

hello(args: myawesomecontract.hello_arguments): myawesomecontract.hello_result {

const name = args.name;


const res = new myawesomecontract.hello_result();

	// the result of the string "Hello, " + name
	res.value = `Hello, ${name}!`;


	// The System call/function "log"
	// will log the "res.value" in the transaction's receipt

	System.log(res.value);

	return res;

 }
}
```

`__tests__` folder:

Let's have a look at the unit tests.

In the `__tests__` folder we should have a file called `Myawesomecontract.spec.ts`, this is where the unit tests for the smart contract function `hello` are written. 

```
// import the smart contract ts file
import { Myawesomecontract } from '../Myawesomecontract';

// import the proto ts file
import { myawesomecontract } from '../proto/myawesomecontract';


describe('contract', () => {

it("should return 'hello, NAME!'", () => {

// instantiate the contract
const c = new Myawesomecontract();

// instantiate the arguments for the "hello" function
const args = new myawesomecontract.hello_arguments('World');

// call the "hello" function
const res = c.hello(args);

// check that the result of the "hello" function is what is expected
expect(res.value).toStrictEqual('Hello, World!');

});

});
```
  

### Modify the generated smart contract code

Let's add a function that will simply add 2 numbers together.

To add a function to our contract, we need to modify our `proto` file, let's add an `add` function:

```
// @description Adds 2 numbers together
// @read-only true

message add_arguments {

// "add" accepts an argument called "a" that is of type "uint64"
uint64 a = 1;

// "add" accepts an argument called "b" that is of type "uint64"
uint64 b = 2;

}

message add_result {

// "add" returns a result that has a property called "value"
// "value" is of type "uint64"
uint64 value = 1;

}
```
 
Run the command:

`koinos-sdk-as-cli build-all debug 0 myawesomecontract.proto`

This will generate the new boilerplate files, we also get the following error, that is because we have not added the function `add` to our contract yet:

ERROR TS2339: Property 'add' does not exist on type 'assembly/Myawesomecontract/Myawesomecontract'.

[compile error image](/images/compile-error.png)

To remedy this problem, let's open the `Myawesomecontract.boilerplate.ts` file and copy the following auto-generated code:  

```
add(args: myawesomecontract.add_arguments): myawesomecontract.add_result {

// const a = args.a;
// const b = args.b;

// YOUR CODE HERE

const res = new myawesomecontract.add_result();

// res.value = ;

return res;

}
```
  
Open the `Myawesomecontract.ts` file and paste the new function. Let's implement the `add` function as follows:

```
add(args: myawesomecontract.add_arguments): myawesomecontract.add_result {

const a = args.a;
const b = args.b;

// "c" is just the addition of "a" and "b"
// we use the "SafeMath" helper
// this will ensure that our result won't overflow/underflow
const c = SafeMath.add(a, b);

const res = new myawesomecontract.add_result();

// we set the "value" with the above calculated "c"
res.value = c;

return res;

}
```
  
Now that our new function has been implemented, let's add a new unit test. Head over to the `Myawesomecontract.spec.ts` file and add the following unit test:

```
it("should add 2 numbers", () => {

const c = new Myawesomecontract();

  

const args = new myawesomecontract.add_arguments(4, 8);

const res = c.add(args);

  

expect(res.value).toStrictEqual(12);

});
```

`koinos-sdk-as-cli run-tests`

Let's run our tests to make sure everything is working.

[test results](/images/tests-result.png)

We just added a new function to the contract and also made sure that it works.
  

Summary

In this tutorial we learned how to setup a smart contract development environment for Koinos, we also saw how to generate a smart contract and how to add functionality to it. We've done all of this locally, on our machine, without connecting to the blockchain, without having to create an account.

 
In the next article, we will see how to upload the smart contract to `Harbinger` which is the Koinos testnet.