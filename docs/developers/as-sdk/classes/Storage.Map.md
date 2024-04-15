[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [Storage](../modules/Storage.md) / Map

# Class: Map<TKey, TValue\>

[Storage](../modules/Storage.md).Map

## Type parameters

| Name |
| :------ |
| `TKey` |
| `TValue` |

## Table of contents

### Constructors

- [constructor](Storage.Map.md#constructor)

### Properties

- [defaultValue](Storage.Map.md#defaultvalue)
- [space](Storage.Map.md#space)
- [valueDecoder](Storage.Map.md#valuedecoder)
- [valueEncoder](Storage.Map.md#valueencoder)

### Methods

- [get](Storage.Map.md#get)
- [getMany](Storage.Map.md#getmany)
- [getManyKeys](Storage.Map.md#getmanykeys)
- [getManyValues](Storage.Map.md#getmanyvalues)
- [getNext](Storage.Map.md#getnext)
- [getPrev](Storage.Map.md#getprev)
- [has](Storage.Map.md#has)
- [put](Storage.Map.md#put)
- [remove](Storage.Map.md#remove)

## Constructors

### constructor

• **new Map**<`TKey`, `TValue`\>(`contractId`, `spaceId`, `valueDecoder`, `valueEncoder`, `defaultValue?`, `system?`)

Initialize a Space object with TKey the type of the keys and TValue the type of the values

**`example`**
```ts
const contractId = Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe');
const BALANCES_SPACE_ID = 1;
const balances = new Storage.Map(
  this.contractId,
  BALANCES_SPACE_ID,
  token.uint64.decode,
  token.uint64.encode,
  () => new token.uint64(0)
);
```

#### Type parameters

| Name |
| :------ |
| `TKey` |
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

[assembly/util/storage.ts:41](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L41)

## Properties

### defaultValue

• `Private` **defaultValue**: ``null`` \| () => ``null`` \| `TValue`

#### Defined in

[assembly/util/storage.ts:16](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L16)

___

### space

• `Private` **space**: [`object_space`](chain.object_space.md)

#### Defined in

[assembly/util/storage.ts:15](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L15)

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

[assembly/util/storage.ts:17](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L17)

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

[assembly/util/storage.ts:18](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L18)

## Methods

### get

▸ **get**(`key`): ``null`` \| `TValue`

Get an object from the space

**`example`**
```ts
const obj = Objects.get('key1');

if (obj != null) {
  ...
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `TKey` | key to get |

#### Returns

``null`` \| `TValue`

the object if exists, null otherwise

#### Defined in

[assembly/util/storage.ts:84](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L84)

___

### getMany

▸ **getMany**(`offsetKey`, `limit?`, `direction?`): [`ProtoDatabaseObject`](System.ProtoDatabaseObject.md)<`TValue`\>[]

Get many objects from the space

**`example`**
```ts
const objs = Objects.getMany('key1', 10, Space.Direction.Descending);

for (let index = 0; index < objs.length; index++) {
  const obj = objs[index];
}
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `offsetKey` | `TKey` | `undefined` | key used as the offset |
| `limit` | `number` | `i32.MAX_VALUE` | number of objects to return |
| `direction` | [`Direction`](../enums/Storage.Direction.md) | `Direction.Ascending` | direction of the get, Ascending or Descending |

#### Returns

[`ProtoDatabaseObject`](System.ProtoDatabaseObject.md)<`TValue`\>[]

an array with the objects retrieved

#### Defined in

[assembly/util/storage.ts:105](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L105)

___

### getManyKeys

▸ **getManyKeys**(`offsetKey`, `limit?`, `direction?`): `TKey`[]

Get many keys from the space

**`example`**
```ts
const keys = Objects.getManyKeys('key1', 10, Space.Direction.Descending);

for (let index = 0; index < keys.length; index++) {
  const key = keys[index];
}
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `offsetKey` | `TKey` | `undefined` | key used as the offset |
| `limit` | `number` | `i32.MAX_VALUE` | number of keys to return |
| `direction` | [`Direction`](../enums/Storage.Direction.md) | `Direction.Ascending` | direction of the get, Ascending or Descending |

#### Returns

`TKey`[]

an array with the keys retrieved

#### Defined in

[assembly/util/storage.ts:145](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L145)

___

### getManyValues

▸ **getManyValues**(`offsetKey`, `limit?`, `direction?`): `TValue`[]

Get many values from the space

**`example`**
```ts
const values = Objects.getManyValues('key1', 10, Space.Direction.Descending);

for (let index = 0; index < values.length; index++) {
  const values = values[index];
}
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `offsetKey` | `TKey` | `undefined` | key used as the offset |
| `limit` | `number` | `i32.MAX_VALUE` | number of values to return |
| `direction` | [`Direction`](../enums/Storage.Direction.md) | `Direction.Ascending` | direction of the get, Ascending or Descending |

#### Returns

`TValue`[]

an array with the values retrieved

#### Defined in

[assembly/util/storage.ts:191](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L191)

___

### getNext

▸ **getNext**(`key`): ``null`` \| [`ProtoDatabaseObject`](System.ProtoDatabaseObject.md)<`TValue`\>

Get the next object from the space

**`example`**
```ts
const obj = Objects.getNext('key1');

if (obj != null) {
  const key = obj.key;
  const val = obj.value;
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `TKey` | key to get next |

#### Returns

``null`` \| [`ProtoDatabaseObject`](System.ProtoDatabaseObject.md)<`TValue`\>

a System.ProtoDatabaseObject if exists, null otherwise

#### Defined in

[assembly/util/storage.ts:230](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L230)

___

### getPrev

▸ **getPrev**(`key`): ``null`` \| [`ProtoDatabaseObject`](System.ProtoDatabaseObject.md)<`TValue`\>

Get the previous object from the space

**`example`**
```ts
const obj = Objects.getPrev('key1');

if (obj != null) {
  const key = obj.key;
  const val = obj.value;
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `TKey` | key to get previous |

#### Returns

``null`` \| [`ProtoDatabaseObject`](System.ProtoDatabaseObject.md)<`TValue`\>

a System.ProtoDatabaseObject if exists, null otherwise

#### Defined in

[assembly/util/storage.ts:248](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L248)

___

### has

▸ **has**(`key`): `boolean`

Check if `key` exists in the space

**`example`**
```ts
const exists = Objects.has('key1');

if (exists) {
  ...
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `TKey` | key to check |

#### Returns

`boolean`

#### Defined in

[assembly/util/storage.ts:66](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L66)

___

### put

▸ **put**(`key`, `object`): `void`

Put an object in the space

**`example`**
```ts
const nbBytesWritten = Objects.put('key1', new test_object(42));

System.log(nbBytesWritten.toString());
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `TKey` | key of the object |
| `object` | `TValue` | - |

#### Returns

`void`

number of bytes that were written in the space

#### Defined in

[assembly/util/storage.ts:264](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L264)

___

### remove

▸ **remove**(`key`): `void`

Remove an object from the space

**`example`**
```ts
Objects.remove('key1');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `TKey` | key of the object |

#### Returns

`void`

#### Defined in

[assembly/util/storage.ts:276](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L276)
