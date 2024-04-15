[@koinos/sdk-as - v1.1.0](../README.md) / [Exports](../modules.md) / MockVM

# Namespace: MockVM

## Table of contents

### Classes

- [MockAuthority](../classes/MockVM.MockAuthority.md)

### Variables

- [METADATA\_SPACE](MockVM.md#metadata_space)

### Functions

- [clearLogs](MockVM.md#clearlogs)
- [commitTransaction](MockVM.md#committransaction)
- [getContractResult](MockVM.md#getcontractresult)
- [getErrorMessage](MockVM.md#geterrormessage)
- [getEvents](MockVM.md#getevents)
- [getExitCode](MockVM.md#getexitcode)
- [getLogs](MockVM.md#getlogs)
- [reset](MockVM.md#reset)
- [rollbackTransaction](MockVM.md#rollbacktransaction)
- [setAuthorities](MockVM.md#setauthorities)
- [setBlock](MockVM.md#setblock)
- [setCallContractResults](MockVM.md#setcallcontractresults)
- [setCaller](MockVM.md#setcaller)
- [setChainId](MockVM.md#setchainid)
- [setContractArguments](MockVM.md#setcontractarguments)
- [setContractId](MockVM.md#setcontractid)
- [setEntryPoint](MockVM.md#setentrypoint)
- [setHeadInfo](MockVM.md#setheadinfo)
- [setLastIrreversibleBlock](MockVM.md#setlastirreversibleblock)
- [setOperation](MockVM.md#setoperation)
- [setSystemAuthority](MockVM.md#setsystemauthority)
- [setTransaction](MockVM.md#settransaction)
- [setVerifyVRFProofResults](MockVM.md#setverifyvrfproofresults)

## Variables

### METADATA\_SPACE

• `Const` **METADATA\_SPACE**: [`object_space`](../classes/chain.object_space.md)

#### Defined in

[assembly/util/mockVM.ts:8](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L8)

## Functions

### clearLogs

▸ **clearLogs**(): `void`

Remove the current logs

**`example`**
```ts
System.log('log 1');
System.log('log 2');
MockVM.clearLogs();
System.log('log 3');
System.log('log 4');
console.log(MockVM.getLogs().join(","));
// log 3,log 4
```

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:420](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L420)

___

### commitTransaction

▸ **commitTransaction**(): `void`

Backup the database so that it can be rolledback to the backedup state if the transaction reverts

**`example`**
```ts
MockVM.commitTransaction();
```

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:492](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L492)

___

### getContractResult

▸ **getContractResult**(): `Uint8Array` \| ``null``

Get contract result set when calling System.exit()

**`example`**
```ts
System.setContractResult(Base64.decode('res1'));

const contractRes = MockVM.getContractResult();

if (contractRes) {
  System.log('contractRes: ' + (Base64.encode(contractRes as Uint8Array) as string));
}
```

#### Returns

`Uint8Array` \| ``null``

#### Defined in

[assembly/util/mockVM.ts:329](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L329)

___

### getErrorMessage

▸ **getErrorMessage**(): `String` \| ``null``

Get error message string after a VM error

**`example`**
```ts
const errorMessage = MockVM.getErrorMessage();
```

#### Returns

`String` \| ``null``

#### Defined in

[assembly/util/mockVM.ts:343](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L343)

___

### getEvents

▸ **getEvents**(): `system_calls.event_arguments`[]

Get logs set when calling System.log()

**`example`**
```ts
System.Event('my-event-1', Base64.decode('event data'), [Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe')]);
System.Event('my-event-2', Base64.decode('event data 2'), [Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe')]);

const events = MockVM.getEvents();

for (let index = 0; index < events.length; index++) {
  const event = events[index];

  System.log(event.name)
  System.log(event.data.toString())

  event.impacted.forEach(acct => {
    System.log(Base58.encode(acct));
  });
}
```

#### Returns

`system_calls.event_arguments`[]

#### Defined in

[assembly/util/mockVM.ts:446](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L446)

___

### getExitCode

▸ **getExitCode**(): `i32`

Get exit code set when calling System.exitContract(...)

**`example`**
```ts
System.exit(0);

const exitCode = MockVM.getExitCode();

if (exitCode) {
  System.log('exitCode: ' + exitCode.toString());
}
```

#### Returns

`i32`

#### Defined in

[assembly/util/mockVM.ts:363](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L363)

___

### getLogs

▸ **getLogs**(): `string`[]

Get logs set when calling System.log()

**`example`**
```ts
System.log('log 1');
System.log('log 2');

const logs = MockVM.getLogs();

for (let index = 0; index < logs.length; index++) {
  const log = logs;
}
```

#### Returns

`string`[]

#### Defined in

[assembly/util/mockVM.ts:389](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L389)

___

### reset

▸ **reset**(): `void`

Reset the MockVM database

**`example`**
```ts
MockVM.reset();
```

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:470](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L470)

___

### rollbackTransaction

▸ **rollbackTransaction**(): `void`

Rrestore the backup made via MockVM.commitTransaction()

**`example`**
```ts
MockVM.rollbackTransaction();
```

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:481](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L481)

___

### setAuthorities

▸ **setAuthorities**(`authorities`): `void`

Set authorities that will be used when calling System.requireAuthority(...)

**`example`**
```ts
const account = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
const auth1 = new MockVM.MockAuthority(authority.authorization_type.contract_call, account, true);
const auth2 = new MockVM.MockAuthority(authority.authorization_type.contract_upload, account, false)

MockVM.setAuthorities([auth1, auth2]);

System.requireAuthority(authority.authorization_type.contract_call, account);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorities` | [`MockAuthority`](../classes/MockVM.MockAuthority.md)[] | authorities to set |

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:214](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L214)

___

### setBlock

▸ **setBlock**(`block`): `void`

Set block that will be used when calling System.getBlock() and System.getBlockField(...)

**`example`**
```ts
let block = new protocol.block();
block.id = StringBytes.stringToBytes("0x12345");

MockVM.setBlock(block);

block = System.getBlock();

System.log("block.id: " + (StringBytes.bytesToString((block.id) as Uint8Array) as string));

let blField = System.getBlockField('id');
if (blField) {
  System.log("block.id: " + (StringBytes.bytesToString((blField.bytes_value) as Uint8Array) as string));
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `block` | [`block`](../classes/protocol.block.md) | block to set |

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:196](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L196)

___

### setCallContractResults

▸ **setCallContractResults**(`callContractResults`): `void`

Set call contract results that will be used when calling System.callContract(...)

**`example`**
```ts
const callContractResults = new value.list_type();

const callContractRes1 = Base64.decode('res1');
const callContractRes2 = Base64.decode('res2');

MockVM.setCallContractResults([callContractRes1, callContractRes2]);

let callRes = System.callContract(contract_id, 1, new Uint8Array(0));
if (callRes) {
System.log('callRes1: ' + (Base64.encode(callRes as Uint8Array) as string));
}

callRes = System.callContract(contract_id, 1, new Uint8Array(0));
if (callRes) {
System.log('callRes2: ' + (Base64.encode(callRes as Uint8Array) as string));
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callContractResults` | `exit_arguments`[] | The results are FIFO, so the first System.callContract(...) used in your code will use the first result you set in callContractResults, the second System.callContract(...) will get the second result, etc... |

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:301](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L301)

___

### setCaller

▸ **setCaller**(`callerData`): `void`

Set caller data that will be used when calling System.getCaller()

**`example`**
```ts
let callerData = new chain.caller_data(Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe'), chain.privilege.user_mode);

MockVM.setCaller(callerData);

callerData = System.getCaller();

System.log('callerData.caller_privilege: ' + callerData.caller_privilege.toString());
if (callerData.caller) {
  System.log('callerData.caller (b58): ' + Base58.encode(callerData.caller!));
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callerData` | [`caller_data`](../classes/chain.caller_data.md) | caller data to set |

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:130](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L130)

___

### setChainId

▸ **setChainId**(`chainId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `Uint8Array` |

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:72](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L72)

___

### setContractArguments

▸ **setContractArguments**(`contractArguments`): `void`

Set contract arguments that will be used when calling System.getContractArguments()

**`example`**
```ts
let contractArguments = StringBytes.stringToBytes('myArgs');
MockVM.setContractArguments(contractArguments);

contractArguments = System.getContractArguments();
System.log('contractArguments: ' + (StringBytes.bytesToString(contractArguments)!));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractArguments` | `Uint8Array` | contract arguments to set |

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:52](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L52)

___

### setContractId

▸ **setContractId**(`contractId`): `void`

Set contract id that will be used when calling System.getContractArguments()

**`example`**
```ts
let contractId = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
MockVM.setContractId(contractId);

contractId = System.getContractId();
System.log('contractId: ' + Base58.encode(contractId));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `Uint8Array` | contract id to set |

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:68](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L68)

___

### setEntryPoint

▸ **setEntryPoint**(`entryPoint`): `void`

Set entry point that will be used when calling System.getEntryPoint()

**`example`**
```ts
MockVM.setEntryPoint(0xc3ab8ff1);

const entryPoint = System.getEntryPoint();
System.log('entryPoint: ' + entryPoint.toString());
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entryPoint` | `number` | entry point to set |

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:33](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L33)

___

### setHeadInfo

▸ **setHeadInfo**(`headInfo`): `void`

Set head info that will be used when calling System.getHeadInfo()

**`example`**
```ts
let headInfo = new chain.head_info();
headInfo.head_block_time = 123456789;
headInfo.last_irreversible_block = 3;

MockVM.setHeadInfo(headInfo);

headInfo = System.getHeadInfo();
System.log('headInfo.head_block_time: ' + headInfo.head_block_time.toString());
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `headInfo` | [`head_info`](../classes/chain.head_info.md) | head info to set |

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:91](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L91)

___

### setLastIrreversibleBlock

▸ **setLastIrreversibleBlock**(`lastIrreversibleBlock`): `void`

Set entry point that will be used when calling System.getEntryPoint()

**`example`**
```ts
MockVM.setLastIrreversibleBlock(987654321);

const lastIrreversibleBlock = System.getLastIrreversibleBlock();
System.log('lastIrreversibleBlock: ' + lastIrreversibleBlock.toString());
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lastIrreversibleBlock` | `number` | last irreversible block height to set |

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:106](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L106)

___

### setOperation

▸ **setOperation**(`operation`): `void`

Set operation that will be used when calling System.getOperation()

**`example`**
```ts
let setOperation = new protocol.operation();
setOperation.set_system_contract = new protocol.set_system_contract_operation(Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe'), true);

MockVM.setOperation(setOperation);

const getOperation = System.getOperation();
...
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | [`operation`](../classes/protocol.operation.md) | operation to set |

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:172](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L172)

___

### setSystemAuthority

▸ **setSystemAuthority**(`authorized`): `void`

Set system authority that will be used when calling System.requireSystemAuthority(...)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorized` | `bool` | ```ts MockVM.setSystemAuthority(true);  System.requireSystemAuthority(); ``` |

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:240](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L240)

___

### setTransaction

▸ **setTransaction**(`transaction`): `void`

Set transaction that will be used when calling System.getTransaction() and System.getTransactionField(...)

**`example`**
```ts
let transaction = new protocol.transaction();
transaction.id = StringBytes.stringToBytes("0x12345");

MockVM.setTransaction(transaction);

transaction = System.getTransaction();

System.log("transaction.id: " + (StringBytes.bytesToString(transaction.id)));

let txField = System.getTransactionField('id');
if (txField) {
  System.log("transaction.id: " + (StringBytes.bytesToString((txField.bytes_value) as Uint8Array) as string));
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | [`transaction`](../classes/protocol.transaction.md) | transaction to set |

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:154](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L154)

___

### setVerifyVRFProofResults

▸ **setVerifyVRFProofResults**(`verifyVRFProofResults`): `void`

Set results that will be used when calling System.verifyVRFProof(...)

**`example`**
```ts
MockVM.setVerifyVRFProofResults([false, true]);

let callRes = System.verifyVRFProof(pubKey, proof, hash, messgae);
if (callRes) {
// Will execute
}

let callRes = System.verifyVRFProof(pubKey, proof, hash, messgae);
if (callRes) {
// Will not execute
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `verifyVRFProofResults` | `bool`[] | The results are FIFO, so the first System.verifyVRFPRoof(...) used in your code will use the first result you set in callContractResults, the second System.callContract(...) will get the second result, etc... |

#### Returns

`void`

#### Defined in

[assembly/util/mockVM.ts:265](https://github.com/koinos/koinos-sdk-as/blob/0d26a97/assembly/util/mockVM.ts#L265)
