[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [protocol](../modules/protocol.md) / contract\_call\_bundle

# Class: contract\_call\_bundle

[protocol](../modules/protocol.md).contract_call_bundle

## Table of contents

### Constructors

- [constructor](protocol.contract_call_bundle.md#constructor)

### Properties

- [contract\_id](protocol.contract_call_bundle.md#contract_id)
- [entry\_point](protocol.contract_call_bundle.md#entry_point)

### Methods

- [decode](protocol.contract_call_bundle.md#decode)
- [encode](protocol.contract_call_bundle.md#encode)

## Constructors

### constructor

• **new contract_call_bundle**(`contract_id?`, `entry_point?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `contract_id` | `Uint8Array` | `undefined` |
| `entry_point` | `number` | `0` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:132

## Properties

### contract\_id

• **contract\_id**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:129

___

### entry\_point

• **entry\_point**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:130

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`contract_call_bundle`](protocol.contract_call_bundle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`contract_call_bundle`](protocol.contract_call_bundle.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:105

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`contract_call_bundle`](protocol.contract_call_bundle.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:93
