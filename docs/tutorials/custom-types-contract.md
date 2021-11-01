# Smart contract custom types

This tutorial aims to demonstrate how to create smart contracts using custom types in order to interact with it. We will create a decentralized
calculator to accomplish this. The full example can be found on [GitHub](https://github.com/koinos/koinos-calculator-example).

## Setting up the project

C++ smart contracts are built using the CMake build system. Let us begin by setting up our directory structure.

```console
$ mkdir calculator-contract
$ cd calculator-contract
$ mkdir types
$ mkdir src
```

Now, let us create the accompanying CMake files.

```console
$ vi CMakeLists.txt
```

You can just copy this snippet in to contents of the file. It is recommended to familiarize yourself with the CMake build system.

```cmake
cmake_minimum_required(VERSION 3.10.2)
project(calculator-contract VERSION 0.1.0 LANGUAGES CXX)
include(KoinosProto)
add_subdirectory(types)
add_subdirectory(src)

```

> _**Note:** The `include(KoinosProto)` portion is provided by using the Koinos toolchain file._

Save this file with `:wq`.

Next, we'll create the CMake file that contents the incantation to generate custom types.

```console
$ vi types/CMakeLists.txt
```

The function of this file is to grab all files matching the pattern `*.proto`, generate the necessary protobuf serializations,
and associate it with the CMake target `types`. Copy the following contents in to the file:

```cmake
file(GLOB PROTO_FILES *.proto)
add_library(types INTERFACE ${PROTO_FILES})
target_include_directories(types INTERFACE ${CMAKE_CURRENT_BINARY_DIR})
koinos_generate_proto(TARGET types)
```

Save this file with `:wq`.

Next we'll create the CMake file that creates our smart contract build artifact (`*.wasm`).

```console
$ vi src/CMakeLists.txt
```

The function of this file is to compile the smart contract source code and link it with the necessary libraries in order to
generate the smart contract. Copy the following contents in to the file:

```cmake
add_executable(calc calc.cpp)
target_link_libraries(calc types koinos_proto_embedded koinos_api koinos_api_cpp koinos_wasi_api c c++ c++abi clang_rt.builtins-wasm32)
```

## Defining custom types

Now that we have our CMake project infrastructure in place. Let us define the arguments and results we will use in our calculator. We use the
`*_arguments` convention for contract function arguments and `*_result` for contract function results.

```console
$ vi types/calc.proto
```

Copy the following contents in to the file:

```proto
syntax = "proto3";

package koinos.contracts.calc;

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

Save this file with `:wq`.

## Writing the implementation

The source code of our contract and the location of `main()` will reside in the `src/` directory. We define a simple integer calculator class
and implement the functionality of `main()` to call it based on the entry point.

```console
$ vi src/calc.cpp
```

> _**Note:** The name of our implementation file matches our CMake invocation in `src/CMakeLists.txt`._

Copy the implementation into the file.

```c++
#include <koinos/system/system_calls.hpp>

#include <koinos/buffer.hpp>
#include <koinos/common.h>

#include <calc.h>

using namespace koinos;
using namespace koinos::contracts;

enum entries : uint32_t
{
   add_entry = 1,
   sub_entry = 2,
   mul_entry = 3,
   div_entry = 4
};

class calculator
{
public:
   calc::add_result add( int64_t x, int64_t y ) noexcept;
   calc::sub_result sub( int64_t x, int64_t y ) noexcept;
   calc::mul_result mul( int64_t x, int64_t y ) noexcept;
   calc::div_result div( int64_t x, int64_t y ) noexcept;
};

calc::add_result calculator::add( int64_t x, int64_t y ) noexcept
{
   calc::add_result res;
   res.set_value( x + y );
   return res;
}

calc::sub_result calculator::sub( int64_t x, int64_t y ) noexcept
{
   calc::sub_result res;
   res.set_value( x - y );
   return res;
}

calc::mul_result calculator::mul( int64_t x, int64_t y ) noexcept
{
   calc::mul_result res;
   res.set_value( x * y );
   return res;
}

calc::div_result calculator::div( int64_t x, int64_t y ) noexcept
{
   calc::div_result res;

   if ( y == 0 )
   {
      system::print( "cannot divide by zero" );
      system::exit_contract( 1 );
   }

   res.set_value( x / y );
   return res;
}

int main()
{
   auto entry_point = system::get_entry_point();
   auto args = system::get_contract_arguments();

   std::array< uint8_t, 32 > retbuf;

   koinos::read_buffer rdbuf( (uint8_t*)args.c_str(), args.size() );
   koinos::write_buffer buffer( retbuf.data(), retbuf.size() );

   calculator c;

   switch( entry_point )
   {
      case entries::add_entry:
      {
         calc::add_arguments args;
         args.deserialize( rdbuf );

         auto res = c.add( args.x(), args.y() );
         res.serialize( buffer );
         break;
      }
      case entries::sub_entry:
      {
         calc::sub_arguments args;
         args.deserialize( rdbuf );

         auto res = c.sub( args.x(), args.y() );
         res.serialize( buffer );
         break;
      }
      case entries::mul_entry:
      {
         calc::mul_arguments args;
         args.deserialize( rdbuf );

         auto res = c.mul( args.x(), args.y() );
         res.serialize( buffer );
         break;
      }
      case entries::div_entry:
      {
         calc::div_arguments args;
         args.deserialize( rdbuf );

         auto res = c.div( args.x(), args.y() );
         res.serialize( buffer );
         break;
      }
      default:
         system::exit_contract( 1 );
   }

   std::string retval( reinterpret_cast< const char* >( buffer.data() ), buffer.get_size() );
   system::set_contract_result_bytes( retval );

   system::exit_contract( 0 );
   return 0;
}
```

> _**Note:** We have an included header called `calc.h`, this was generated automatically based off our `calc.proto` definitions._

## Compiling the smart contract

If you have not already prepared your environment please refer to the [Contract developer guide](../quickstart/contract-developer-guide.md). We
will now use the [Koinos Contract Developer Toolkit (CDT)](https://github.com/koinos/koinos-cdt) to compile the smart contract.

```console
$ mkdir build
$ cd build
$ cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_TOOLCHAIN_FILE=${KOINOS_CDT_ROOT}/cmake/koinos-wasm-toolchain.cmake ..
$ make -j
```

This will create two build artifacts, `build/src/calc.wasm` and `build/types/types.pb`. We will need these later.

## Creating the ABI file

We will use the [Koinos Command Line Interface (CLI)](https://github.com/koinos/koinos-cli) to interact with this contract on the blockchain. We need the Application Binary Interface (ABI) to inform
the CLI how to invoke methods on the contract. For more information about the ABI file please refer to the [Contract ABI](../architecture/contract-abi.md) section.

Let us create the ABI in the build directory.

```console
$ vi calc.abi
```

In order to refer to the type information, we must include it in the ABI file. To do this we get the base64 of the `types.pb` file that
was a build artifact of the previous step.

```console
$ cat types/types.pb | base64
Cq4DCgpjYWxjLnByb3RvEhVrb2lub3MuY29udHJhY3RzLmNhbGMiKwoNYWRkX2FyZ3VtZW50cxIMCgF4GAEgASgDUgF4EgwKAXkYAiABKANSAXkiIgoKYWRkX3Jlc3VsdBIUCgV2YWx1ZRgBIAEoA1IFdmFsdWUiKwoNc3ViX2FyZ3VtZW50cxIMCgF4GAEgASgDUgF4EgwKAXkYAiABKANSAXkiIgoKc3ViX3Jlc3VsdBIUCgV2YWx1ZRgBIAEoA1IFdmFsdWUiKwoNbXVsX2FyZ3VtZW50cxIMCgF4GAEgASgDUgF4EgwKAXkYAiABKANSAXkiIgoKbXVsX3Jlc3VsdBIUCgV2YWx1ZRgBIAEoA1IFdmFsdWUiKwoNZGl2X2FyZ3VtZW50cxIMCgF4GAEgASgDUgF4EgwKAXkYAiABKANSAXkiIgoKZGl2X3Jlc3VsdBIUCgV2YWx1ZRgBIAEoA1IFdmFsdWVCPVo7Z2l0aHViLmNvbS9rb2lub3Mva29pbm9zLXByb3RvLWdvbGFuZy9rb2lub3MvY29udHJhY3RzL2NhbGNiBnByb3RvMw==
```

Copy the contents in to the file. Notice that we've set the key `"types"` to the base64 output of the previous command.

```json
{
   "methods" : {
      "add": {
         "argument"    : "koinos.contracts.calc.add_arguments",
         "return"      : "koinos.contracts.calc.add_result",
         "entry_point" : "0x01",
         "description" : "Add two integers",
         "read-only"   : true
      },
      "sub": {
         "argument"    : "koinos.contracts.calc.sub_arguments",
         "return"      : "koinos.contracts.calc.sub_result",
         "entry_point" : "0x02",
         "description" : "Subtract two integers",
         "read-only"   : true
      },
      "mul": {
         "argument"    : "koinos.contracts.calc.mul_arguments",
         "return"      : "koinos.contracts.calc.mul_result",
         "entry_point" : "0x03",
         "description" : "Multiply two integers",
         "read-only"   : true
      },
      "div": {
         "argument"    : "koinos.contracts.calc.div_arguments",
         "return"      : "koinos.contracts.calc.div_result",
         "entry_point" : "0x04",
         "description" : "Divide two integers",
         "read-only"   : true
      }
   },
   "types" : "Cq4DCgpjYWxjLnByb3RvEhVrb2lub3MuY29udHJhY3RzLmNhbGMiKwoNYWRkX2FyZ3VtZW50cxIMCgF4GAEgASgDUgF4EgwKAXkYAiABKANSAXkiIgoKYWRkX3Jlc3VsdBIUCgV2YWx1ZRgBIAEoA1IFdmFsdWUiKwoNc3ViX2FyZ3VtZW50cxIMCgF4GAEgASgDUgF4EgwKAXkYAiABKANSAXkiIgoKc3ViX3Jlc3VsdBIUCgV2YWx1ZRgBIAEoA1IFdmFsdWUiKwoNbXVsX2FyZ3VtZW50cxIMCgF4GAEgASgDUgF4EgwKAXkYAiABKANSAXkiIgoKbXVsX3Jlc3VsdBIUCgV2YWx1ZRgBIAEoA1IFdmFsdWUiKwoNZGl2X2FyZ3VtZW50cxIMCgF4GAEgASgDUgF4EgwKAXkYAiABKANSAXkiIgoKZGl2X3Jlc3VsdBIUCgV2YWx1ZRgBIAEoA1IFdmFsdWVCPVo7Z2l0aHViLmNvbS9rb2lub3Mva29pbm9zLXByb3RvLWdvbGFuZy9rb2lub3MvY29udHJhY3RzL2NhbGNiBnByb3RvMw=="
}
```

> _**Note:** The `"types"` definition comes from the base64 of the `types.pb`._

## Uploading and interaction

It is recommended you create a new address for your contract. You will also require sufficient mana to perform the upload. Once you have done that we can
upload our contract.

```
🔓 > upload calc.wasm
Contract uploaded with address 1MxjuQygG8Ek2XsArvFNwLAa2uns1VfY7e
Submitted transaction with ID 0x1220c3ee14dd94d142e618f46defcb06d206975a610e55c7233e70fb495ac47a2737
```

Once that block is accepted our contract is on the chain. We now must inform the CLI how to interact with the contract. We do this by registering the name, address, and ABI. With the ABI file `calc.abi` and smart contract `calc.wasm` in the current working directory we execute the following command in the CLI.

```
🔓 > register calc 1MxjuQygG8Ek2XsArvFNwLAa2uns1VfY7e calc.abi
Contract 'calc' at address 1MxjuQygG8Ek2XsArvFNwLAa2uns1VfY7e registered
```

You will find that the CLI now has additional capabilities.

```
🔓 > list
...
calc.add        - Add two integers
calc.div        - Divide two integers
calc.mul        - Multiply two integers
calc.sub        - Subtract two integers
...
```

Let us invoke some of our methods.

```
🔓 > calc.div 40040675 5
value:8008135
```
