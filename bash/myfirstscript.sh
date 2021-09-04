#!/bin/bash

# this is a script that outputs IP addresses and hostname
greeting='This is a script, hello!'
echo $greeting, thanks for joining us!
echo '$greeting, thanks for joining us. You owe me $20.'
echo "$greeting, thanks for joining us!"
echo "$greeting, you owe me \$20"

echo Machine Type: $MACHTYPE
echo Hostname: $HOSTNAME
echo Working Dir: $PWD
echo Session length: $SECONDS
echo Home dir: $HOME
