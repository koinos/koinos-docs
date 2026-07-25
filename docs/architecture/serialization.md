---
icon: fontawesome/solid/cubes
---

# Serialization

Koinos uses [Protocol Buffers](https://protobuf.dev/) to define structured data
and encode it as bytes. A shared schema lets services, clients, and smart
contracts agree on field numbers, types, and nested messages even when they are
implemented in different languages.

## Where protobuf is used

The versioned [`koinos-proto`](https://github.com/koinos/koinos-proto/tree/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80)
repository defines the main data boundaries:

| Boundary | Examples |
| --- | --- |
| Protocol objects | Blocks, block headers, transactions, operations, and receipts |
| Service RPC | Chain queries, block lookup, pending transactions, and derived indexes |
| Broadcasts | Accepted blocks, irreversible blocks, transaction results, and contract events |
| Smart contract runtime | Contract arguments, results, system-call messages, and events |
| Contract ABI | Type descriptors used to encode a contract's arguments and results |

Individual services may also serialize protobuf messages in their persistent
state. That storage format remains owned by the service and is not automatically
a public compatibility contract.

## Schema and wire data

A `.proto` file is the schema. Generated language bindings or runtime
descriptors encode and decode the wire data. The schema name alone is not
enough: a client and service must use compatible field definitions.

Protocol Buffers supports compatible schema evolution when field numbers and
wire types are managed correctly. Renaming or reusing a field number can be
breaking even if the new source code still compiles.

## Signed and hashed data

Protocol Buffers does not promise that every implementation will produce an
identical byte sequence for every logically equivalent message. That matters
when bytes are hashed or signed.

Koinos protocol objects define the representation expected by the protocol.
Applications should use an official Koinos SDK or a tested compatible
implementation when building transaction IDs, signatures, block IDs, or other
cryptographically referenced values. Re-encoding a message with an arbitrary
protobuf library can produce bytes that do not match the expected signed
payload.

## Contract data

The Chain service passes contract arguments and results across the WebAssembly
runtime boundary as byte arrays. The contract and caller use protobuf types to
interpret those bytes. A [Contract ABI](contract-abi.md) connects a method's
entry point to its argument and result message types.

Serialization errors are therefore interface errors: the contract may receive
the wrong field values or reject the call even though the byte array itself is
valid.

For language-specific generation and contract examples, continue with
[Smart Contract Development](../contracts/protobuffers.md).

## Versioned sources

- [`koinos-proto` v2.6.0](https://github.com/koinos/koinos-proto/tree/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80)
- [Protocol objects](https://github.com/koinos/koinos-proto/tree/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/protocol)
- [RPC schemas](https://github.com/koinos/koinos-proto/tree/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc)
- [Broadcast schemas](https://github.com/koinos/koinos-proto/tree/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/broadcast)
- [Chain runtime boundary](https://github.com/koinos/koinos-chain/tree/0ae99eced8b585c4145424e9c2a28f667796cc66)
