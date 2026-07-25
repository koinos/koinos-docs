# Operations examples

`plan-update.sh` compares the current immutable Koinos checkout with a proposed
tag or commit in a second checkout. It is read-only and prints changes to
Compose, the environment template, the configuration bundle, and image tags.

Run it before maintenance:

```text
./plan-update.sh /opt/koinos-current /opt/koinos-proposed
```

Apply upgrades manually only after preserving local configuration, encrypted
keys, peer identity, and a recoverable data snapshot.
