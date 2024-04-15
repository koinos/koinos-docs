[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / Token

# Class: Token

## Table of contents

### Constructors

- [constructor](Token.md#constructor)

### Properties

- [\_contractId](Token.md#_contractid)

### Methods

- [balanceOf](Token.md#balanceof)
- [burn](Token.md#burn)
- [decimals](Token.md#decimals)
- [mint](Token.md#mint)
- [name](Token.md#name)
- [symbol](Token.md#symbol)
- [totalSupply](Token.md#totalsupply)
- [transfer](Token.md#transfer)

## Constructors

### constructor

• **new Token**(`contractId`)

Create an instance of a token contract

**`example`**
```ts
 const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractId` | `Uint8Array` |

#### Defined in

[assembly/util/token.ts:26](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/token.ts#L26)

## Properties

### \_contractId

• **\_contractId**: `Uint8Array`

#### Defined in

[assembly/util/token.ts:17](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/token.ts#L17)

## Methods

### balanceOf

▸ **balanceOf**(`owner`): `number`

Get the balance of the `owner` account

**`example`**
```ts
 const ownerAccount = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqE');
 const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
 const balance = token.balanceOf(ownerAccount);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `Uint8Array` | owner account |

#### Returns

`number`

u64 balance

#### Defined in

[assembly/util/token.ts:117](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/token.ts#L117)

___

### burn

▸ **burn**(`from`, `amount`): `bool`

Burn tokens from `from`

**`example`**
```ts
 const from = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
 const value = 12376182;

 const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
 const success = token.burn(from, value);
 if (success) {
   // transfer succeeded
 } else {
   // transfer failed
 }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `Uint8Array` | from account |
| `amount` | `number` | - |

#### Returns

`bool`

bool burn succeeded or not

#### Defined in

[assembly/util/token.ts:198](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/token.ts#L198)

___

### decimals

▸ **decimals**(): `number`

Get the decimal of the token

**`example`**
```ts
 const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
 const decimals = token.decimals();
```

#### Returns

`number`

u32

#### Defined in

[assembly/util/token.ts:77](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/token.ts#L77)

___

### mint

▸ **mint**(`to`, `amount`): `bool`

Mint tokens to `to` account

**`example`**
```ts
 const to = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqA');
 const value = 12376182;

 const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
 const success = token.mint(to, value);
 if (success) {
   // mint succeeded
 } else {
   // mint failed
 }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | `Uint8Array` | to account |
| `amount` | `number` | - |

#### Returns

`bool`

bool mint succeeded or not

#### Defined in

[assembly/util/token.ts:173](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/token.ts#L173)

___

### name

▸ **name**(): `string`

Get the name of the token

**`example`**
```ts
 const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
 const name = token.name();
```

#### Returns

`string`

string

#### Defined in

[assembly/util/token.ts:39](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/token.ts#L39)

___

### symbol

▸ **symbol**(): `string`

Get the symbol of the token

**`example`**
```ts
 const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
 const symbol = token.symbol();
```

#### Returns

`string`

string

#### Defined in

[assembly/util/token.ts:58](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/token.ts#L58)

___

### totalSupply

▸ **totalSupply**(): `number`

Get the total supply of the token

**`example`**
```ts
 const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
 const totalSupply = token.totalSupply();
```

#### Returns

`number`

u64

#### Defined in

[assembly/util/token.ts:96](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/token.ts#L96)

___

### transfer

▸ **transfer**(`from`, `to`, `amount`): `bool`

Transfer tokens from `from` to `to`

**`example`**
```ts
 const from = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
 const to = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqE');
 const value = 12376182;

 const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
 const success = token.transfer(from, to, value);
 if (success) {
   // transfer succeeded
 } else {
   // transfer failed
 }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `Uint8Array` | from account |
| `to` | `Uint8Array` | to account |
| `amount` | `number` | - |

#### Returns

`bool`

bool transfer succeeded or not

#### Defined in

[assembly/util/token.ts:148](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/token.ts#L148)
