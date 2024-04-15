[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [protocol](../modules/protocol.md) / block\_header

# Class: block\_header

[protocol](../modules/protocol.md).block_header

## Table of contents

### Constructors

- [constructor](protocol.block_header.md#constructor)

### Properties

- [approved\_proposals](protocol.block_header.md#approved_proposals)
- [height](protocol.block_header.md#height)
- [previous](protocol.block_header.md#previous)
- [previous\_state\_merkle\_root](protocol.block_header.md#previous_state_merkle_root)
- [signer](protocol.block_header.md#signer)
- [timestamp](protocol.block_header.md#timestamp)
- [transaction\_merkle\_root](protocol.block_header.md#transaction_merkle_root)

### Methods

- [decode](protocol.block_header.md#decode)
- [encode](protocol.block_header.md#encode)

## Constructors

### constructor

• **new block_header**(`previous?`, `height?`, `timestamp?`, `previous_state_merkle_root?`, `transaction_merkle_root?`, `signer?`, `approved_proposals?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `previous` | `Uint8Array` | `undefined` |
| `height` | `number` | `0` |
| `timestamp` | `number` | `0` |
| `previous_state_merkle_root` | `Uint8Array` | `undefined` |
| `transaction_merkle_root` | `Uint8Array` | `undefined` |
| `signer` | `Uint8Array` | `undefined` |
| `approved_proposals` | `Uint8Array`[] | `[]` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:991

## Properties

### approved\_proposals

• **approved\_proposals**: `Uint8Array`[]

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:989

___

### height

• **height**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:984

___

### previous

• **previous**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:983

___

### previous\_state\_merkle\_root

• **previous\_state\_merkle\_root**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:986

___

### signer

• **signer**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:988

___

### timestamp

• **timestamp**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:985

___

### transaction\_merkle\_root

• **transaction\_merkle\_root**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:987

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`block_header`](protocol.block_header.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`block_header`](protocol.block_header.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:939

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`block_header`](protocol.block_header.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:899
