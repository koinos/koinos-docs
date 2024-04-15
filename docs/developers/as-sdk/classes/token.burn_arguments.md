[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [token](../modules/token.md) / burn\_arguments

# Class: burn\_arguments

[token](../modules/token.md).burn_arguments

## Table of contents

### Constructors

- [constructor](token.burn_arguments.md#constructor)

### Properties

- [from](token.burn_arguments.md#from)
- [value](token.burn_arguments.md#value)

### Methods

- [decode](token.burn_arguments.md#decode)
- [encode](token.burn_arguments.md#encode)

## Constructors

### constructor

• **new burn_arguments**(`from?`, `value?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `from` | `Uint8Array` | `undefined` |
| `value` | `number` | `0` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:502

## Properties

### from

• **from**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:499

___

### value

• **value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:500

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`burn_arguments`](token.burn_arguments.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`burn_arguments`](token.burn_arguments.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:475

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`burn_arguments`](token.burn_arguments.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:463
