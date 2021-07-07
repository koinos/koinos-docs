# add travis ssh key 
ssh-add - <<< "${DEPLOY_SSH_KEY}"

# Remove .gitignore and replace with the production version
rm -f .gitignore
cp scripts/prodignore .gitignore
cat .gitignore



# copy files inside the generated HTML directory to the webserver
ssh-keyscan hostname > known_hosts
rsync -e "ssh -o StrictHostKeyChecking=no" -azP ./docs/_build/html koinos@173.255.232.131:/var/www/html

