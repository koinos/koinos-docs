[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [protocol](../modules/protocol.md) / call\_contract\_operation

# Class: call\_contract\_operation

[protocol](../modules/protocol.md).call_contract_operation

## Table of contents

### Constructors

- [constructor](protocol.call_contract_operation.md#constructor)

### Properties

- [args](protocol.call_contract_operation.md#args)
- [contract\_id](protocol.call_contract_operation.md#contract_id)
- [entry\_point](protocol.call_contract_operation.md#entry_point)

### Methods

- [decode](protocol.call_contract_operation.md#decode)
- [encode](protocol.call_contract_operation.md#encode)

## Constructors

### constructor

• **new call_contract_operation**(`contract_id?`, `entry_point?`, `args?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `contract_id` | `Uint8Array` | `undefined` |
| `entry_point` | `number` | `0` |
| `args` | `Uint8Array` | `undefined` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:344

## Properties

### args

• **args**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:342

___

### contract\_id

• **contract\_id**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:340

___

### entry\_point

• **entry\_point**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:341

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`call_contract_operation`](protocol.call_contract_operation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`call_contract_operation`](protocol.call_contract_operation.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:312

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`call_contract_operation`](protocol.call_contract_operation.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:295
