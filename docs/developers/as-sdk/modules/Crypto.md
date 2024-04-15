[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / Crypto

# Namespace: Crypto

## Table of contents

### Enumerations

- [multicodec](../enums/Crypto.multicodec.md)

### Classes

- [Multihash](../classes/Crypto.Multihash.md)
- [UnsignedVarint](../classes/Crypto.UnsignedVarint.md)

### Variables

- [DEFAULT\_PREFIX](Crypto.md#default_prefix)

### Functions

- [addressFromPublicKey](Crypto.md#addressfrompublickey)

## Variables

### DEFAULT\_PREFIX

• `Const` **DEFAULT\_PREFIX**: `u8` = `0x00`

#### Defined in

[assembly/util/crypto.ts:4](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/crypto.ts#L4)

## Functions

### addressFromPublicKey

▸ **addressFromPublicKey**(`pubKey`, `prefix?`): `Uint8Array`

Decodes an address from a public key.

**`example`**
```ts
const recoveredKey = System.recoverPublicKey(signatureData, digest!);
const addr = Crypto.addressFromPublicKey(recoveredKey!);
System.log('recoveredKey (b58): ' + Base58.encode(addr));
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pubKey` | `Uint8Array` | `undefined` | public key as a Uint8Array. |
| `prefix` | `number` | `DEFAULT_PREFIX` | address prefix |

#### Returns

`Uint8Array`

Uint8Array

#### Defined in

[assembly/util/crypto.ts:132](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/crypto.ts#L132)
