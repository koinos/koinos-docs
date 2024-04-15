[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [protocol](../modules/protocol.md) / transaction

# Class: transaction

[protocol](../modules/protocol.md).transaction

## Table of contents

### Constructors

- [constructor](protocol.transaction.md#constructor)

### Properties

- [header](protocol.transaction.md#header)
- [id](protocol.transaction.md#id)
- [operations](protocol.transaction.md#operations)
- [signatures](protocol.transaction.md#signatures)

### Methods

- [decode](protocol.transaction.md#decode)
- [encode](protocol.transaction.md#encode)

## Constructors

### constructor

• **new transaction**(`id?`, `header?`, `operations?`, `signatures?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `Uint8Array` | `undefined` |
| `header` | ``null`` \| [`transaction_header`](protocol.transaction_header.md) | `null` |
| `operations` | [`operation`](protocol.operation.md)[] | `[]` |
| `signatures` | `Uint8Array`[] | `[]` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:722

## Properties

### header

• **header**: ``null`` \| [`transaction_header`](protocol.transaction_header.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:718

___

### id

• **id**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:717

___

### operations

• **operations**: [`operation`](protocol.operation.md)[]

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:719

___

### signatures

• **signatures**: `Uint8Array`[]

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:720

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`transaction`](protocol.transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`transaction`](protocol.transaction.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:685

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`transaction`](protocol.transaction.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:654
