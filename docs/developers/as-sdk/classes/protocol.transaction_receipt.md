[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / [protocol](../modules/protocol.md) / transaction\_receipt

# Class: transaction\_receipt

[protocol](../modules/protocol.md).transaction_receipt

## Table of contents

### Constructors

- [constructor](protocol.transaction_receipt.md#constructor)

### Properties

- [compute\_bandwidth\_used](protocol.transaction_receipt.md#compute_bandwidth_used)
- [disk\_storage\_used](protocol.transaction_receipt.md#disk_storage_used)
- [events](protocol.transaction_receipt.md#events)
- [id](protocol.transaction_receipt.md#id)
- [logs](protocol.transaction_receipt.md#logs)
- [max\_payer\_rc](protocol.transaction_receipt.md#max_payer_rc)
- [network\_bandwidth\_used](protocol.transaction_receipt.md#network_bandwidth_used)
- [payer](protocol.transaction_receipt.md#payer)
- [rc\_limit](protocol.transaction_receipt.md#rc_limit)
- [rc\_used](protocol.transaction_receipt.md#rc_used)
- [reverted](protocol.transaction_receipt.md#reverted)

### Methods

- [decode](protocol.transaction_receipt.md#decode)
- [encode](protocol.transaction_receipt.md#encode)

## Constructors

### constructor

• **new transaction_receipt**(`id?`, `payer?`, `max_payer_rc?`, `rc_limit?`, `rc_used?`, `disk_storage_used?`, `network_bandwidth_used?`, `compute_bandwidth_used?`, `reverted?`, `events?`, `logs?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `Uint8Array` | `undefined` |
| `payer` | `Uint8Array` | `undefined` |
| `max_payer_rc` | `number` | `0` |
| `rc_limit` | `number` | `0` |
| `rc_used` | `number` | `0` |
| `disk_storage_used` | `number` | `0` |
| `network_bandwidth_used` | `number` | `0` |
| `compute_bandwidth_used` | `number` | `0` |
| `reverted` | `bool` | `false` |
| `events` | [`event_data`](protocol.event_data.md)[] | `[]` |
| `logs` | `string`[] | `[]` |

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:871

## Properties

### compute\_bandwidth\_used

• **compute\_bandwidth\_used**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:866

___

### disk\_storage\_used

• **disk\_storage\_used**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:864

___

### events

• **events**: [`event_data`](protocol.event_data.md)[]

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:868

___

### id

• **id**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:859

___

### logs

• **logs**: `string`[]

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:869

___

### max\_payer\_rc

• **max\_payer\_rc**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:861

___

### network\_bandwidth\_used

• **network\_bandwidth\_used**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:865

___

### payer

• **payer**: `Uint8Array`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:860

___

### rc\_limit

• **rc\_limit**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:862

___

### rc\_used

• **rc\_used**: `number`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:863

___

### reverted

• **reverted**: `bool`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:867

## Methods

### decode

▸ `Static` **decode**(`reader`, `length`): [`transaction_receipt`](protocol.transaction_receipt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reader` | `Reader` |
| `length` | `number` |

#### Returns

[`transaction_receipt`](protocol.transaction_receipt.md)

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:799

___

### encode

▸ `Static` **encode**(`message`, `writer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`transaction_receipt`](protocol.transaction_receipt.md) |
| `writer` | `Writer` |

#### Returns

`void`

#### Defined in

node_modules/@koinos/proto-as/assembly/koinos/protocol/protocol.ts:736
