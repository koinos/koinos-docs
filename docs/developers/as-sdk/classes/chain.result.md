[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [chain](../modules/chain.md) / result

# Class: result

[chain](../modules/chain.md).result

## Table of contents

### Constructors

- [constructor](chain.result.md#constructor)

### Properties

- [error](chain.result.md#error)
- [object](chain.result.md#object)

### Methods

- [decode](chain.result.md#decode)
- [encode](chain.result.md#encode)

## Constructors

### constructor

• **new result**(`object?`, `error?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `object` | `Uint8Array` | `undefined` |
| `error` | ``null`` \| [`error_data`](chain.error_data.md) | `null` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:83

## Properties

### error

• **error**: ``null`` \| [`error_data`](chain.error_data.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:81

___

### object

• **object**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:80

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`result`](chain.result.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`result`](chain.result.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:56

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`result`](chain.result.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:41
