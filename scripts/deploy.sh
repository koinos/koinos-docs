#!/bin/bash

set -e
set -x

# add travis ssh key
eval `ssh-agent -s`
# ssh-add - <<< "${DEPLOY_KEY}"
# ssh-add -L


# Remove .gitignore and replace with the production version
rm -f .gitignore
cp scripts/prodignore .gitignore


# Push all changes to the Linode production server
rsync -azP ./docs/_build/html/ koinos@173.255.232.131:/var/www/html
