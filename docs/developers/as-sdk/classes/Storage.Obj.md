[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [Storage](../modules/Storage.md) / Obj

# Class: Obj<TValue\>

[Storage](../modules/Storage.md).Obj

## Type parameters

| Name |
| :------ |
| `TValue` |

## Table of contents

### Constructors

- [constructor](Storage.Obj.md#constructor)

### Properties

- [defaultValue](Storage.Obj.md#defaultvalue)
- [space](Storage.Obj.md#space)
- [valueDecoder](Storage.Obj.md#valuedecoder)
- [valueEncoder](Storage.Obj.md#valueencoder)

### Methods

- [get](Storage.Obj.md#get)
- [put](Storage.Obj.md#put)
- [remove](Storage.Obj.md#remove)

## Constructors

### constructor

• **new Obj**<`TValue`\>(`contractId`, `spaceId`, `valueDecoder`, `valueEncoder`, `defaultValue?`, `system?`)

Initialize a Space object with TKey the type of the keys and TValue the type of the values

**`example`**
```ts
const contractId = Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe');
const SUPPLY_ID = 1;
const supply = new Storage.Obj(
  contractId,
  SUPPLY_ID,
  token.uint64.decode,
  token.uint64.encode,
  () => new token.uint64(0)
);
```

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `contractId` | `Uint8Array` | `undefined` | the id of the contract |
| `spaceId` | `number` | `undefined` | the id of the space |
| `valueDecoder` | (`reader`: `Reader`, `length`: `number`) => `TValue` | `undefined` | the protobuf decoder for the values |
| `valueEncoder` | (`message`: `TValue`, `writer`: `Writer`) => `void` | `undefined` | the protobuf encoder for the values |
| `defaultValue` | ``null`` \| () => ``null`` \| `TValue` | `null` | arrow function that returns the default value |
| `system` | `bool` | `false` | is system space |

#### Defined in

[assembly/util/storage.ts:521](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L521)

## Properties

### defaultValue

• `Private` **defaultValue**: ``null`` \| () => ``null`` \| `TValue`

#### Defined in

[assembly/util/storage.ts:496](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L496)

___

### space

• `Private` **space**: [`object_space`](chain.object_space.md)

#### Defined in

[assembly/util/storage.ts:495](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L495)

___

### valueDecoder

• `Private` **valueDecoder**: (`reader`: `Reader`, `length`: `number`) => `TValue`

#### Type declaration

▸ (`reader`, `length`): `TValue`

##### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

##### Returns

`TValue`

#### Defined in

[assembly/util/storage.ts:497](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L497)

___

### valueEncoder

• `Private` **valueEncoder**: (`message`: `TValue`, `writer`: `Writer`) => `void`

#### Type declaration

▸ (`message`, `writer`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `TValue` |
| `writer` | `Writer` |

##### Returns

`void`

#### Defined in

[assembly/util/storage.ts:498](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L498)

## Methods

### get

▸ **get**(): ``null`` \| `TValue`

Get the object from the space

**`example`**
```ts
const myobj = obj.get();
```

#### Returns

``null`` \| `TValue`

the object if exists, or the defaultValue
if exists, null otherwise

#### Defined in

[assembly/util/storage.ts:543](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L543)

___

### put

▸ **put**(`object`): `void`

Put an object in the space

**`example`**
```ts
obj.put(new test_object(42));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `TValue` | object to put |

#### Returns

`void`

#### Defined in

[assembly/util/storage.ts:557](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L557)

___

### remove

▸ **remove**(): `void`

Remove the object from the space

**`example`**
```ts
obj.remove();
```

#### Returns

`void`

#### Defined in

[assembly/util/storage.ts:568](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L568)
