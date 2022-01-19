Design patterns used:
Inheritance - Openzeppelin contracts Ownable and reentrancy were inherited.

Oracles - using ceramic protocol to access IPFS data is not strictly an oracle. However, we access off-chain data via a protocol.

Access control design patterns- Ownable pattern was used to limit user profile creation to only the owner. Subsequently, role based access is also implemented via root user accounts. Only root user and those accounts which are linked to a root user will have access to a profile.