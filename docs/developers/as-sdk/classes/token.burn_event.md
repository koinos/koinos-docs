[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [token](../modules/token.md) / burn\_event

# Class: burn\_event

[token](../modules/token.md).burn_event

## Table of contents

### Constructors

- [constructor](token.burn_event.md#constructor)

### Properties

- [from](token.burn_event.md#from)
- [value](token.burn_event.md#value)

### Methods

- [decode](token.burn_event.md#decode)
- [encode](token.burn_event.md#encode)

## Constructors

### constructor

• **new burn_event**(`from?`, `value?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `from` | `Uint8Array` | `undefined` |
| `value` | `number` | `0` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:607

## Properties

### from

• **from**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:604

___

### value

• **value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:605

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`burn_event`](token.burn_event.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`burn_event`](token.burn_event.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:580

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`burn_event`](token.burn_event.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:568
