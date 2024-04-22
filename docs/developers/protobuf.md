# Protocol buffers
Protocol Buffers, also known as protobuf, is a widely used method for serializing structured data, developed by Google. It offers a platform-neutral, efficient way to encode data that can be used for communication protocols, data storage, and more. With its language-neutral interface and compact binary format, Protocol Buffers enable efficient data exchange between different systems and programming languages, providing advantages such as reduced bandwidth usage and faster data processing. Its schema definition language allows for defining the structure of data, facilitating seamless communication and interoperability across a wide variety of environments.

Learn more about [Protocol buffers](https://protobuf.dev/) from their official documentation.

---
## Protobuf on Koinos
Protocol buffers is used in a wide variety of ways in the Koinos ecosystem. It is used for internal messaging between microservices, serialization in and out of the Koinos Virtual Machine, and it is the bytes signed with Koinos cryptography libraries.

---
## Understanding the Protobuf declaration
Let's take a look at a Protobuf declaration for event data.

```proto
syntax = "proto3";

message event_data {
   uint32 sequence = 1;
   bytes source = 2 [(btype) = CONTRACT_ID];
   string name = 3;
   bytes data = 4;
   repeated bytes impacted = 5 [(btype) = ADDRESS];
}
```

As you can see, a message is very similar to a struct in C. We indicate that we are using `proto3` syntax. Each field has a type associated with it. You can see a full list of [scalar types](https://protobuf.dev/programming-guides/proto3/#scalar) defined in the protocol buffer documentation. In addition to the type, each field also has label. This is self explanatory but it allows you to reference a field by name.

Field numbers must be unique. And for forward compatibility you must not re-use a field a number. Because protocol buffer messages are upgradeable, you may add additional fields with unique field names at a later time without breaking an early implementation's deserialization. You can read more details about [field numbers](https://protobuf.dev/programming-guides/proto3/#scalar) in the official documentation.

Protobuf messages can contain other protobuf messages. This composite behavior is used throughout the Koinos ecosystem. You can see an example of this when observing how transactions are defined.

```proto
message transaction_header {
   bytes chain_id = 1;
   uint64 rc_limit = 2 [jstype = JS_STRING];
   bytes nonce = 3;
   bytes operation_merkle_root = 4;
   bytes payer = 5 [(btype) = ADDRESS];
   bytes payee = 6 [(btype) = ADDRESS];
}

message transaction {
   bytes id = 1 [(btype) = TRANSACTION_ID];
   transaction_header header = 2;
   repeated operation operations = 3;
   repeated bytes signatures = 4;
}
```

### Koinos protobuf options
Koinos provides several options for Protobuf messages. The [full list](https://github.com/koinos/koinos-proto/blob/master/koinos/options.proto) can be found in the `koinos-proto` repository. As you can see in many of the protocol buffer examples, the option `btype` is used. This option is shorthand for `bytes_type` and it is defined in the following example.

```proto
enum bytes_type {
   BASE64 = 0;
   BASE58 = 1;
   HEX = 2;
   BLOCK_ID = 3;
   TRANSACTION_ID = 4;
   CONTRACT_ID = 5;
   ADDRESS = 6;
}

extend google.protobuf.FieldOptions {
   optional bytes_type btype = 50000;
}
```

Koinos bytes type is used to indicate what a raw bytes field represents. Koinos libraries also use the bytes type to represent bytes in JSON or when printing. It is conventional for an address to be represented in `base58` and a transaction ID to be represented in `hex`. It is through `btype` that this is achieved.

### Canonicity and signing messages
It should be noted that if your message should be cryptographically signed or for any other reason you require the byte representation for a given message to be consistent, you must not use the `map` type. This is because the order of map elements vary depending on the implementation and it is not guaranteed by the specification. You may use a particular library and achieve consistency, but when using a different library have unexpected results.

Since Protocol buffers is not [inherently canonical](https://protobuf.dev/programming-guides/serialization-not-canonical/), Koinos libraries offer an additional function to achieve this behavior. For example, the C++ protobuf library has an additional function `serialize_canonically()`. When new languages are introduced into the ecosystem and requires canonicity, you must implementation canonical serialization with it.

---
## More on Protocol buffers
When developing on Koinos you will undoubtedly encounter protobuf messages. It is recommended that you become familiar with the specification to understand more. When defining your own protobuf messages, whether it is for a microservice RPC or a smart contract ABI, review the Protobuf [best practices](https://protobuf.dev/programming-guides/dos-donts/).

When developing an API for a microservice, it is recommended to read the [API best practices](https://protobuf.dev/programming-guides/api/) section of the protobuf documentation.