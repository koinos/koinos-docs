[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [chain](../modules/chain.md) / genesis\_entry

# Class: genesis\_entry

[chain](../modules/chain.md).genesis_entry

## Table of contents

### Constructors

- [constructor](chain.genesis_entry.md#constructor)

### Properties

- [key](chain.genesis_entry.md#key)
- [space](chain.genesis_entry.md#space)
- [value](chain.genesis_entry.md#value)

### Methods

- [decode](chain.genesis_entry.md#decode)
- [encode](chain.genesis_entry.md#encode)

## Constructors

### constructor

• **new genesis_entry**(`space?`, `key?`, `value?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `space` | ``null`` \| [`object_space`](chain.object_space.md) | `null` |
| `key` | `Uint8Array` | `undefined` |
| `value` | `Uint8Array` | `undefined` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:729

## Properties

### key

• **key**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:726

___

### space

• **space**: ``null`` \| [`object_space`](chain.object_space.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:725

___

### value

• **value**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:727

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`genesis_entry`](chain.genesis_entry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`genesis_entry`](chain.genesis_entry.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:697

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`genesis_entry`](chain.genesis_entry.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:677
