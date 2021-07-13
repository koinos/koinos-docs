#!/bin/bash

set -e
set -x

# add travis ssh key
eval `ssh-agent -s`
ssh-add - <<< "${DEPLOY_SSH_KEY}"


# Remove .gitignore and replace with the production version
rm -f .gitignore
cp scripts/prodignore .gitignore
cat .gitignore


# Push all changes to the Linode production server
git push -f production HEAD:refs/heads/master
rsync -azP ./docs/_build/html/ koinos@173.255.232.131:/var/www/html
