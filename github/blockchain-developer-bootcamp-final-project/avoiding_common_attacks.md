A few attacks and pitfalls that were covered in this project:

Use of Modifiers only for validation: Checks for valid user, duplicate profile, valid root user, avoiding dup root user create were all effected with modifier

Used Require to enfore valid conditions in all of the modifiers above

Reentrancy attack (SWC-107) : protected at the contract level via inheritance of openzeppelin contract Reentrancy

Tx.orgin attacks (SWC-115) : avoided originator type attacks through use of msg.sender checks when comparing caller address.
