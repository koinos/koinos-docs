[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [protocol](../modules/protocol.md) / upload\_contract\_operation

# Class: upload\_contract\_operation

[protocol](../modules/protocol.md).upload_contract_operation

## Table of contents

### Constructors

- [constructor](protocol.upload_contract_operation.md#constructor)

### Properties

- [abi](protocol.upload_contract_operation.md#abi)
- [authorizes\_call\_contract](protocol.upload_contract_operation.md#authorizes_call_contract)
- [authorizes\_transaction\_application](protocol.upload_contract_operation.md#authorizes_transaction_application)
- [authorizes\_upload\_contract](protocol.upload_contract_operation.md#authorizes_upload_contract)
- [bytecode](protocol.upload_contract_operation.md#bytecode)
- [contract\_id](protocol.upload_contract_operation.md#contract_id)

### Methods

- [decode](protocol.upload_contract_operation.md#decode)
- [encode](protocol.upload_contract_operation.md#encode)

## Constructors

### constructor

• **new upload_contract_operation**(`contract_id?`, `bytecode?`, `abi?`, `authorizes_call_contract?`, `authorizes_transaction_application?`, `authorizes_upload_contract?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `contract_id` | `Uint8Array` | `undefined` |
| `bytecode` | `Uint8Array` | `undefined` |
| `abi` | `string` | `""` |
| `authorizes_call_contract` | `bool` | `false` |
| `authorizes_transaction_application` | `bool` | `false` |
| `authorizes_upload_contract` | `bool` | `false` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:276

## Properties

### abi

• **abi**: `string`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:271

___

### authorizes\_call\_contract

• **authorizes\_call\_contract**: `bool`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:272

___

### authorizes\_transaction\_application

• **authorizes\_transaction\_application**: `bool`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:273

___

### authorizes\_upload\_contract

• **authorizes\_upload\_contract**: `bool`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:274

___

### bytecode

• **bytecode**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:270

___

### contract\_id

• **contract\_id**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:269

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`upload_contract_operation`](protocol.upload_contract_operation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`upload_contract_operation`](protocol.upload_contract_operation.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:229

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`upload_contract_operation`](protocol.upload_contract_operation.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:197
