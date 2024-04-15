[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / SafeMath

# Namespace: SafeMath

## Table of contents

### Classes

- [SafeInteger](../classes/SafeMath.SafeInteger.md)

### Functions

- [add](SafeMath.md#add)
- [div](SafeMath.md#div)
- [mod](SafeMath.md#mod)
- [mul](SafeMath.md#mul)
- [sub](SafeMath.md#sub)
- [tryAdd](SafeMath.md#tryadd)
- [tryDiv](SafeMath.md#trydiv)
- [tryMod](SafeMath.md#trymod)
- [tryMul](SafeMath.md#trymul)
- [trySub](SafeMath.md#trysub)

## Functions

### add

▸ **add**<`T`\>(`a`, `b`, `message?`): `T`

Add 2 integers (unsigned or signed)

**`example`**
```ts
const res = SafeMath.add(1, 2);

// code here is not executed if the calculation above overflows/underflows
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `a` | `T` | `undefined` | unsigned or signed integer |
| `b` | `T` | `undefined` | unsigned or signed integer |
| `message` | `string` | `''` | message that will be logged if the calculation reverts |

#### Returns

`T`

reverts if overflow/underflow, result otherwise

#### Defined in

[assembly/util/safeMath.ts:77](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/safeMath.ts#L77)

___

### div

▸ **div**<`T`\>(`a`, `b`, `message?`): `T`

Divide 2 integers (unsigned or signed)

**`example`**
```ts
const res = SafeMath.div(1, 2);

// code here is not executed if the calculation above overflows/underflows
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `a` | `T` | `undefined` | unsigned or signed integer |
| `b` | `T` | `undefined` | unsigned or signed integer |
| `message` | `string` | `''` | message that will be logged if the calculation reverts |

#### Returns

`T`

reverts if overflow/underflow, result otherwise

#### Defined in

[assembly/util/safeMath.ts:338](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/safeMath.ts#L338)

___

### mod

▸ **mod**<`T`\>(`a`, `b`, `message?`): `T`

Calculate the modulo of 2 integers (unsigned or signed)

**`example`**
```ts
const res = SafeMath.mod(10, 2);

// code here is not executed if the calculation above overflows/underflows
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `a` | `T` | `undefined` | unsigned or signed integer |
| `b` | `T` | `undefined` | unsigned or signed integer |
| `message` | `string` | `''` | message that will be logged if the calculation reverts |

#### Returns

`T`

reverts if overflow/underflow, result otherwise

#### Defined in

[assembly/util/safeMath.ts:422](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/safeMath.ts#L422)

___

### mul

▸ **mul**<`T`\>(`a`, `b`, `message?`): `T`

Multiply 2  integers (unsigned or signed)

**`example`**
```ts
const res = SafeMath.mul(1, 2);

// code here is not executed if the calculation above overflows/underflows
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `a` | `T` | `undefined` | unsigned or signed integer |
| `b` | `T` | `undefined` | unsigned or signed integer |
| `message` | `string` | `''` | message that will be logged if the calculation reverts |

#### Returns

`T`

reverts if overflow/underflow, result otherwise

#### Defined in

[assembly/util/safeMath.ts:254](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/safeMath.ts#L254)

___

### sub

▸ **sub**<`T`\>(`a`, `b`, `message?`): `T`

Subtract 2 integers (unsigned or signed)

**`example`**
```ts
const res = SafeMath.sub(1, 2);

// code here is not executed if the calculation above overflows/underflows
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `a` | `T` | `undefined` | unsigned or signed integer |
| `b` | `T` | `undefined` | unsigned or signed integer |
| `message` | `string` | `''` | message that will be logged if the calculation reverts |

#### Returns

`T`

reverts if overflow/underflow, result otherwise

#### Defined in

[assembly/util/safeMath.ts:154](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/safeMath.ts#L154)

___

### tryAdd

▸ **tryAdd**<`T`\>(`a`, `b`): [`SafeInteger`](../classes/SafeMath.SafeInteger.md)<`T`\>

Try to add 2 integers (unsigned or signed)

**`example`**
```ts
const res = SafeMath.tryAdd(1, 2);

if (!res.error) {
  System.Log('1 + 2 = ' + c.value.toString());
} else {
  System.log('could not add');
}
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `T` | unsigned or signed integer |
| `b` | `T` | unsigned or signed integer |

#### Returns

[`SafeInteger`](../classes/SafeMath.SafeInteger.md)<`T`\>

SafeInteger

#### Defined in

[assembly/util/safeMath.ts:31](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/safeMath.ts#L31)

___

### tryDiv

▸ **tryDiv**<`T`\>(`a`, `b`): [`SafeInteger`](../classes/SafeMath.SafeInteger.md)<`T`\>

Try to divide 2 integers (unsigned or signed)

**`example`**
```ts
const res = SafeMath.tryDiv(2, 1);

if (!res.error) {
  System.Log('2 / 1 = ' + c.value.toString());
} else {
  System.log('could not divide');
}
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `T` | unsigned or signed integer |
| `b` | `T` | unsigned or signed integer |

#### Returns

[`SafeInteger`](../classes/SafeMath.SafeInteger.md)<`T`\>

SafeInteger

#### Defined in

[assembly/util/safeMath.ts:286](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/safeMath.ts#L286)

___

### tryMod

▸ **tryMod**<`T`\>(`a`, `b`): [`SafeInteger`](../classes/SafeMath.SafeInteger.md)<`T`\>

Try to calculate the modulo of 2 integers (unsigned or signed)

**`example`**
```ts
const res = SafeMath.tryMod(2, 1);

if (!res.error) {
  System.Log('2 % 1 = ' + c.value.toString());
} else {
  System.log('could not calculate modulo');
}
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `T` | unsigned or signed integer |
| `b` | `T` | unsigned or signed integer |

#### Returns

[`SafeInteger`](../classes/SafeMath.SafeInteger.md)<`T`\>

SafeInteger

#### Defined in

[assembly/util/safeMath.ts:370](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/safeMath.ts#L370)

___

### tryMul

▸ **tryMul**<`T`\>(`a`, `b`): [`SafeInteger`](../classes/SafeMath.SafeInteger.md)<`T`\>

Try to multiply 2 integers (unsigned or signed)

**`example`**
```ts
const res = SafeMath.tryMul(2, 1);

if (!res.error) {
  System.Log('2 * 1 = ' + c.value.toString());
} else {
  System.log('could not multiply');
}
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `T` | unsigned or signed integer |
| `b` | `T` | unsigned or signed integer |

#### Returns

[`SafeInteger`](../classes/SafeMath.SafeInteger.md)<`T`\>

SafeInteger

#### Defined in

[assembly/util/safeMath.ts:186](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/safeMath.ts#L186)

___

### trySub

▸ **trySub**<`T`\>(`a`, `b`): [`SafeInteger`](../classes/SafeMath.SafeInteger.md)<`T`\>

Try to subtract 2 integers (unsigned or signed)

**`example`**
```ts
const res = SafeMath.trySub(2, 1);

if (!res.error) {
  System.Log('2 - 1 = ' + c.value.toString());
} else {
  System.log('could not subtract');
}
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `T` | unsigned or signed integer |
| `b` | `T` | unsigned or signed integer |

#### Returns

[`SafeInteger`](../classes/SafeMath.SafeInteger.md)<`T`\>

SafeInteger

#### Defined in

[assembly/util/safeMath.ts:109](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/safeMath.ts#L109)
