#!/bin/bash

set -e
set -x

COMMIT_HASH=`git rev-parse --short HEAD`

git clone https://${GITHUB_USER_TOKEN}@github.com/koinos/koinos-docs-deploy.git

pushd koinos-docs-deploy

mkdir -p docs
rsync -rvm $TRAVIS_BUILD_DIR/docs/ ./docs

git add docs

git commit -m "Update for koinos-docs commit $COMMIT_HASH"
git push https://${GITHUB_USER_TOKEN}@github.com/koinos/koinos-docs-deploy.git

popd
