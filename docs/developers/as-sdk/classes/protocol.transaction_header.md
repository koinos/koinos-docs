[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [protocol](../modules/protocol.md) / transaction\_header

# Class: transaction\_header

[protocol](../modules/protocol.md).transaction_header

## Table of contents

### Constructors

- [constructor](protocol.transaction_header.md#constructor)

### Properties

- [chain\_id](protocol.transaction_header.md#chain_id)
- [nonce](protocol.transaction_header.md#nonce)
- [operation\_merkle\_root](protocol.transaction_header.md#operation_merkle_root)
- [payee](protocol.transaction_header.md#payee)
- [payer](protocol.transaction_header.md#payer)
- [rc\_limit](protocol.transaction_header.md#rc_limit)

### Methods

- [decode](protocol.transaction_header.md#decode)
- [encode](protocol.transaction_header.md#encode)

## Constructors

### constructor

• **new transaction_header**(`chain_id?`, `rc_limit?`, `nonce?`, `operation_merkle_root?`, `payer?`, `payee?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `chain_id` | `Uint8Array` | `undefined` |
| `rc_limit` | `number` | `0` |
| `nonce` | `Uint8Array` | `undefined` |
| `operation_merkle_root` | `Uint8Array` | `undefined` |
| `payer` | `Uint8Array` | `undefined` |
| `payee` | `Uint8Array` | `undefined` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:636

## Properties

### chain\_id

• **chain\_id**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:629

___

### nonce

• **nonce**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:631

___

### operation\_merkle\_root

• **operation\_merkle\_root**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:632

___

### payee

• **payee**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:634

___

### payer

• **payer**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:633

___

### rc\_limit

• **rc\_limit**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:630

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`transaction_header`](protocol.transaction_header.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`transaction_header`](protocol.transaction_header.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:589

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`transaction_header`](protocol.transaction_header.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:557
