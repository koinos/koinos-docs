[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [protocol](../modules/protocol.md) / set\_system\_call\_operation

# Class: set\_system\_call\_operation

[protocol](../modules/protocol.md).set_system_call_operation

## Table of contents

### Constructors

- [constructor](protocol.set_system_call_operation.md#constructor)

### Properties

- [call\_id](protocol.set_system_call_operation.md#call_id)
- [target](protocol.set_system_call_operation.md#target)

### Methods

- [decode](protocol.set_system_call_operation.md#decode)
- [encode](protocol.set_system_call_operation.md#encode)

## Constructors

### constructor

• **new set_system_call_operation**(`call_id?`, `target?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `call_id` | `number` | `0` |
| `target` | ``null`` \| [`system_call_target`](protocol.system_call_target.md) | `null` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:398

## Properties

### call\_id

• **call\_id**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:395

___

### target

• **target**: ``null`` \| [`system_call_target`](protocol.system_call_target.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:396

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`set_system_call_operation`](protocol.set_system_call_operation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`set_system_call_operation`](protocol.set_system_call_operation.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:371

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`set_system_call_operation`](protocol.set_system_call_operation.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:356
