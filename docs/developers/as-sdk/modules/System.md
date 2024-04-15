[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / System

# Namespace: System

## Table of contents

### Classes

- [ProtoDatabaseObject](../classes/System.ProtoDatabaseObject.md)
- [callReturn](../classes/System.callReturn.md)
- [getArgumentsReturn](../classes/System.getArgumentsReturn.md)

### Variables

- [DEFAULT\_MAX\_BUFFER\_SIZE](System.md#default_max_buffer_size)

### Functions

- [applyBlock](System.md#applyblock)
- [applyCallContractOperation](System.md#applycallcontractoperation)
- [applySetSystemCallOperation](System.md#applysetsystemcalloperation)
- [applySetSystemContractOperation](System.md#applysetsystemcontractoperation)
- [applyTransaction](System.md#applytransaction)
- [applyUploadContractOperation](System.md#applyuploadcontractoperation)
- [call](System.md#call)
- [checkAuthority](System.md#checkauthority)
- [checkSystemAuthority](System.md#checksystemauthority)
- [consumeAccountRC](System.md#consumeaccountrc)
- [consumeBlockResources](System.md#consumeblockresources)
- [event](System.md#event)
- [exit](System.md#exit)
- [fail](System.md#fail)
- [getAccountNonce](System.md#getaccountnonce)
- [getAccountRC](System.md#getaccountrc)
- [getArguments](System.md#getarguments)
- [getBlock](System.md#getblock)
- [getBlockField](System.md#getblockfield)
- [getBytes](System.md#getbytes)
- [getCaller](System.md#getcaller)
- [getChainId](System.md#getchainid)
- [getContractAddress](System.md#getcontractaddress)
- [getContractId](System.md#getcontractid)
- [getContractName](System.md#getcontractname)
- [getErrorMessage](System.md#geterrormessage)
- [getHeadInfo](System.md#getheadinfo)
- [getLastIrreversibleBlock](System.md#getlastirreversibleblock)
- [getNextBytes](System.md#getnextbytes)
- [getNextObject](System.md#getnextobject)
- [getObject](System.md#getobject)
- [getOperation](System.md#getoperation)
- [getPrevBytes](System.md#getprevbytes)
- [getPrevObject](System.md#getprevobject)
- [getResourceLimits](System.md#getresourcelimits)
- [getSystemBufferSize](System.md#getsystembuffersize)
- [getTransaction](System.md#gettransaction)
- [getTransactionField](System.md#gettransactionfield)
- [hash](System.md#hash)
- [log](System.md#log)
- [processBlockSignature](System.md#processblocksignature)
- [putBytes](System.md#putbytes)
- [putObject](System.md#putobject)
- [recoverPublicKey](System.md#recoverpublickey)
- [removeObject](System.md#removeobject)
- [require](System.md#require)
- [requireAuthority](System.md#requireauthority)
- [requireSystemAuthority](System.md#requiresystemauthority)
- [revert](System.md#revert)
- [setAccountNonce](System.md#setaccountnonce)
- [setSystemBufferSize](System.md#setsystembuffersize)
- [verifyAccountNonce](System.md#verifyaccountnonce)
- [verifyMerkleRoot](System.md#verifymerkleroot)
- [verifySignature](System.md#verifysignature)
- [verifyVRFProof](System.md#verifyvrfproof)

## Variables

### DEFAULT\_MAX\_BUFFER\_SIZE

• `Const` **DEFAULT\_MAX\_BUFFER\_SIZE**: ``1024``

#### Defined in

[assembly/systemCalls.ts:7](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L7)

## Functions

### applyBlock

▸ **applyBlock**(`block`): `i32`

#### Parameters

| Name | Type |
| :------ | :------ |
| `block` | [`block`](../classes/protocol.block.md) |

#### Returns

`i32`

#### Defined in

[assembly/systemCalls.ts:58](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L58)

___

### applyCallContractOperation

▸ **applyCallContractOperation**(`op`): `i32`

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [`call_contract_operation`](../classes/protocol.call_contract_operation.md) |

#### Returns

`i32`

#### Defined in

[assembly/systemCalls.ts:85](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L85)

___

### applySetSystemCallOperation

▸ **applySetSystemCallOperation**(`op`): `i32`

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [`set_system_call_operation`](../classes/protocol.set_system_call_operation.md) |

#### Returns

`i32`

#### Defined in

[assembly/systemCalls.ts:94](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L94)

___

### applySetSystemContractOperation

▸ **applySetSystemContractOperation**(`op`): `i32`

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [`set_system_contract_operation`](../classes/protocol.set_system_contract_operation.md) |

#### Returns

`i32`

#### Defined in

[assembly/systemCalls.ts:103](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L103)

___

### applyTransaction

▸ **applyTransaction**(`transaction`): `i32`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | [`transaction`](../classes/protocol.transaction.md) |

#### Returns

`i32`

#### Defined in

[assembly/systemCalls.ts:67](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L67)

___

### applyUploadContractOperation

▸ **applyUploadContractOperation**(`op`): `i32`

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [`upload_contract_operation`](../classes/protocol.upload_contract_operation.md) |

#### Returns

`i32`

#### Defined in

[assembly/systemCalls.ts:76](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L76)

___

### call

▸ **call**(`contractId`, `entryPoint`, `contractArgs`): [`callReturn`](../classes/System.callReturn.md)

Call a contract

**`example`**
```ts
// Transfer 10 tKOIN to 1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe
const koinContractId = Base58.decode("1NvZvWNqDX7t93inmLBvbv6kxhpEZYRFWK");
const tranferEntryPoint = 0x62efa292;
const from = contractId; // this contract
const to = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe");
const amount = 10 * 10 ** 8; // needs to be multiplied by 10^8 because Koin is 8 decimals

const koinTransferArgs = new koin.transfer_arguments();
koinTransferArgs.from = from;
koinTransferArgs.to = to;
koinTransferArgs.value = amount;

const resBuf = System.callContract(koinContractId, tranferEntryPoint, Protobuf.encode(koinTransferArgs, koin.transfer_arguments.encode));
System.require(resBuf, `expected resBuf not "null", got "null"`);

if (resBuf) {
  const transferRes = Protobuf.decode<koin.transfer_result>(resBuf, koin.transfer_result.decode, RETURN_BYTES[0]);
  System.require(transferRes.value, `expected transfer not "true", got "false"`);

  const impacted: Uint8Array[] = [];
  impacted.push(from);
  impacted.push(to);

  const transferEvent = new token.transfer_event();
  transferEvent.from = from;
  transferEvent.to = to;
  transferEvent.value = amount;

  System.event('koin.transfer', Protobuf.encode(transferEvent, token.transfer_event.encode), impacted);

  System.log(`transfered ${amount / 10 ** 8} tKoin from ${Base58.encode(from)} to ${Base58.encode(to)}`);
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `Uint8Array` | id of the contract to call |
| `entryPoint` | `number` | entry point of the contract to call |
| `contractArgs` | `Uint8Array` | arguments of the contract to call |

#### Returns

[`callReturn`](../classes/System.callReturn.md)

Uint8Array | null

#### Defined in

[assembly/systemCalls.ts:565](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L565)

___

### checkAuthority

▸ **checkAuthority**(`type`, `account`, `data?`): `bool`

Check authority for an account

**`example`**
```ts
System.checkAuthority(authority.authorization_type.transaction_application, Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe));
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `type` | [`authorization_type`](../enums/authority.authorization_type.md) | `undefined` | type of authority required |
| `account` | `Uint8Array` | `undefined` | account to check |
| `data` | ``null`` \| `Uint8Array` | `null` | - |

#### Returns

`bool`

bool true if the account has authority

#### Defined in

[assembly/systemCalls.ts:791](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L791)

___

### checkSystemAuthority

▸ **checkSystemAuthority**(): `bool`

#### Returns

`bool`

#### Defined in

[assembly/systemCalls.ts:294](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L294)

___

### consumeAccountRC

▸ **consumeAccountRC**(`account`, `value`): `bool`

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `Uint8Array` |
| `value` | `number` |

#### Returns

`bool`

#### Defined in

[assembly/systemCalls.ts:320](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L320)

___

### consumeBlockResources

▸ **consumeBlockResources**(`disk_storage_consumed`, `network_bandwidth_consumed`, `compute_bandwidth_consumed`): `bool`

#### Parameters

| Name | Type |
| :------ | :------ |
| `disk_storage_consumed` | `number` |
| `network_bandwidth_consumed` | `number` |
| `compute_bandwidth_consumed` | `number` |

#### Returns

`bool`

#### Defined in

[assembly/systemCalls.ts:342](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L342)

___

### event

▸ **event**(`name`, `data`, `impacted`): `void`

Emit an event

**`example`**
```ts
const from = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe");
const to = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe");
const impacted: Uint8Array[] = [];
impacted.push(from);
impacted.push(to);

const transferEvent = new token.transfer_event();
transferEvent.from = from;
transferEvent.to = to;
transferEvent.value = amount;

System.event('koin.transfer', Protobuf.encode(transferEvent, token.transfer_event.encode), impacted);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the event |
| `data` | `Uint8Array` | data associated to the event |
| `impacted` | `Uint8Array`[] | accounts impacted by the event |

#### Returns

`void`

#### Defined in

[assembly/systemCalls.ts:392](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L392)

___

### exit

▸ **exit**(`code`, `value?`): `void`

Exit a contract

**`example`**
```ts
System.exitContract(0);
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `code` | `number` | `undefined` |
| `value` | ``null`` \| `Uint8Array` | `null` |

#### Returns

`void`

#### Defined in

[assembly/systemCalls.ts:628](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L628)

___

### fail

▸ **fail**(`message?`, `code?`): `void`

Fail the transaction in progress

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `message` | `string` | `""` | Optional failure message |
| `code` | `number` | `-1` | Optional error code, must be < 0, else code -1 is used (failure exit code) ```ts if (!System.checkAuthority(authority.authorization_type.transaction_application, Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe)))   System.fail("contract is not authorized"); ``` |

#### Returns

`void`

#### Defined in

[assembly/systemCalls.ts:654](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L654)

___

### getAccountNonce

▸ **getAccountNonce**(`account`): `Uint8Array` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `Uint8Array` |

#### Returns

`Uint8Array` \| ``null``

#### Defined in

[assembly/systemCalls.ts:263](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L263)

___

### getAccountRC

▸ **getAccountRC**(`account`): `u64`

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `Uint8Array` |

#### Returns

`u64`

#### Defined in

[assembly/systemCalls.ts:309](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L309)

___

### getArguments

▸ **getArguments**(): [`getArgumentsReturn`](../classes/System.getArgumentsReturn.md)

Get arguments that were used when calling the contract

**`example`**
```ts
const rdbuf = System.getContractArguments();
const contractArgs = Protobuf.decode<foobar.foobar_arguments>(rdbuf, foobar.foobar_arguments.decode, RETURN_BYTES[0]);
System.log('contractArgs: ' + contractArgs.value.toString());
```

#### Returns

[`getArgumentsReturn`](../classes/System.getArgumentsReturn.md)

Uint8Array

#### Defined in

[assembly/systemCalls.ts:602](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L602)

___

### getBlock

▸ **getBlock**(): [`block`](../classes/protocol.block.md)

Get the current block

**`example`**
```ts
 const b = System.getBlock();
 System.log("signer: " + Base58.encode((b.header!.signer!)));
```

#### Returns

[`block`](../classes/protocol.block.md)

protocol.block

#### Defined in

[assembly/systemCalls.ts:207](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L207)

___

### getBlockField

▸ **getBlockField**(`field`): [`value_type`](../classes/value.value_type.md) \| ``null``

Get a field from the current block

**`example`**
```ts
const blField = System.getBlockField('header.signer');
System.require(blField, `expected blField not "null", got "null"`);

if (blField) {
  System.log("signer: " + Base58.encode(blField.bytes_value!));
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `field` | `string` | field to get (i.e.: 'id', 'header.signer') |

#### Returns

[`value_type`](../classes/value.value_type.md) \| ``null``

value.value_type | null

#### Defined in

[assembly/systemCalls.ts:232](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L232)

___

### getBytes

▸ **getBytes**<`K`\>(`space`, `key`): `Uint8Array` \| ``null``

Get bytes (Uint8Array)

**`example`**
```ts
const contractId = System.getContractId();
const contractSpace = new chain.object_space(false, contractId, 1);
let obj = System.getBytes(contractSpace, StringBytes.stringToBytes('key2'));

if (obj) {
  const str = StringBytes.bytesToString(obj);
  System.log(str);
}
```

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `space` | [`object_space`](../classes/chain.object_space.md) | space where to get the object |
| `key` | `K` | key of object to get |

#### Returns

`Uint8Array` \| ``null``

Uint8Array | null

#### Defined in

[assembly/systemCalls.ts:939](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L939)

___

### getCaller

▸ **getCaller**(): [`caller_data`](../classes/chain.caller_data.md)

Get the contract caller information

**`example`**
```ts
const callerData = System.getCaller();
System.log('callerData.caller_privilege: ' + callerData.caller_privilege.toString());
if (callerData.caller) {
  System.log('callerData.caller (b58): ' + Base58.encode(callerData.caller!));
}
```

#### Returns

[`caller_data`](../classes/chain.caller_data.md)

chain.caller_data

#### Defined in

[assembly/systemCalls.ts:770](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L770)

___

### getChainId

▸ **getChainId**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

[assembly/systemCalls.ts:112](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L112)

___

### getContractAddress

▸ **getContractAddress**(`name`): `Uint8Array`

Get the address for a given system contract name

**`example`**
```ts
const address = System.getContractAddress('koin');
System.log('address (b58): ' + Base58.encode(address));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the system contract |

#### Returns

`Uint8Array`

Uint8Array The contract's address

#### Defined in

[assembly/systemCalls.ts:747](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L747)

___

### getContractId

▸ **getContractId**(): `Uint8Array`

Get the id of the contract

**`example`**
```ts
const contractId = System.getContractId();
System.log('contractId (b58): ' + Base58.encode(contractId));
```

#### Returns

`Uint8Array`

Uint8Array

#### Defined in

[assembly/systemCalls.ts:705](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L705)

___

### getContractName

▸ **getContractName**(`address`): `string`

Get the name of a system contract for a given address

**`example`**
```ts
const name = System.getContractName(Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe'));
System.log('contract name: ' + name);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `Uint8Array` | The address of the system contract |

#### Returns

`string`

string The contract's name

#### Defined in

[assembly/systemCalls.ts:726](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L726)

___

### getErrorMessage

▸ **getErrorMessage**(): `string`

Gets a stored error message after a system call that can return an error.

**`example`**
```ts
if (System.applyTransaction(trx) != error.error_code.success)
  System.log(getErrorMessage())
```

#### Returns

`string`

string

#### Defined in

[assembly/systemCalls.ts:692](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L692)

___

### getHeadInfo

▸ **getHeadInfo**(): [`head_info`](../classes/chain.head_info.md)

Get the blockchain head information (head block time, height, last irreversible block, etc...)

**`example`**
```ts
 const headInfo = System.getHeadInfo();
 System.log('headInfo.head_block_time: ' + headInfo.head_block_time.toString());
 System.log('headInfo.head_topology.height: ' + headInfo.head_topology!.height.toString());
 System.log('headInfo.last_irreversible_block.: ' + headInfo.last_irreversible_block.toString());
```

#### Returns

[`head_info`](../classes/chain.head_info.md)

chain.head_info

#### Defined in

[assembly/systemCalls.ts:47](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L47)

___

### getLastIrreversibleBlock

▸ **getLastIrreversibleBlock**(): `u64`

Get the last irreversible block height

**`example`**
```ts
const lastIrreversibleBlock = System.getLastIrreversibleBlock();
System.log('lastIrreversibleBlock: ' + lastIrreversibleBlock.toString());
```

#### Returns

`u64`

u64

#### Defined in

[assembly/systemCalls.ts:252](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L252)

___

### getNextBytes

▸ **getNextBytes**<`K`\>(`space`, `key`): `system_calls.database_object` \| ``null``

Get next bytes (Uint8Array)

**`example`**
```ts
const contractId = System.getContractId();
const contractSpace = new chain.object_space(false, contractId, 1);
let obj = System.getNextBytes(contractSpace, StringBytes.stringToBytes('key2'));

if (obj) {
  System.log('obj.value: ' + obj.value.toString());
}
```

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `space` | [`object_space`](../classes/chain.object_space.md) | - |
| `key` | `K` | key of object |

#### Returns

`system_calls.database_object` \| ``null``

system_calls.database_object

#### Defined in

[assembly/systemCalls.ts:1023](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L1023)

___

### getNextObject

▸ **getNextObject**<`K`, `TMessage`\>(`space`, `key`, `decoder`): [`ProtoDatabaseObject`](../classes/System.ProtoDatabaseObject.md)<`TMessage`\> \| ``null``

Get next proto object

**`example`**
```ts
const contractId = System.getContractId();
const contractSpace = new chain.object_space(false, contractId, 1);
let obj = System.getNextObject<string, test.test_object>(contractSpace, 'key3', test.test_object.decode);

if (obj) {
  System.log('next obj.value: ' + obj.value.value.toString());
}
```

#### Type parameters

| Name |
| :------ |
| `K` |
| `TMessage` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `space` | [`object_space`](../classes/chain.object_space.md) | - |
| `key` | `K` | key of object |
| `decoder` | (`reader`: `Reader`, `length`: `number`) => `TMessage` | - |

#### Returns

[`ProtoDatabaseObject`](../classes/System.ProtoDatabaseObject.md)<`TMessage`\> \| ``null``

proto object (TMessage)

#### Defined in

[assembly/systemCalls.ts:1066](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L1066)

___

### getObject

▸ **getObject**<`K`, `TMessage`\>(`space`, `key`, `decoder`): `TMessage` \| ``null``

Get proto object

**`example`**
```ts
const contractId = System.getContractId();
const contractSpace = new chain.object_space(false, contractId, 1);
let obj = System.getObject<string, test.test_object>(contractSpace, 'key2', test.test_object.decode);

if (obj) {
  System.log('obj.value: ' + obj.value.toString());
}
```

#### Type parameters

| Name |
| :------ |
| `K` |
| `TMessage` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `space` | [`object_space`](../classes/chain.object_space.md) | space where to get the object |
| `key` | `K` | key of object to get |
| `decoder` | (`reader`: `Reader`, `length`: `number`) => `TMessage` | - |

#### Returns

`TMessage` \| ``null``

proto object (TMessage) or null

#### Defined in

[assembly/systemCalls.ts:983](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L983)

___

### getOperation

▸ **getOperation**(): [`operation`](../classes/protocol.operation.md)

Get the current operation

**`example`**
```ts
 const op = System.getOperation();
```

#### Returns

[`operation`](../classes/protocol.operation.md)

protocol.operation

#### Defined in

[assembly/systemCalls.ts:187](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L187)

___

### getPrevBytes

▸ **getPrevBytes**<`K`\>(`space`, `key`): `system_calls.database_object` \| ``null``

Get next bytes (Uint8Array)

**`example`**
```ts
const contractId = System.getContractId();
const contractSpace = new chain.object_space(false, contractId, 1);
let obj = System.getPrevBytes(contractSpace, StringBytes.stringToBytes('key2'));

if (obj) {
  System.log('obj.value: ' + obj.value.toString());
}
```

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `space` | [`object_space`](../classes/chain.object_space.md) | - |
| `key` | `K` | key of object |

#### Returns

`system_calls.database_object` \| ``null``

system_calls.database_object

#### Defined in

[assembly/systemCalls.ts:1096](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L1096)

___

### getPrevObject

▸ **getPrevObject**<`K`, `TMessage`\>(`space`, `key`, `decoder`): [`ProtoDatabaseObject`](../classes/System.ProtoDatabaseObject.md)<`TMessage`\> \| ``null``

Get previous proto object

**`example`**
```ts
const contractId = System.getContractId();
const contractSpace = new chain.object_space(false, contractId, 1);
let obj = System.getPrevObject<string, test.test_object>(contractSpace, 'key3', test.test_object.decode);

if (obj) {
  System.log('next obj.value: ' + obj.value.value.toString());
}
```

#### Type parameters

| Name |
| :------ |
| `K` |
| `TMessage` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `space` | [`object_space`](../classes/chain.object_space.md) | - |
| `key` | `K` | key of object |
| `decoder` | (`reader`: `Reader`, `length`: `number`) => `TMessage` | - |

#### Returns

[`ProtoDatabaseObject`](../classes/System.ProtoDatabaseObject.md)<`TMessage`\> \| ``null``

proto object (TMessage)

#### Defined in

[assembly/systemCalls.ts:1138](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L1138)

___

### getResourceLimits

▸ **getResourceLimits**(): [`resource_limit_data`](../classes/chain.resource_limit_data.md)

#### Returns

[`resource_limit_data`](../classes/chain.resource_limit_data.md)

#### Defined in

[assembly/systemCalls.ts:331](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L331)

___

### getSystemBufferSize

▸ **getSystemBufferSize**(): `u32`

#### Returns

`u32`

#### Defined in

[assembly/systemCalls.ts:30](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L30)

___

### getTransaction

▸ **getTransaction**(): [`transaction`](../classes/protocol.transaction.md)

Get the current transaction

**`example`**
```ts
 const tx = System.getTransaction();
 System.log("payer: " + Base58.encode((tx.header!.payer!)));
```

#### Returns

[`transaction`](../classes/protocol.transaction.md)

protocol.transaction

#### Defined in

[assembly/systemCalls.ts:145](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L145)

___

### getTransactionField

▸ **getTransactionField**(`field`): [`value_type`](../classes/value.value_type.md) \| ``null``

Get a field from the current transaction

**`example`**
```ts
 const txField = System.getTransactionField('header.payer');
 if (txField) {
   System.log("payer: " + Base58.encode(txField.bytes_value!));
 }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `field` | `string` | field to get (i.e.: 'id', 'header.payer') |

#### Returns

[`value_type`](../classes/value.value_type.md) \| ``null``

value.value_type | null

#### Defined in

[assembly/systemCalls.ts:168](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L168)

___

### hash

▸ **hash**(`code`, `obj`, `size?`): `Uint8Array` \| ``null``

Hash an object

**`example`**
```ts
const digest = System.hash(Crypto.multicodec.sha2_256, StringBytes.stringToBytes('hello world!));
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `code` | `number` | `undefined` | a Crypto.multicodec code |
| `obj` | `Uint8Array` | `undefined` | object to hash |
| `size` | `number` | `0` | size of the object to hash |

#### Returns

`Uint8Array` \| ``null``

Uint8Array | null

#### Defined in

[assembly/systemCalls.ts:413](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L413)

___

### log

▸ **log**(`s`): `void`

Log a string

**`example`**
```ts
System.log('Hello World!');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | string to log |

#### Returns

`void`

#### Defined in

[assembly/systemCalls.ts:363](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L363)

___

### processBlockSignature

▸ **processBlockSignature**(`digest`, `header`, `signature`): `bool`

#### Parameters

| Name | Type |
| :------ | :------ |
| `digest` | `Uint8Array` |
| `header` | [`block_header`](../classes/protocol.block_header.md) |
| `signature` | `Uint8Array` |

#### Returns

`bool`

#### Defined in

[assembly/systemCalls.ts:125](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L125)

___

### putBytes

▸ **putBytes**<`K`\>(`space`, `key`, `obj`): `void`

Store bytes (Uint8Array)

**`example`**
```ts
const contractId = System.getContractId();
const contractSpace = new chain.object_space(false, contractId, 1);

const nbBytesWritten = System.putBytes(contractSpace, 'testKey', StringBytes.stringToBytes('testValue'));
System.log('nbBytesWritten: ' + nbBytesWritten.toString());
```

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `space` | [`object_space`](../classes/chain.object_space.md) | space where to put the byets |
| `key` | `K` | key of the bytes to store (string or Uint8Array) |
| `obj` | `Uint8Array` | bytes to store (Uint8Array) |

#### Returns

`void`

number of bytes that were put in the database

#### Defined in

[assembly/systemCalls.ts:849](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L849)

___

### putObject

▸ **putObject**<`K`, `TMessage`\>(`space`, `key`, `obj`, `encoder`): `void`

Store proto object

**`example`**
```ts
const contractId = System.getContractId();
const contractSpace = new chain.object_space(false, contractId, 1);
const obj = new test.test_object(42);

const nbBytesWritten = System.putObject(contractSpace, "test", obj, test.test_object.encode);
System.log('nbBytesWritten: ' + nbBytesWritten.toString());
```

#### Type parameters

| Name |
| :------ |
| `K` |
| `TMessage` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `space` | [`object_space`](../classes/chain.object_space.md) | space where to put the object |
| `key` | `K` | key of the object to store (string or Uint8Array) |
| `obj` | `TMessage` | object to store (string or Uint8Array) |
| `encoder` | (`message`: `TMessage`, `writer`: `Writer`) => `void` | - |

#### Returns

`void`

number of bytes that were put in the database

#### Defined in

[assembly/systemCalls.ts:882](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L882)

___

### recoverPublicKey

▸ **recoverPublicKey**(`signatureData`, `digest`, `type?`, `compressed?`): `Uint8Array` \| ``null``

Recover a publick key given a signature and a digest that was signed by the public key

**`example`**
```ts
const message = 'hello-world';
const signatureData = Base64.decode('IHhJwlD7P-o6x7L38den1MnumUhnYmNhTZhIUQQhezvEMf7rx89NbIIioNCIQSk1PQYdQ9mOI4-rDYiwO2pLvM4=');
const digest = System.hash(Crypto.multicodec.sha2_256, StringBytes.stringToBytes(message));
const recoveredKey = System.recoverPublicKey(signatureData, digest!);
const addr = Crypto.addressFromPublicKey(recoveredKey!);
System.log('recoveredKey (b58): ' + Base58.encode(addr));
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `signatureData` | `Uint8Array` | `undefined` | the signature of the digest |
| `digest` | `Uint8Array` | `undefined` | digest that was signed by the public key |
| `type` | [`ecdsa_secp256k1`](../enums/chain.dsa.md#ecdsa_secp256k1) | `chain.dsa.ecdsa_secp256k1` | type of signature |
| `compressed` | `bool` | `true` | whether the public key should be compressed |

#### Returns

`Uint8Array` \| ``null``

Uint8Array | null

#### Defined in

[assembly/systemCalls.ts:441](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L441)

___

### removeObject

▸ **removeObject**<`K`\>(`space`, `key`): `void`

Remove an object

**`example`**
```ts
const contractId = System.getContractId();
const contractSpace = new chain.object_space(false, contractId, 1);

System.removeObject(contractSpace, 'testKey');
```

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `space` | [`object_space`](../classes/chain.object_space.md) | space where to put the byets |
| `key` | `K` | key of the bytes to store (string or Uint8Array) |

#### Returns

`void`

#### Defined in

[assembly/systemCalls.ts:905](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L905)

___

### require

▸ **require**<`T`\>(`isTrueish`, `message?`, `code?`): `T`

Require an expression to be true, log a message and exit the contract otherise

**`example`**
```ts
System.require(1 + 1 == 11, `expected "11", got "2"`);
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `isTrueish` | `T` | `undefined` |
| `message` | `string` | `""` |
| `code` | `number` | `1` |

#### Returns

`T`

T it is Trueish, will exit the contract with `exitCode` otherwise

#### Defined in

[assembly/systemCalls.ts:823](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L823)

___

### requireAuthority

▸ **requireAuthority**(`type`, `account`): `void`

Require authority for an account

**`throws`** revert the transaction if the account is not authorized

**`example`**
```ts
System.requireAuthority(authority.authorization_type.transaction_application, Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`authorization_type`](../enums/authority.authorization_type.md) | type of authority required |
| `account` | `Uint8Array` | account to check |

#### Returns

`void`

#### Defined in

[assembly/systemCalls.ts:811](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L811)

___

### requireSystemAuthority

▸ **requireSystemAuthority**(): `void`

#### Returns

`void`

#### Defined in

[assembly/systemCalls.ts:303](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L303)

___

### revert

▸ **revert**(`message?`, `code?`): `void`

Revert the transaction in progress

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `message` | `string` | `""` | Optional reversion message |
| `code` | `number` | `1` | Optional error code, must be > 0, else code 1 is used (reverted exit code) ```ts if (!System.checkAuthority(authority.authorization_type.transaction_application, Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe)))   System.revert("contract is not authorized"); ``` |

#### Returns

`void`

#### Defined in

[assembly/systemCalls.ts:673](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L673)

___

### setAccountNonce

▸ **setAccountNonce**(`account`, `nonce`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `Uint8Array` |
| `nonce` | `Uint8Array` |

#### Returns

`void`

#### Defined in

[assembly/systemCalls.ts:285](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L285)

___

### setSystemBufferSize

▸ **setSystemBufferSize**(`size`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`void`

#### Defined in

[assembly/systemCalls.ts:25](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L25)

___

### verifyAccountNonce

▸ **verifyAccountNonce**(`account`, `nonce`): `bool`

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `Uint8Array` |
| `nonce` | `Uint8Array` |

#### Returns

`bool`

#### Defined in

[assembly/systemCalls.ts:274](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L274)

___

### verifyMerkleRoot

▸ **verifyMerkleRoot**(`root`, `hashes`): `bool`

Verify a merkle root

**`example`**
```ts
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | `Uint8Array` | merkle root to verify |
| `hashes` | `Uint8Array`[] | hashes to verify |

#### Returns

`bool`

bool

#### Defined in

[assembly/systemCalls.ts:461](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L461)

___

### verifySignature

▸ **verifySignature**(`publicKey`, `signature`, `digest`, `type?`, `compressed?`): `bool`

Verify that a public key signed a digest

**`example`**
```ts
let verify = System.verifySignature(recoveredKey!, signatureData, digest!);
System.require(verify == true, `expected "true", got "${verify}"`);
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `publicKey` | `Uint8Array` | `undefined` | public key that signed the digest |
| `signature` | `Uint8Array` | `undefined` | signature of the digest |
| `digest` | `Uint8Array` | `undefined` | digest that was signed |
| `type` | [`ecdsa_secp256k1`](../enums/chain.dsa.md#ecdsa_secp256k1) | `chain.dsa.ecdsa_secp256k1` | type of signature |
| `compressed` | `bool` | `true` | whether or not the public key is compressed |

#### Returns

`bool`

bool

#### Defined in

[assembly/systemCalls.ts:486](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L486)

___

### verifyVRFProof

▸ **verifyVRFProof**(`publicKey`, `proof`, `hash`, `message`, `type?`): `bool`

Verifies a VRF proof

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `publicKey` | `Uint8Array` | `undefined` | public key that generated the proof |
| `proof` | `Uint8Array` | `undefined` | the VRF proof itself |
| `hash` | `Uint8Array` | `undefined` | the hash of the proof |
| `message` | `Uint8Array` | `undefined` | the original message input |
| `type` | [`ecdsa_secp256k1`](../enums/chain.dsa.md#ecdsa_secp256k1) | `chain.dsa.ecdsa_secp256k1` | type of signature |

#### Returns

`bool`

#### Defined in

[assembly/systemCalls.ts:505](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/systemCalls.ts#L505)
