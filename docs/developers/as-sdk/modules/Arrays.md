[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / Arrays

# Namespace: Arrays

## Table of contents

### Functions

- [equal](Arrays.md#equal)
- [fromHexString](Arrays.md#fromhexstring)
- [toHexString](Arrays.md#tohexstring)

## Functions

### equal

▸ **equal**(`first`, `second`): `bool`

Checks if 2 Uint8Array are equal.
Note: if both first and second are null, then they are considered equal

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | ``null`` \| `Uint8Array` |
| `second` | ``null`` \| `Uint8Array` |

#### Returns

`bool`

#### Defined in

[assembly/util/arrays.ts:8](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/arrays.ts#L8)

___

### fromHexString

▸ **fromHexString**(`hex`): `Uint8Array`

Convert the string `hex` which must consist of an even number of
hexadecimal digits to a `Uint8Array`. The string `hex` can optionally
start with '0x'

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `string` |

#### Returns

`Uint8Array`

#### Defined in

[assembly/util/arrays.ts:42](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/arrays.ts#L42)

___

### toHexString

▸ **toHexString**(`buffer`, `prepend0x?`): `string`

Convert the Uint8Array `buffer` into a hexadecimal digits string. The string can optionally
be appended with '0x'

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buffer` | `Uint8Array` | `undefined` |
| `prepend0x` | `bool` | `true` |

#### Returns

`string`

#### Defined in

[assembly/util/arrays.ts:59](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/arrays.ts#L59)
