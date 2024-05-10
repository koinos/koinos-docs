---
icon: fontawesome/solid/terminal
---

# Koinos CLI
However, it does not have remote functionality built in. We can easily add remote functionality using socat. Socat is available on most Linux distros using their default package manager.

To use socat, we will need to create a wrapper script around the CLI that will parse payloads and correctly send them to the CLI. Please note that commands are going to be sent to the CLI as command line arguments rather than through the CLI's shell. This means that they could be logged by the host system in bash history or some other system log. If you are using the CLI for wallet management, please be sure to secure the system hosting the wallet to avoid leaking potentially valuable data.

``` bash linenums="1"
#!/bin/bash

DONE=false
OPTIONS=""

touch $$.tmp

until $DONE; do
  read || DONE=$TRUE
  if ! $DONE; then
    echo "$REPLY" >> $$.tmp
  fi
done

./build/koinos-cli -t -f $$.tmp

rm $$.tmp
```

This script assumes the CLI executable is in the same directory as the wrapper script. Change that as needed. You can download binaries of the CLI from the current release on [GitHub](https://github.com/koinos/koinos-cli/releases), or you can build from source by cloning the repo and building with `go build -o koinos-cli cmd/cli/main.go`. The release and the repo both contain `.koinosrc`. This rc file is automatically read and executed when starting the CLI. For this setup it is advised not to have the rc file present on the machine with the CLI and instead send those commands explicitly to the CLI.

This script will read from stdin line by line, parsing each line as its own command. They will then be passed in to the CLI as individual commands, executed, and the CLI will terminate. Each request will be executed on a new process so you do not need to worry about concurrency within the CLI, but you do need to pay attention to concurrency between your requests. For example, if you request two transfers from the same wallet at the same time, each instance of the CLI may fetch the same nonce and return transactions with conflicting nonces. You will need to implement sufficient synchronization external the CLI.

On the machine running the CLI:

```
socat TCP-LISTEN:1234,fork,reuseaddr EXEC:./koinos-cli-exec.sh
```

On another machine:

```
cat commands.txt | socat - TCP:localhost:1234
```

Where `commands.txt` contains the commands you want to execute. In this example, we are using socat to send the commands as well. You tools other than socat to send the commands, such as netcat, or even curl with the telnet protocol.
