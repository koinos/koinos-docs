[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [chain](../modules/chain.md) / error\_data

# Class: error\_data

[chain](../modules/chain.md).error_data

## Table of contents

### Constructors

- [constructor](chain.error_data.md#constructor)

### Properties

- [message](chain.error_data.md#message)

### Methods

- [decode](chain.error_data.md#decode)
- [encode](chain.error_data.md#encode)

## Constructors

### constructor

• **new error_data**(`message?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `""` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:35

## Properties

### message

• **message**: `string`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:33

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`error_data`](chain.error_data.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`error_data`](chain.error_data.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:13

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`error_data`](chain.error_data.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:6
