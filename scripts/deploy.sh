# add travis ssh key 
ssh-add - <<< "${DEPLOY_SSH_KEY}"

# Remove .gitignore and replace with the production version
rm -f .gitignore
cp scripts/prodignore .gitignore
cat .gitignore

# copy files inside the generated HTML directory to the webserver
echo rsync -azPv ./docs/_build/html koinos@173.255.232.131:/var/www/html

