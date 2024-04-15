[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [token](../modules/token.md) / mint\_arguments

# Class: mint\_arguments

[token](../modules/token.md).mint_arguments

## Table of contents

### Constructors

- [constructor](token.mint_arguments.md#constructor)

### Properties

- [to](token.mint_arguments.md#to)
- [value](token.mint_arguments.md#value)

### Methods

- [decode](token.mint_arguments.md#decode)
- [encode](token.mint_arguments.md#encode)

## Constructors

### constructor

• **new mint_arguments**(`to?`, `value?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `to` | `Uint8Array` | `undefined` |
| `value` | `number` | `0` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:433

## Properties

### to

• **to**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:430

___

### value

• **value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:431

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`mint_arguments`](token.mint_arguments.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`mint_arguments`](token.mint_arguments.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:406

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`mint_arguments`](token.mint_arguments.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:394
