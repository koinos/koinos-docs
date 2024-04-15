[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / StringBytes

# Namespace: StringBytes

## Table of contents

### Functions

- [bytesToString](StringBytes.md#bytestostring)
- [stringToBytes](StringBytes.md#stringtobytes)

## Functions

### bytesToString

▸ **bytesToString**(`bytes`): `string`

Decode an UTF-8 encoded Uint8Array into a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | ``null`` \| `Uint8Array` | array to decode |

#### Returns

`string`

#### Defined in

[assembly/util/stringBytes.ts:17](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/stringBytes.ts#L17)

___

### stringToBytes

▸ **stringToBytes**(`s`): `Uint8Array`

Convert a given string into a Uint8Array encoded as UTF-8.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | data to encode |

#### Returns

`Uint8Array`

#### Defined in

[assembly/util/stringBytes.ts:6](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/stringBytes.ts#L6)
