#!/bin/bash -e


# Stop generating errors for non-interactive shell
echo '####################################################'
echo 'git pull'

cd /home/e66/gui
git pull

yarn 
echo 'building'
yarn run build:production

cd 