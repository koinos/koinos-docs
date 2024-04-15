[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [value](../modules/value.md) / list\_type

# Class: list\_type

[value](../modules/value.md).list_type

## Table of contents

### Constructors

- [constructor](value.list_type.md#constructor)

### Properties

- [values](value.list_type.md#values)

### Methods

- [decode](value.list_type.md#decode)
- [encode](value.list_type.md#encode)

## Constructors

### constructor

• **new list_type**(`values?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `values` | [`value_type`](value.value_type.md)[] | `[]` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:280

## Properties

### values

• **values**: [`value_type`](value.value_type.md)[]

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:278

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`list_type`](value.list_type.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`list_type`](value.list_type.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:258

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`list_type`](value.list_type.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:248
