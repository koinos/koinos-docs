[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [protocol](../modules/protocol.md) / operation

# Class: operation

[protocol](../modules/protocol.md).operation

## Table of contents

### Constructors

- [constructor](protocol.operation.md#constructor)

### Properties

- [call\_contract](protocol.operation.md#call_contract)
- [set\_system\_call](protocol.operation.md#set_system_call)
- [set\_system\_contract](protocol.operation.md#set_system_contract)
- [upload\_contract](protocol.operation.md#upload_contract)

### Methods

- [decode](protocol.operation.md#decode)
- [encode](protocol.operation.md#encode)

## Constructors

### constructor

• **new operation**(`upload_contract?`, `call_contract?`, `set_system_call?`, `set_system_contract?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `upload_contract` | ``null`` \| [`upload_contract_operation`](protocol.upload_contract_operation.md) | `null` |
| `call_contract` | ``null`` \| [`call_contract_operation`](protocol.call_contract_operation.md) | `null` |
| `set_system_call` | ``null`` \| [`set_system_call_operation`](protocol.set_system_call_operation.md) | `null` |
| `set_system_contract` | ``null`` \| [`set_system_contract_operation`](protocol.set_system_contract_operation.md) | `null` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:543

## Properties

### call\_contract

• **call\_contract**: ``null`` \| [`call_contract_operation`](protocol.call_contract_operation.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:539

___

### set\_system\_call

• **set\_system\_call**: ``null`` \| [`set_system_call_operation`](protocol.set_system_call_operation.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:540

___

### set\_system\_contract

• **set\_system\_contract**: ``null`` \| [`set_system_contract_operation`](protocol.set_system_contract_operation.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:541

___

### upload\_contract

• **upload\_contract**: ``null`` \| [`upload_contract_operation`](protocol.upload_contract_operation.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:538

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`operation`](protocol.operation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`operation`](protocol.operation.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:494

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`operation`](protocol.operation.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:457
