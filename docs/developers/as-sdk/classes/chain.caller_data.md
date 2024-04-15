[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [chain](../modules/chain.md) / caller\_data

# Class: caller\_data

[chain](../modules/chain.md).caller_data

## Table of contents

### Constructors

- [constructor](chain.caller_data.md#constructor)

### Properties

- [caller](chain.caller_data.md#caller)
- [caller\_privilege](chain.caller_data.md#caller_privilege)

### Methods

- [decode](chain.caller_data.md#decode)
- [encode](chain.caller_data.md#encode)

## Constructors

### constructor

• **new caller_data**(`caller?`, `caller_privilege?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `caller` | `Uint8Array` | `undefined` |
| `caller_privilege` | [`privilege`](../enums/chain.privilege.md) | `0` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:348

## Properties

### caller

• **caller**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:345

___

### caller\_privilege

• **caller\_privilege**: [`privilege`](../enums/chain.privilege.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:346

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`caller_data`](chain.caller_data.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`caller_data`](chain.caller_data.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:321

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`caller_data`](chain.caller_data.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/chain.ts:309
