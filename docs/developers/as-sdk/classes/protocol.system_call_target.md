[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [protocol](../modules/protocol.md) / system\_call\_target

# Class: system\_call\_target

[protocol](../modules/protocol.md).system_call_target

## Table of contents

### Constructors

- [constructor](protocol.system_call_target.md#constructor)

### Properties

- [system\_call\_bundle](protocol.system_call_target.md#system_call_bundle)
- [thunk\_id](protocol.system_call_target.md#thunk_id)

### Methods

- [decode](protocol.system_call_target.md#decode)
- [encode](protocol.system_call_target.md#encode)

## Constructors

### constructor

• **new system_call_target**(`thunk_id?`, `system_call_bundle?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `thunk_id` | `number` | `0` |
| `system_call_bundle` | ``null`` \| [`contract_call_bundle`](protocol.contract_call_bundle.md) | `null` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:187

## Properties

### system\_call\_bundle

• **system\_call\_bundle**: ``null`` \| [`contract_call_bundle`](protocol.contract_call_bundle.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:185

___

### thunk\_id

• **thunk\_id**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:184

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`system_call_target`](protocol.system_call_target.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`system_call_target`](protocol.system_call_target.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:157

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`system_call_target`](protocol.system_call_target.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:142
