[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [protocol](../modules/protocol.md) / block

# Class: block

[protocol](../modules/protocol.md).block

## Table of contents

### Constructors

- [constructor](protocol.block.md#constructor)

### Properties

- [header](protocol.block.md#header)
- [id](protocol.block.md#id)
- [signature](protocol.block.md#signature)
- [transactions](protocol.block.md#transactions)

### Methods

- [decode](protocol.block.md#decode)
- [encode](protocol.block.md#encode)

## Constructors

### constructor

• **new block**(`id?`, `header?`, `transactions?`, `signature?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `Uint8Array` | `undefined` |
| `header` | ``null`` \| [`block_header`](protocol.block_header.md) | `null` |
| `transactions` | [`transaction`](protocol.transaction.md)[] | `[]` |
| `signature` | `Uint8Array` | `undefined` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1078

## Properties

### header

• **header**: ``null`` \| [`block_header`](protocol.block_header.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1074

___

### id

• **id**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1073

___

### signature

• **signature**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1076

___

### transactions

• **transactions**: [`transaction`](protocol.transaction.md)[]

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1075

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`block`](protocol.block.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`block`](protocol.block.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1039

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`block`](protocol.block.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:1011
