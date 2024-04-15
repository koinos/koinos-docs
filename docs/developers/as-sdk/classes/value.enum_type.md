[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [value](../modules/value.md) / enum\_type

# Class: enum\_type

[value](../modules/value.md).enum_type

## Table of contents

### Constructors

- [constructor](value.enum_type.md#constructor)

### Properties

- [name](value.enum_type.md#name)
- [number](value.enum_type.md#number)

### Methods

- [decode](value.enum_type.md#decode)
- [encode](value.enum_type.md#encode)

## Constructors

### constructor

• **new enum_type**(`name?`, `number?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `""` |
| `number` | `number` | `0` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:241

## Properties

### name

• **name**: `string`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:238

___

### number

• **number**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:239

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`enum_type`](value.enum_type.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`enum_type`](value.enum_type.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:214

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`enum_type`](value.enum_type.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:202
