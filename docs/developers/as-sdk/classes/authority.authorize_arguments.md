[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [authority](../modules/authority.md) / authorize\_arguments

# Class: authorize\_arguments

[authority](../modules/authority.md).authorize_arguments

## Table of contents

### Constructors

- [constructor](authority.authorize_arguments.md#constructor)

### Properties

- [call](authority.authorize_arguments.md#call)
- [type](authority.authorize_arguments.md#type)

### Methods

- [decode](authority.authorize_arguments.md#decode)
- [encode](authority.authorize_arguments.md#encode)

## Constructors

### constructor

• **new authorize_arguments**(`type?`, `call?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | [`authorization_type`](../enums/authority.authorization_type.md) | `0` |
| `call` | ``null`` \| [`call_data`](authority.call_data.md) | `null` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/authority.ts:120

## Properties

### call

• **call**: ``null`` \| [`call_data`](authority.call_data.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/authority.ts:118

___

### type

• **type**: [`authorization_type`](../enums/authority.authorization_type.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/authority.ts:117

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`authorize_arguments`](authority.authorize_arguments.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`authorize_arguments`](authority.authorize_arguments.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/authority.ts:93

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`authorize_arguments`](authority.authorize_arguments.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/authority.ts:78
