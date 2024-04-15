[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [chain](../modules/chain.md) / database\_key

# Class: database\_key

[chain](../modules/chain.md).database_key

## Table of contents

### Constructors

- [constructor](chain.database_key.md#constructor)

### Properties

- [key](chain.database_key.md#key)
- [space](chain.database_key.md#space)

### Methods

- [decode](chain.database_key.md#decode)
- [encode](chain.database_key.md#encode)

## Constructors

### constructor

• **new database_key**(`space?`, `key?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `space` | ``null`` \| [`object_space`](chain.object_space.md) | `null` |
| `key` | `Uint8Array` | `undefined` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:196

## Properties

### key

• **key**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:194

___

### space

• **space**: ``null`` \| [`object_space`](chain.object_space.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:193

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`database_key`](chain.database_key.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`database_key`](chain.database_key.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:169

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`database_key`](chain.database_key.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:154
