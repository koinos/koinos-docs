[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [value](../modules/value.md) / value\_type

# Class: value\_type

[value](../modules/value.md).value_type

## Table of contents

### Constructors

- [constructor](value.value_type.md#constructor)

### Properties

- [bool\_value](value.value_type.md#bool_value)
- [bytes\_value](value.value_type.md#bytes_value)
- [fixed32\_value](value.value_type.md#fixed32_value)
- [fixed64\_value](value.value_type.md#fixed64_value)
- [int32\_value](value.value_type.md#int32_value)
- [int64\_value](value.value_type.md#int64_value)
- [message\_value](value.value_type.md#message_value)
- [sfixed32\_value](value.value_type.md#sfixed32_value)
- [sfixed64\_value](value.value_type.md#sfixed64_value)
- [sint32\_value](value.value_type.md#sint32_value)
- [sint64\_value](value.value_type.md#sint64_value)
- [string\_value](value.value_type.md#string_value)
- [uint32\_value](value.value_type.md#uint32_value)
- [uint64\_value](value.value_type.md#uint64_value)

### Methods

- [decode](value.value_type.md#decode)
- [encode](value.value_type.md#encode)

## Constructors

### constructor

• **new value_type**(`message_value?`, `int32_value?`, `int64_value?`, `uint32_value?`, `uint64_value?`, `sint32_value?`, `sint64_value?`, `fixed32_value?`, `fixed64_value?`, `sfixed32_value?`, `sfixed64_value?`, `bool_value?`, `string_value?`, `bytes_value?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message_value` | ``null`` \| `Any` | `null` |
| `int32_value` | `number` | `0` |
| `int64_value` | `number` | `0` |
| `uint32_value` | `number` | `0` |
| `uint64_value` | `number` | `0` |
| `sint32_value` | `number` | `0` |
| `sint64_value` | `number` | `0` |
| `fixed32_value` | `number` | `0` |
| `fixed64_value` | `number` | `0` |
| `sfixed32_value` | `number` | `0` |
| `sfixed64_value` | `number` | `0` |
| `bool_value` | `bool` | `false` |
| `string_value` | `string` | `""` |
| `bytes_value` | `Uint8Array` | `undefined` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:168

## Properties

### bool\_value

• **bool\_value**: `bool`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:164

___

### bytes\_value

• **bytes\_value**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:166

___

### fixed32\_value

• **fixed32\_value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:160

___

### fixed64\_value

• **fixed64\_value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:161

___

### int32\_value

• **int32\_value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:154

___

### int64\_value

• **int64\_value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:155

___

### message\_value

• **message\_value**: ``null`` \| `Any`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:153

___

### sfixed32\_value

• **sfixed32\_value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:162

___

### sfixed64\_value

• **sfixed64\_value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:163

___

### sint32\_value

• **sint32\_value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:158

___

### sint64\_value

• **sint64\_value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:159

___

### string\_value

• **string\_value**: `string`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:165

___

### uint32\_value

• **uint32\_value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:156

___

### uint64\_value

• **uint64\_value**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:157

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`value_type`](value.value_type.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`value_type`](value.value_type.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:81

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`value_type`](value.value_type.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/chain/value.ts:6
