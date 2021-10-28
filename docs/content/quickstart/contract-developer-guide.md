# Contract developer guide

## Setting up your environment

For the purposes of this tutorial, we will install the Contract Development Kit (CDT) as well as its dependencies to `~/opt`. This is just a suggestion
and will work if you decide another location is more appropriate for you.

### Retrieving dependencies

The Koinos CDT has three dependencies.
- Protobuf 3.17.3
- WASI SDK 12.0
- EmbeddedProto

#### Protocol buffers

First, we will install the Protobuf dependency. While it is possible to install this via a package manager such as Homebrew or Aptitude,
we will build the dependency from source so that we may target the exact version of Protobuf required by the CDT without regard to version available in
your preferred pacakage manager.

```sh
$ git clone --recursive https://github.com/protocolbuffers/protobuf.git
$ cd protobuf
$ git checkout v3.17.3
$ mkdir _build
$ cd _build
$ cmake -DCMAKE_INSTALL_PREFIX=~/opt/protobuf-3.17.3 -DCMAKE_BUILD_TYPE=Release ../cmake
$ make -j install
```

#### WASI SDK

Because WASI SDK provides adequate release packages on GitHub, we will simply grab the package for our operating system and extract it to the correct
location.

##### macOS
```sh
$ wget https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-12/wasi-sdk-12.0-macos.tar.gz
$ tar -xvf wasi-sdk-12.0-macos.tar.gz -C ~/opt
```

##### Linux
```sh
$ wget https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-12/wasi-sdk-12.0-linux.tar.gz -C ~/opt2
$ tar -xvf wasi-sdk-12.0-linux.tar.gz -C ~/opt
```

#### EmbeddedProto

We will only need to clone this repository. We leverage the `protoc` plugin provided by this repository for serialization within the virtual machine.

```sh
$ cd ~/opt
$ git clone --recursive https://github.com/koinos/EmbeddedProto.git
```

### Building the CDT

In order to build Koinos smart contracts you must first install the Koinos CDT. Navigate to the [Koinos CDT](https://github.com/koinos/koinos-cdt)
and clone the repository.

The CDT relies on WASI SDK in order to build. We let the project know the location of WASI SDK using the environment variable `KOINOS_WASI_SDK_ROOT`.

```sh
$ export KOINOS_WASI_SDK_ROOT=~/opt/wasi-sdk-12.0
$ git clone --recursive https://github.com/koinos/koinos-cdt.git
$ cd koinos-cdt
$ mkdir build
$ cd build
$ cmake -DCMAKE_INSTALL_PREFIX=~/opt/koinos-cdt ..
$ make -j install
```

## Using the Koinos CDT

You are now prepared to compile Koinos smart contracts. Koinos smart contracts are built using the CMake build system. Using the provided
CMake toolchain file, along with a few environment variables, you can now build contracts.

Assuming you have placed the Koinos CDT and the associated dependencies in `~/opt`, you can set the necessary environment variables as follows:

```sh
$ export KOINOS_WASI_SDK_ROOT=~/opt/wasi-sdk-12.0
$ export KOINOS_PROTOBUF_ROOT=~/opt/protobuf-3.17.3
$ export KOINOS_EMBEDDED_PROTO_ROOT=~/opt/EmbeddedProto
$ export KOINOS_CDT_ROOT=~/opt/koinos-cdt
```

You are now ready to configure your smart contract project. From your project root directory, use the provided toolchain file and build:

```sh
$ mkdir build
$ cd build
$ cmake -DCMAKE_TOOLCHAIN_FILE=${KOINOS_CDT_ROOT}/cmake/koinos-wasm-toolchain.cmake -DCMAKE_BUILD_TYPE=Release ..
$ make -j
```

After building your smart contract you will find two important artifacts in your build directory.
- The WASM binary (`*.wasm`)
- A type descriptor file (`*.pb`)

At the moment, we must manually create an Application Binary Interface (ABI) file to use with `koinos-cli`. This will require utilizing the type descriptor file. For more information on how that file is structured see the [Contract ABI](../architecture/contract-abi.md) documentation.
