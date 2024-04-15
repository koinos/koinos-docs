[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [chain](../modules/chain.md) / argument\_data

# Class: argument\_data

[chain](../modules/chain.md).argument_data

## Table of contents

### Constructors

- [constructor](chain.argument_data.md#constructor)

### Properties

- [arguments](chain.argument_data.md#arguments)
- [entry\_point](chain.argument_data.md#entry_point)

### Methods

- [decode](chain.argument_data.md#decode)
- [encode](chain.argument_data.md#encode)

## Constructors

### constructor

• **new argument_data**(`entry_point?`, `arguments?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `entry_point` | `number` | `0` |
| `arguments` | `Uint8Array` | `undefined` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:397

## Properties

### arguments

• **arguments**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:395

___

### entry\_point

• **entry\_point**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:394

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`argument_data`](chain.argument_data.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`argument_data`](chain.argument_data.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:370

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`argument_data`](chain.argument_data.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:358
