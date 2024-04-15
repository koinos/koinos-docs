[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [chain](../modules/chain.md) / object\_space

# Class: object\_space

[chain](../modules/chain.md).object_space

## Table of contents

### Constructors

- [constructor](chain.object_space.md#constructor)

### Properties

- [id](chain.object_space.md#id)
- [system](chain.object_space.md#system)
- [zone](chain.object_space.md#zone)

### Methods

- [decode](chain.object_space.md#decode)
- [encode](chain.object_space.md#encode)

## Constructors

### constructor

• **new object_space**(`system?`, `zone?`, `id?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `system` | `bool` | `false` |
| `zone` | `Uint8Array` | `undefined` |
| `id` | `number` | `0` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:142

## Properties

### id

• **id**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:140

___

### system

• **system**: `bool`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:138

___

### zone

• **zone**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:139

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`object_space`](chain.object_space.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`object_space`](chain.object_space.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:110

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`object_space`](chain.object_space.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:93
