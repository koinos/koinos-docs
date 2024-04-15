[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [protocol](../modules/protocol.md) / set\_system\_contract\_operation

# Class: set\_system\_contract\_operation

[protocol](../modules/protocol.md).set_system_contract_operation

## Table of contents

### Constructors

- [constructor](protocol.set_system_contract_operation.md#constructor)

### Properties

- [contract\_id](protocol.set_system_contract_operation.md#contract_id)
- [system\_contract](protocol.set_system_contract_operation.md#system_contract)

### Methods

- [decode](protocol.set_system_contract_operation.md#decode)
- [encode](protocol.set_system_contract_operation.md#encode)

## Constructors

### constructor

• **new set_system_contract_operation**(`contract_id?`, `system_contract?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `contract_id` | `Uint8Array` | `undefined` |
| `system_contract` | `bool` | `false` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:447

## Properties

### contract\_id

• **contract\_id**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:444

___

### system\_contract

• **system\_contract**: `bool`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:445

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`set_system_contract_operation`](protocol.set_system_contract_operation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`set_system_contract_operation`](protocol.set_system_contract_operation.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:420

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`set_system_contract_operation`](protocol.set_system_contract_operation.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:405
