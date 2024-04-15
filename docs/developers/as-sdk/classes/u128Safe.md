[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / u128Safe

# Class: u128Safe

## Hierarchy

- [`u128`](u128.md)

  ↳ **`u128Safe`**

## Table of contents

### Constructors

- [constructor](u128Safe.md#constructor)

### Properties

- [hi](u128Safe.md#hi)
- [lo](u128Safe.md#lo)

### Accessors

- [Max](u128Safe.md#max)
- [Min](u128Safe.md#min)
- [One](u128Safe.md#one)
- [Zero](u128Safe.md#zero)

### Methods

- [as](u128Safe.md#as)
- [clone](u128Safe.md#clone)
- [isZero](u128Safe.md#iszero)
- [neg](u128Safe.md#neg)
- [not](u128Safe.md#not)
- [pos](u128Safe.md#pos)
- [postDec](u128Safe.md#postdec)
- [postInc](u128Safe.md#postinc)
- [preDec](u128Safe.md#predec)
- [preInc](u128Safe.md#preinc)
- [set](u128Safe.md#set)
- [setI32](u128Safe.md#seti32)
- [setI64](u128Safe.md#seti64)
- [setU32](u128Safe.md#setu32)
- [setU64](u128Safe.md#setu64)
- [sqr](u128Safe.md#sqr)
- [toBool](u128Safe.md#tobool)
- [toBytes](u128Safe.md#tobytes)
- [toF32](u128Safe.md#tof32)
- [toF64](u128Safe.md#tof64)
- [toI128](u128Safe.md#toi128)
- [toI256](u128Safe.md#toi256)
- [toI32](u128Safe.md#toi32)
- [toI64](u128Safe.md#toi64)
- [toStaticBytes](u128Safe.md#tostaticbytes)
- [toString](u128Safe.md#tostring)
- [toU128](u128Safe.md#tou128)
- [toU256](u128Safe.md#tou256)
- [toU32](u128Safe.md#tou32)
- [toU64](u128Safe.md#tou64)
- [toUint8Array](u128Safe.md#touint8array)
- [toUnchecked](u128Safe.md#tounchecked)
- [add](u128Safe.md#add)
- [and](u128Safe.md#and)
- [clz](u128Safe.md#clz)
- [ctz](u128Safe.md#ctz)
- [div](u128Safe.md#div)
- [div10](u128Safe.md#div10)
- [eq](u128Safe.md#eq)
- [from](u128Safe.md#from)
- [fromBits](u128Safe.md#frombits)
- [fromBool](u128Safe.md#frombool)
- [fromBytes](u128Safe.md#frombytes)
- [fromBytesBE](u128Safe.md#frombytesbe)
- [fromBytesLE](u128Safe.md#frombytesle)
- [fromF32](u128Safe.md#fromf32)
- [fromF64](u128Safe.md#fromf64)
- [fromI128](u128Safe.md#fromi128)
- [fromI128Safe](u128Safe.md#fromi128safe)
- [fromI256](u128Safe.md#fromi256)
- [fromI256Safe](u128Safe.md#fromi256safe)
- [fromI32](u128Safe.md#fromi32)
- [fromI64](u128Safe.md#fromi64)
- [fromString](u128Safe.md#fromstring)
- [fromU128](u128Safe.md#fromu128)
- [fromU256](u128Safe.md#fromu256)
- [fromU32](u128Safe.md#fromu32)
- [fromU64](u128Safe.md#fromu64)
- [fromUint8ArrayBE](u128Safe.md#fromuint8arraybe)
- [fromUint8ArrayLE](u128Safe.md#fromuint8arrayle)
- [ge](u128Safe.md#ge)
- [gt](u128Safe.md#gt)
- [isEmpty](u128Safe.md#isempty)
- [le](u128Safe.md#le)
- [lt](u128Safe.md#lt)
- [mul](u128Safe.md#mul)
- [muldiv](u128Safe.md#muldiv)
- [ne](u128Safe.md#ne)
- [or](u128Safe.md#or)
- [ord](u128Safe.md#ord)
- [popcnt](u128Safe.md#popcnt)
- [pow](u128Safe.md#pow)
- [rem](u128Safe.md#rem)
- [rem10](u128Safe.md#rem10)
- [rotl](u128Safe.md#rotl)
- [rotr](u128Safe.md#rotr)
- [shl](u128Safe.md#shl)
- [shr](u128Safe.md#shr)
- [shr\_u](u128Safe.md#shr_u)
- [sqr](u128Safe.md#sqr-1)
- [sqrt](u128Safe.md#sqrt)
- [sub](u128Safe.md#sub)
- [xor](u128Safe.md#xor)

## Constructors

### constructor

• **new u128Safe**(`lo?`, `hi?`)

Create 128-bit unsigned integer from 64-bit parts

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `lo` | `number` | `0` | low  64-bit part of 128-bit unsigned integer |
| `hi` | `number` | `0` | high 64-bit part of 128-bit unsigned integer |

#### Inherited from

[u128](u128.md).[constructor](u128.md#constructor)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:185

## Properties

### hi

• **hi**: `number` = `0`

#### Inherited from

[u128](u128.md).[hi](u128.md#hi)

___

### lo

• **lo**: `number` = `0`

#### Inherited from

[u128](u128.md).[lo](u128.md#lo)

## Accessors

### Max

• `Static` `get` **Max**(): [`u128Safe`](u128Safe.md)

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

U128.Max

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:22

___

### Min

• `Static` `get` **Min**(): [`u128Safe`](u128Safe.md)

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

U128.Min

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:21

___

### One

• `Static` `get` **One**(): [`u128Safe`](u128Safe.md)

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

U128.One

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:20

___

### Zero

• `Static` `get` **Zero**(): [`u128Safe`](u128Safe.md)

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

U128.Zero

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:19

## Methods

### as

▸ **as**<`T`\>(): `T`

Convert to generic type `T`. Useful inside other generics methods

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`T`

type of `T`

#### Overrides

[u128](u128.md).[as](u128.md#as)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:325

___

### clone

▸ **clone**(): [`u128Safe`](u128Safe.md)

Return copy of current 128-bit value

#### Returns

[`u128Safe`](u128Safe.md)

128-bit unsigned integer

#### Overrides

[u128](u128.md).[clone](u128.md#clone)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:355

___

### isZero

▸ **isZero**(): `bool`

#### Returns

`bool`

#### Inherited from

[u128](u128.md).[isZero](u128.md#iszero)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:226

___

### neg

▸ **neg**(): [`u128`](u128.md)

#### Returns

[`u128`](u128.md)

#### Inherited from

[u128](u128.md).[neg](u128.md#neg)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:241

___

### not

▸ **not**(): [`u128`](u128.md)

#### Returns

[`u128`](u128.md)

#### Inherited from

[u128](u128.md).[not](u128.md#not)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:231

___

### pos

▸ **pos**(): [`u128`](u128.md)

#### Returns

[`u128`](u128.md)

#### Inherited from

[u128](u128.md).[pos](u128.md#pos)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:236

___

### postDec

▸ **postDec**(): [`u128Safe`](u128Safe.md)

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[postDec](u128.md#postdec)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:219

___

### postInc

▸ **postInc**(): [`u128Safe`](u128Safe.md)

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[postInc](u128.md#postinc)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:214

___

### preDec

▸ **preDec**(): [`u128Safe`](u128Safe.md)

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[preDec](u128.md#predec)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:205

___

### preInc

▸ **preInc**(): [`u128Safe`](u128Safe.md)

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[preInc](u128.md#preinc)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:196

___

### set

▸ **set**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`u128`](u128.md) |

#### Returns

[`u128Safe`](u128Safe.md)

#### Inherited from

[u128](u128.md).[set](u128.md#set)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:191

___

### setI32

▸ **setI32**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Inherited from

[u128](u128.md).[setI32](u128.md#seti32)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:212

___

### setI64

▸ **setI64**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Inherited from

[u128](u128.md).[setI64](u128.md#seti64)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:198

___

### setU32

▸ **setU32**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Inherited from

[u128](u128.md).[setU32](u128.md#setu32)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:219

___

### setU64

▸ **setU64**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Inherited from

[u128](u128.md).[setU64](u128.md#setu64)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:205

___

### sqr

▸ **sqr**(): [`u128Safe`](u128Safe.md)

Calculate inplace squared 128-bit unsigned integer (this ** 2)

#### Returns

[`u128Safe`](u128Safe.md)

128-bit unsigned integer

#### Inherited from

[u128](u128.md).[sqr](u128.md#sqr)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:655

___

### toBool

▸ **toBool**(): `bool`

Convert to 1-bit boolean

#### Returns

`bool`

1-bit boolean

#### Inherited from

[u128](u128.md).[toBool](u128.md#tobool)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:812

___

### toBytes

▸ **toBytes**(`bigEndian?`): `number`[]

Convert to byte array

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bigEndian` | `bool` | `false` | Little or Big Endian? Default: false |

#### Returns

`number`[]

Array of bytes

#### Inherited from

[u128](u128.md).[toBytes](u128.md#tobytes)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:900

___

### toF32

▸ **toF32**(): `number`

Convert to 32-bit float number

#### Returns

`number`

32-bit float

#### Inherited from

[u128](u128.md).[toF32](u128.md#tof32)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:830

___

### toF64

▸ **toF64**(): `number`

Convert to 64-bit float number in deteministic way

#### Returns

`number`

64-bit float

#### Inherited from

[u128](u128.md).[toF64](u128.md#tof64)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:821

___

### toI128

▸ **toI128**(): `i128`

Convert to 128-bit signed integer

#### Returns

`i128`

128-bit signed integer

#### Inherited from

[u128](u128.md).[toI128](u128.md#toi128)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:755

___

### toI256

▸ **toI256**(): `i256`

Convert to 256-bit signed integer

#### Returns

`i256`

256-bit signed integer

#### Inherited from

[u128](u128.md).[toI256](u128.md#toi256)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:737

___

### toI32

▸ **toI32**(): `number`

Convert to 32-bit signed integer

#### Returns

`number`

32-bit signed integer

#### Inherited from

[u128](u128.md).[toI32](u128.md#toi32)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:794

___

### toI64

▸ **toI64**(): `number`

Convert to 64-bit signed integer

#### Returns

`number`

64-bit signed integer

#### Inherited from

[u128](u128.md).[toI64](u128.md#toi64)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:773

___

### toStaticBytes

▸ **toStaticBytes**(`bigEndian?`): `StaticArray`<`number`\>

Convert to byte static array

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bigEndian` | `bool` | `false` | Little or Big Endian? Default: false |

#### Returns

`StaticArray`<`number`\>

StaticArray of bytes

#### Inherited from

[u128](u128.md).[toStaticBytes](u128.md#tostaticbytes)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:912

___

### toString

▸ **toString**(`radix?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `radix` | `number` | `10` |

#### Returns

`string`

#### Inherited from

[u128](u128.md).[toString](u128.md#tostring)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:938

___

### toU128

▸ **toU128**(): [`u128Safe`](u128Safe.md)

Convert to 128-bit unsigned integer

#### Returns

[`u128Safe`](u128Safe.md)

128-bit unsigned integer

#### Inherited from

[u128](u128.md).[toU128](u128.md#tou128)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:764

___

### toU256

▸ **toU256**(): `u256`

Convert to 256-bit unsigned integer

#### Returns

`u256`

256-bit unsigned integer

#### Inherited from

[u128](u128.md).[toU256](u128.md#tou256)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:746

___

### toU32

▸ **toU32**(): `number`

Convert to 32-bit unsigned integer

#### Returns

`number`

32-bit unsigned integer

#### Inherited from

[u128](u128.md).[toU32](u128.md#tou32)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:803

___

### toU64

▸ **toU64**(): `number`

Convert to 64-bit unsigned integer

#### Returns

`number`

64-bit unsigned integer

#### Inherited from

[u128](u128.md).[toU64](u128.md#tou64)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:785

___

### toUint8Array

▸ **toUint8Array**(`bigEndian?`): `Uint8Array`

Convert to Uint8Array

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bigEndian` | `bool` | `false` | Little or Big Endian? Default: false |

#### Returns

`Uint8Array`

Uint8Array

#### Inherited from

[u128](u128.md).[toUint8Array](u128.md#touint8array)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:924

___

### toUnchecked

▸ **toUnchecked**(): [`u128`](u128.md)

#### Returns

[`u128`](u128.md)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:320

___

### add

▸ `Static` **add**(`a`, `b`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`u128Safe`](u128Safe.md) |
| `b` | [`u128Safe`](u128Safe.md) |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[add](u128.md#add)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:224

___

### and

▸ `Static` **and**(`a`, `b`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`u128Safe`](u128Safe.md) |
| `b` | [`u128Safe`](u128Safe.md) |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[and](u128.md#and)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:166

___

### clz

▸ `Static` **clz**(`value`): `number`

Compute bit count of leading zeros

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`u128`](u128.md) | 128-bit unsigned integer |

#### Returns

`number`

32-bit signed integer

#### Inherited from

[u128](u128.md).[clz](u128.md#clz)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:627

___

### ctz

▸ `Static` **ctz**(`value`): `number`

Compute bit count of trailing zeros

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`u128`](u128.md) | 128-bit unsigned integer |

#### Returns

`number`

32-bit signed integer

#### Inherited from

[u128](u128.md).[ctz](u128.md#ctz)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:637

___

### div

▸ `Static` **div**(`a`, `b`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`u128Safe`](u128Safe.md) |
| `b` | [`u128Safe`](u128Safe.md) |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[div](u128.md#div)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:280

___

### div10

▸ `Static` **div10**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`u128Safe`](u128Safe.md) |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[div10](u128.md#div10)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:298

___

### eq

▸ `Static` **eq**(`a`, `b`): `bool`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`u128`](u128.md) |
| `b` | [`u128`](u128.md) |

#### Returns

`bool`

#### Inherited from

[u128](u128.md).[eq](u128.md#eq)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:562

___

### from

▸ `Static` **from**<`T`\>(`value`): [`u128Safe`](u128Safe.md)

Create 128-bit unsigned integer from generic type T

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`u128Safe`](u128Safe.md)

128-bit unsigned integer

#### Overrides

[u128](u128.md).[from](u128.md#from)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:130

___

### fromBits

▸ `Static` **fromBits**(`lo1`, `lo2`, `hi1`, `hi2`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `lo1` | `number` |
| `lo2` | `number` |
| `hi1` | `number` |
| `hi2` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromBits](u128.md#frombits)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:95

___

### fromBool

▸ `Static` **fromBool**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `bool` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromBool](u128.md#frombool)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:90

___

### fromBytes

▸ `Static` **fromBytes**<`T`\>(`array`, `bigEndian?`): [`u128Safe`](u128Safe.md)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `array` | `T` | `undefined` |
| `bigEndian` | `bool` | `false` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromBytes](u128.md#frombytes)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:100

___

### fromBytesBE

▸ `Static` **fromBytesBE**(`array`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `number`[] |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromBytesBE](u128.md#frombytesbe)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:110

___

### fromBytesLE

▸ `Static` **fromBytesLE**(`array`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `number`[] |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromBytesLE](u128.md#frombytesle)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:105

___

### fromF32

▸ `Static` **fromF32**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromF32](u128.md#fromf32)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:75

___

### fromF64

▸ `Static` **fromF64**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromF64](u128.md#fromf64)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:70

___

### fromI128

▸ `Static` **fromI128**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `i128` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromI128](u128.md#fromi128)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:45

___

### fromI128Safe

▸ `Static` **fromI128Safe**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `i128` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:50

___

### fromI256

▸ `Static` **fromI256**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `i256` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromI256](u128.md#fromi256)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:30

___

### fromI256Safe

▸ `Static` **fromI256Safe**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `i256` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:35

___

### fromI32

▸ `Static` **fromI32**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromI32](u128.md#fromi32)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:80

___

### fromI64

▸ `Static` **fromI64**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromI64](u128.md#fromi64)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:60

___

### fromString

▸ `Static` **fromString**(`value`, `radix?`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `string` | `undefined` |
| `radix` | `number` | `10` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromString](u128.md#fromstring)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:25

___

### fromU128

▸ `Static` **fromU128**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`u128Safe`](u128Safe.md) |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromU128](u128.md#fromu128)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:55

___

### fromU256

▸ `Static` **fromU256**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `u256` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromU256](u128.md#fromu256)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:40

___

### fromU32

▸ `Static` **fromU32**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromU32](u128.md#fromu32)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:85

___

### fromU64

▸ `Static` **fromU64**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromU64](u128.md#fromu64)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:65

___

### fromUint8ArrayBE

▸ `Static` **fromUint8ArrayBE**(`array`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `Uint8Array` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromUint8ArrayBE](u128.md#fromuint8arraybe)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:120

___

### fromUint8ArrayLE

▸ `Static` **fromUint8ArrayLE**(`array`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `Uint8Array` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[fromUint8ArrayLE](u128.md#fromuint8arrayle)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:115

___

### ge

▸ `Static` **ge**(`a`, `b`): `bool`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`u128`](u128.md) |
| `b` | [`u128`](u128.md) |

#### Returns

`bool`

#### Inherited from

[u128](u128.md).[ge](u128.md#ge)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:589

___

### gt

▸ `Static` **gt**(`a`, `b`): `bool`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`u128`](u128.md) |
| `b` | [`u128`](u128.md) |

#### Returns

`bool`

#### Inherited from

[u128](u128.md).[gt](u128.md#gt)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:578

___

### isEmpty

▸ `Static` **isEmpty**(`value`): `bool`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`u128`](u128.md) |

#### Returns

`bool`

#### Inherited from

[u128](u128.md).[isEmpty](u128.md#isempty)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:277

___

### le

▸ `Static` **le**(`a`, `b`): `bool`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`u128`](u128.md) |
| `b` | [`u128`](u128.md) |

#### Returns

`bool`

#### Inherited from

[u128](u128.md).[le](u128.md#le)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:584

___

### lt

▸ `Static` **lt**(`a`, `b`): `bool`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`u128`](u128.md) |
| `b` | [`u128`](u128.md) |

#### Returns

`bool`

#### Inherited from

[u128](u128.md).[lt](u128.md#lt)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:572

___

### mul

▸ `Static` **mul**(`a`, `b`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`u128Safe`](u128Safe.md) |
| `b` | [`u128Safe`](u128Safe.md) |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[mul](u128.md#mul)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:246

___

### muldiv

▸ `Static` **muldiv**(`number`, `numerator`, `denominator`): [`u128Safe`](u128Safe.md)

Calculate multiply and division as `number * numerator / denominator`
without overflow in multiplication part.

#### Parameters

| Name | Type |
| :------ | :------ |
| `number` | [`u128Safe`](u128Safe.md) |
| `numerator` | [`u128Safe`](u128Safe.md) |
| `denominator` | [`u128Safe`](u128Safe.md) |

#### Returns

[`u128Safe`](u128Safe.md)

128-bit unsigned integer

#### Overrides

[u128](u128.md).[muldiv](u128.md#muldiv)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:314

___

### ne

▸ `Static` **ne**(`a`, `b`): `bool`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`u128`](u128.md) |
| `b` | [`u128`](u128.md) |

#### Returns

`bool`

#### Inherited from

[u128](u128.md).[ne](u128.md#ne)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:567

___

### or

▸ `Static` **or**(`a`, `b`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`u128Safe`](u128Safe.md) |
| `b` | [`u128Safe`](u128Safe.md) |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[or](u128.md#or)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:156

___

### ord

▸ `Static` **ord**(`a`, `b`): `number`

Get ordering
if a > b then result is  1
if a < b then result is -1
if a = b then result is  0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | [`u128`](u128.md) | 128-bit unsigned integer |
| `b` | [`u128`](u128.md) | 128-bit unsigned integer |

#### Returns

`number`

32-bit signed integer

#### Inherited from

[u128](u128.md).[ord](u128.md#ord)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:603

___

### popcnt

▸ `Static` **popcnt**(`value`): `number`

Compute count of set (populated) bits

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`u128`](u128.md) | 128-bit unsigned integer |

#### Returns

`number`

32-bit signed integer

#### Inherited from

[u128](u128.md).[popcnt](u128.md#popcnt)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:617

___

### pow

▸ `Static` **pow**(`base`, `exponent`): [`u128Safe`](u128Safe.md)

Calculate power of base with exponent

#### Parameters

| Name | Type |
| :------ | :------ |
| `base` | [`u128Safe`](u128Safe.md) |
| `exponent` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

128-bit unsigned integer

#### Overrides

[u128](u128.md).[pow](u128.md#pow)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:285

___

### rem

▸ `Static` **rem**(`a`, `b`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`u128Safe`](u128Safe.md) |
| `b` | [`u128Safe`](u128Safe.md) |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[rem](u128.md#rem)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:293

___

### rem10

▸ `Static` **rem10**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`u128Safe`](u128Safe.md) |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[rem10](u128.md#rem10)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:303

___

### rotl

▸ `Static` **rotl**(`value`, `shift`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`u128Safe`](u128Safe.md) |
| `shift` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[rotl](u128.md#rotl)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:186

___

### rotr

▸ `Static` **rotr**(`value`, `shift`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`u128Safe`](u128Safe.md) |
| `shift` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[rotr](u128.md#rotr)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:191

___

### shl

▸ `Static` **shl**(`value`, `shift`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`u128Safe`](u128Safe.md) |
| `shift` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[shl](u128.md#shl)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:171

___

### shr

▸ `Static` **shr**(`value`, `shift`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`u128Safe`](u128Safe.md) |
| `shift` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[shr](u128.md#shr)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:176

___

### shr\_u

▸ `Static` **shr_u**(`value`, `shift`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`u128Safe`](u128Safe.md) |
| `shift` | `number` |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[shr_u](u128.md#shr_u)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:181

___

### sqr

▸ `Static` **sqr**(`value`): [`u128`](u128.md)

Calculate squared value (value ** 2)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`u128`](u128.md) | 128-bit unsigned integer |

#### Returns

[`u128`](u128.md)

128-bit unsigned integer

#### Inherited from

[u128](u128.md).[sqr](u128.md#sqr-1)

#### Defined in

node_modules/as-bignum/assembly/integer/u128.ts:647

___

### sqrt

▸ `Static` **sqrt**(`value`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`u128Safe`](u128Safe.md) |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[sqrt](u128.md#sqrt)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:309

___

### sub

▸ `Static` **sub**(`a`, `b`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`u128Safe`](u128Safe.md) |
| `b` | [`u128Safe`](u128Safe.md) |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[sub](u128.md#sub)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:238

___

### xor

▸ `Static` **xor**(`a`, `b`): [`u128Safe`](u128Safe.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`u128Safe`](u128Safe.md) |
| `b` | [`u128Safe`](u128Safe.md) |

#### Returns

[`u128Safe`](u128Safe.md)

#### Overrides

[u128](u128.md).[xor](u128.md#xor)

#### Defined in

node_modules/as-bignum/assembly/integer/safe/u128.ts:161
