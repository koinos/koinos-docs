[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [token](../modules/token.md) / transfer\_event

# Class: transfer\_event

[token](../modules/token.md).transfer_event

## Table of contents

### Constructors

- [constructor](token.transfer_event.md#constructor)

### Properties

- [from](token.transfer_event.md#from)
- [to](token.transfer_event.md#to)
- [value](token.transfer_event.md#value)

### Methods

- [decode](token.transfer_event.md#decode)
- [encode](token.transfer_event.md#encode)

## Constructors

### constructor

• **new transfer_event**(`from?`, `to?`, `value?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `from` | `Uint8Array` | `undefined` |
| `to` | `Uint8Array` | `undefined` |
| `value` | `number` | `0` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:709

## Properties

### from

• **from**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:705

___

### to

• **to**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:706

___

### value

• **value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:707

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`transfer_event`](token.transfer_event.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`transfer_event`](token.transfer_event.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:677

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`transfer_event`](token.transfer_event.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/contracts/token/token.ts:660
