# System calls

System calls are how requests to the Koinos Blockchain Framework are made. Each system call provides important functionality to be utilized from smart contracts or other parts of the framework.

Each system call has its base functionality implemented natively in a function known as a "thunk". What differentiates a system call from its thunk, is that the system call can have its functionality overridden by a special type of smart contract known as a "system contract".

## Overriding system calls

While any system call can be overridden by a contract that simply calls the underlying thunk, the underlying functionality of some of them cannot be reproduced in the VM. **Table 1** lists system calls which cannot be fully replaced by an override, and the reason it cannot be overridden.

> _**Table 1.** System calls which cannot be overridden_

|System Call|Reason|
|---|---|
|`apply_block`|Requires access to the execution context|
|`apply_set_system_call_operation`|Requires call to `get_transaction`|
|`apply_set_system_contract_operation`|Requires call to `get_transaction`|
|`apply_transaction`|Requires state access|
|`call_contract`|Requires stack frame access|
|`event`|Requires event recorder access|
|`exit_contract`|Would cause infinite recursion|
|`get_caller`|Requires stack frame access and caller access on execution environment|
|`get_contract_arguments`|Requires access to contract call arguments on execution environment|
|`get_contract_arguments_size`|Requires access to contract call arguments on execution environment|
|`get_contract_id`|Requires access to contract id on execution environment|
|`get_entry_point`|Requires access to contract entry point on execution environment|
|`get_head_info`|Requires state access|
|`get_last_irreversible_block`|Requires state access|
|`get_next_object`|Requires state access|
|`get_object`|Requires state access|
|`get_prev_object`|Requires state access|
|`put_object`|Requires state access|
|`set_contract`|Requires contract return accesson execution environment|
