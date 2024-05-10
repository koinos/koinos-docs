---
icon: fontawesome/solid/cubes
---

# Serialization
Koinos utilizes [Protocol Buffers](https://protobuf.dev/) for serializing data types between microservices and between the Koinos Blockchain Framework and the KVM. Protocol Buffers was chosen for a variety of reasons. The primary being the number of officially supported languages and flexibility of the specification to represent all cases required by Koinos.

---
## Koinos Proto
[Koinos Proto](https://github.com/koinos/koinos-proto) is very foundation of Koinos' multilingual support. Every microservice broadcast event and every RPC is defined as a Protobuf message. Every smart contract transmits data in and out of the KVM via Protobuf serialization. This repository defines all interactions between clients, servers, system smart contracts, and microservices. Protobuf is also used to serialize internal data to disk for those microservices that require state.

The repository is organizationed by microservices under the `koinos/` directory. There are a handful of special directories, below find a comprehensive list.

| Directory | Description |
| --------- | ----------- |
| [koinos/broadcast](https://github.com/koinos/koinos-proto/tree/master/koinos/broadcast) | Defines the serialization for all broadcast events within the Koinos cluster. |
| [koinos/contracts](https://github.com/koinos/koinos-proto/tree/master/koinos/contracts) | Defines the serialization for all system smart contracts. |
| [koinos/protocol](https://github.com/koinos/koinos-proto/tree/master/koinos/protocol)  | Defines the serialization for all data types on the wire that may be used for signing. |
| [koinos/rpc](https://github.com/koinos/koinos-proto/tree/master/koinos/rpc)       | Defines the serialization for all Remote Procedure Calls (RPC). |

---
## Canonicity
Protocol Buffers does not specifiy a deterministic serialization for each type. This is a feature of the protocol to increase flexibility. But when cryptographic integrity is required, this is a liability. Thankfully, the Protocol Buffers serialization is not difficult to understand and enforcing canonicity is relatively straight forward. Every field of a Protocol Buffers message must have an integer index. This is a natural sort order. Futhermore, maps are not guaranteeed to be serialized in any particular order. This appears to be due to the fact that not all targeted languages can guarantee a particular order. For example, Golang purposefully randomizes the iteration order of a map to prevent developers from relying on a particular ordering. Koinos Blockchain Framework has no need of maps, so this is not an issue for us. From these restraints the canonical serialization is as follows:

- Serialize fields in field number order
- Do not allow maps

All messages that are cryptographically referenced or verified will be serialized using this serialization. The primary location where this will impact developers is transaction signing.

Learn more about how [Protobuf](../developers/protobuf.md) is used through the Koinos ecosystem. [Read more »](../developers/protobuf.md)