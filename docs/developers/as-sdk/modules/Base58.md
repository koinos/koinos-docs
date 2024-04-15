[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / Base58

# Namespace: Base58

## Table of contents

### Functions

- [decode](Base58.md#decode)
- [encode](Base58.md#encode)

## Functions

### decode

▸ **decode**(`string`): `Uint8Array`

Decode a base58 string into aUint8Array

**`example`**
```ts
const from = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | base58 encoded string |

#### Returns

`Uint8Array`

#### Defined in

[assembly/util/base58.ts:87](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/base58.ts#L87)

___

### encode

▸ **encode**(`source`): `string`

Encode Uint8Array as a base58 string.

**`example`**
```ts
const contractId = System.getContractId();
System.log("contractId: " + Base58.encode(contractId));
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `Uint8Array` |

#### Returns

`string`

#### Defined in

[assembly/util/base58.ts:23](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/base58.ts#L23)
