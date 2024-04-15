[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [chain](../modules/chain.md) / contract\_metadata\_object

# Class: contract\_metadata\_object

[chain](../modules/chain.md).contract_metadata_object

## Table of contents

### Constructors

- [constructor](chain.contract_metadata_object.md#constructor)

### Properties

- [authorizes\_call\_contract](chain.contract_metadata_object.md#authorizes_call_contract)
- [authorizes\_transaction\_application](chain.contract_metadata_object.md#authorizes_transaction_application)
- [authorizes\_upload\_contract](chain.contract_metadata_object.md#authorizes_upload_contract)
- [hash](chain.contract_metadata_object.md#hash)
- [system](chain.contract_metadata_object.md#system)

### Methods

- [decode](chain.contract_metadata_object.md#decode)
- [encode](chain.contract_metadata_object.md#encode)

## Constructors

### constructor

• **new contract_metadata_object**(`hash?`, `system?`, `authorizes_call_contract?`, `authorizes_transaction_application?`, `authorizes_upload_contract?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `hash` | `Uint8Array` | `undefined` |
| `system` | `bool` | `false` |
| `authorizes_call_contract` | `bool` | `false` |
| `authorizes_transaction_application` | `bool` | `false` |
| `authorizes_upload_contract` | `bool` | `false` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:574

## Properties

### authorizes\_call\_contract

• **authorizes\_call\_contract**: `bool`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:570

___

### authorizes\_transaction\_application

• **authorizes\_transaction\_application**: `bool`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:571

___

### authorizes\_upload\_contract

• **authorizes\_upload\_contract**: `bool`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:572

___

### hash

• **hash**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:568

___

### system

• **system**: `bool`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:569

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`contract_metadata_object`](chain.contract_metadata_object.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`contract_metadata_object`](chain.contract_metadata_object.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:532

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`contract_metadata_object`](chain.contract_metadata_object.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:505
