[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [token](../modules/token.md) / mint\_event

# Class: mint\_event

[token](../modules/token.md).mint_event

## Table of contents

### Constructors

- [constructor](token.mint_event.md#constructor)

### Properties

- [to](token.mint_event.md#to)
- [value](token.mint_event.md#value)

### Methods

- [decode](token.mint_event.md#decode)
- [encode](token.mint_event.md#encode)

## Constructors

### constructor

• **new mint_event**(`to?`, `value?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `to` | `Uint8Array` | `undefined` |
| `value` | `number` | `0` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:653

## Properties

### to

• **to**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:650

___

### value

• **value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:651

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`mint_event`](token.mint_event.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`mint_event`](token.mint_event.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:626

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`mint_event`](token.mint_event.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:614
