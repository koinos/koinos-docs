[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [Storage](../modules/Storage.md) / ProtoMap

# Class: ProtoMap<TKey, TValue\>

[Storage](../modules/Storage.md).ProtoMap

## Type parameters

| Name |
| :------ |
| `TKey` |
| `TValue` |

## Table of contents

### Constructors

- [constructor](Storage.ProtoMap.md#constructor)

### Properties

- [keyDecoder](Storage.ProtoMap.md#keydecoder)
- [keyEncoder](Storage.ProtoMap.md#keyencoder)
- [map](Storage.ProtoMap.md#map)

### Methods

- [get](Storage.ProtoMap.md#get)
- [getManyObj](Storage.ProtoMap.md#getmanyobj)
- [getManyObjKeys](Storage.ProtoMap.md#getmanyobjkeys)
- [getManyObjValues](Storage.ProtoMap.md#getmanyobjvalues)
- [getNext](Storage.ProtoMap.md#getnext)
- [getPrev](Storage.ProtoMap.md#getprev)
- [has](Storage.ProtoMap.md#has)
- [put](Storage.ProtoMap.md#put)
- [remove](Storage.ProtoMap.md#remove)

## Constructors

### constructor

• **new ProtoMap**<`TKey`, `TValue`\>(`contractId`, `spaceId`, `keyDecoder`, `keyEncoder`, `valueDecoder`, `valueEncoder`, `defaultValue?`, `system?`)

Initialize a Space object with TKey (a protobuf type) the type of the keys and TValue the type of the values

**`example`**
```ts
const contractId = Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe');
const spaceId = 1;
const Objects = new Space.SpaceProtoKey<String, test_object>(contractId, spaceId, test_key.encode, test_object.decode, test_object.encode);
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
| `keyDecoder` | (`reader`: `Reader`, `length`: `number`) => `TKey` | `undefined` | - |
| `keyEncoder` | (`message`: `TKey`, `writer`: `Writer`) => `void` | `undefined` | the protobuf encoder for the keys |
| `valueDecoder` | (`reader`: `Reader`, `length`: `number`) => `TValue` | `undefined` | the protobuf decoder for the values |
| `valueEncoder` | (`message`: `TValue`, `writer`: `Writer`) => `void` | `undefined` | the protobuf encoder for the values |
| `defaultValue` | ``null`` \| () => ``null`` \| `TValue` | `null` | - |
| `system` | `bool` | `false` | is system space |

#### Defined in

[assembly/util/storage.ts:301](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L301)

## Properties

### keyDecoder

• `Private` **keyDecoder**: (`reader`: `Reader`, `length`: `number`) => `TKey`

#### Type declaration

▸ (`reader`, `length`): `TKey`

##### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

##### Returns

`TKey`

#### Defined in

[assembly/util/storage.ts:283](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L283)

___

### keyEncoder

• `Private` **keyEncoder**: (`message`: `TKey`, `writer`: `Writer`) => `void`

#### Type declaration

▸ (`message`, `writer`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `TKey` |
| `writer` | `Writer` |

##### Returns

`void`

#### Defined in

[assembly/util/storage.ts:284](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L284)

___

### map

• `Private` **map**: [`Map`](Storage.Map.md)<`Uint8Array`, `TValue`\>

#### Defined in

[assembly/util/storage.ts:282](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L282)

## Methods

### get

▸ **get**(`key`): ``null`` \| `TValue`

Get an object from the space

**`example`**
```ts
const obj = Objects.get(new test_key(1));

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

[assembly/util/storage.ts:345](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L345)

___

### getManyObj

▸ **getManyObj**(`offsetKey`, `limit?`, `direction?`): [`ProtoDatabaseObject`](System.ProtoDatabaseObject.md)<`TValue`\>[]

Get many objects from the space

**`example`**
```ts
const objs = Objects.getManyObj(new test_key(1), 10, Space.Direction.Descending);

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

[assembly/util/storage.ts:365](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L365)

___

### getManyObjKeys

▸ **getManyObjKeys**(`offsetKey`, `limit?`, `direction?`): `TKey`[]

Get many keys from the space

**`example`**
```ts
const keys = Objects.getManyObjKeys(new test_key(1), 10, Space.Direction.Descending);

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

[assembly/util/storage.ts:405](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L405)

___

### getManyObjValues

▸ **getManyObjValues**(`offsetKey`, `limit?`, `direction?`): `TValue`[]

Get many values from the space

**`example`**
```ts
const values = Objects.getManyObjValues(new test_key(1), 10, Space.Direction.Descending);

for (let index = 0; index < values.length; index++) {
  const value = values[index];
}
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `offsetKey` | `TKey` | `undefined` | key used as the offset |
| `limit` | `number` | `i32.MAX_VALUE` | number of objects to return |
| `direction` | [`Direction`](../enums/Storage.Direction.md) | `Direction.Ascending` | direction of the get, Ascending or Descending |

#### Returns

`TValue`[]

an array with the objects retrieved

#### Defined in

[assembly/util/storage.ts:385](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L385)

___

### getNext

▸ **getNext**(`key`): ``null`` \| [`ProtoDatabaseObject`](System.ProtoDatabaseObject.md)<`TValue`\>

Get the next object from the space

**`example`**
```ts
const obj = Objects.getNext(new test_key(1));

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

[assembly/util/storage.ts:439](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L439)

___

### getPrev

▸ **getPrev**(`key`): ``null`` \| [`ProtoDatabaseObject`](System.ProtoDatabaseObject.md)<`TValue`\>

Get the previous object from the space

**`example`**
```ts
const obj = Objects.getPrev(new test_key(1));

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

[assembly/util/storage.ts:458](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L458)

___

### has

▸ **has**(`key`): `boolean`

Check if `key` exists in the space

**`example`**
```ts
const exists = Objects.has(new test_key(1));

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

[assembly/util/storage.ts:327](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L327)

___

### put

▸ **put**(`key`, `object`): `void`

Put an object in the space

**`example`**
```ts
const nbBytesWritten = Objects.put(new test_key(1), new test_object(42));

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

[assembly/util/storage.ts:475](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L475)

___

### remove

▸ **remove**(`key`): `void`

Remove an object from the space

**`example`**
```ts
Objects.remove(new test_key(1));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `TKey` | key of the object |

#### Returns

`void`

#### Defined in

[assembly/util/storage.ts:488](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/storage.ts#L488)
