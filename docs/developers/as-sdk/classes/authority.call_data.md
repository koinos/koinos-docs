[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [authority](../modules/authority.md) / call\_data

# Class: call\_data

[authority](../modules/authority.md).call_data

## Table of contents

### Constructors

- [constructor](authority.call_data.md#constructor)

### Properties

- [caller](authority.call_data.md#caller)
- [contract\_id](authority.call_data.md#contract_id)
- [data](authority.call_data.md#data)
- [entry\_point](authority.call_data.md#entry_point)

### Methods

- [decode](authority.call_data.md#decode)
- [encode](authority.call_data.md#encode)

## Constructors

### constructor

• **new call_data**(`contract_id?`, `entry_point?`, `caller?`, `data?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `contract_id` | `Uint8Array` | `undefined` |
| `entry_point` | `number` | `0` |
| `caller` | `Uint8Array` | `undefined` |
| `data` | `Uint8Array` | `undefined` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/authority.ts:64

## Properties

### caller

• **caller**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/authority.ts:61

___

### contract\_id

• **contract\_id**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/authority.ts:59

___

### data

• **data**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/authority.ts:62

___

### entry\_point

• **entry\_point**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/authority.ts:60

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`call_data`](authority.call_data.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`call_data`](authority.call_data.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/authority.ts:27

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`call_data`](authority.call_data.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/authority.ts:5
