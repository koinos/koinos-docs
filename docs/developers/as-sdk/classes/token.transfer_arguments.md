[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [token](../modules/token.md) / transfer\_arguments

# Class: transfer\_arguments

[token](../modules/token.md).transfer_arguments

## Table of contents

### Constructors

- [constructor](token.transfer_arguments.md#constructor)

### Properties

- [from](token.transfer_arguments.md#from)
- [to](token.transfer_arguments.md#to)
- [value](token.transfer_arguments.md#value)

### Methods

- [decode](token.transfer_arguments.md#decode)
- [encode](token.transfer_arguments.md#encode)

## Constructors

### constructor

• **new transfer_arguments**(`from?`, `to?`, `value?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `from` | `Uint8Array` | `undefined` |
| `to` | `Uint8Array` | `undefined` |
| `value` | `number` | `0` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:359

## Properties

### from

• **from**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:355

___

### to

• **to**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:356

___

### value

• **value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:357

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`transfer_arguments`](token.transfer_arguments.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`transfer_arguments`](token.transfer_arguments.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:327

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`transfer_arguments`](token.transfer_arguments.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:310
