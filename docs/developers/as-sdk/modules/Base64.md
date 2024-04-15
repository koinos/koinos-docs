[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / Base64

# Namespace: Base64

## Table of contents

### Functions

- [decode](Base64.md#decode)
- [encode](Base64.md#encode)

## Functions

### decode

▸ **decode**(`s`): `Uint8Array`

Decode a base64-encoded string and return a Uint8Array.

**`example`**
```ts
const signatureData = Base64.decode('IHhJwlD7P-o6x7L38den1MnumUhnYmNhTZhIUQQhezvEMf7rx89NbIIioNCIQSk1PQYdQ9mOI4-rDYiwO2pLvM4=');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | Base64 encoded string. |

#### Returns

`Uint8Array`

#### Defined in

[assembly/util/base64.ts:27](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/base64.ts#L27)

___

### encode

▸ **encode**(`bytes`): `string`

Encode Uint8Array as a base64 string.

**`example`**
```ts
const base64encodedStr = Base64.encode('Hello world!');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | Byte array of type Uint8Array. |

#### Returns

`string`

#### Defined in

[assembly/util/base64.ts:87](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/base64.ts#L87)
