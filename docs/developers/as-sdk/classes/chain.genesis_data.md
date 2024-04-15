[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [chain](../modules/chain.md) / genesis\_data

# Class: genesis\_data

[chain](../modules/chain.md).genesis_data

## Table of contents

### Constructors

- [constructor](chain.genesis_data.md#constructor)

### Properties

- [entries](chain.genesis_data.md#entries)

### Methods

- [decode](chain.genesis_data.md#decode)
- [encode](chain.genesis_data.md#encode)

## Constructors

### constructor

• **new genesis_data**(`entries?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `entries` | [`genesis_entry`](chain.genesis_entry.md)[] | `[]` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:773

## Properties

### entries

• **entries**: [`genesis_entry`](chain.genesis_entry.md)[]

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:771

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`genesis_data`](chain.genesis_data.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`genesis_data`](chain.genesis_data.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:751

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`genesis_data`](chain.genesis_data.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:741
