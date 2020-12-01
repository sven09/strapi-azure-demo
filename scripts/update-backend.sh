#!/bin/bash -e


# Stop generating errors for non-interactive shell
echo '####################################################'
echo 'git pull'

cd /home/e66/backend
git pull

cd /home/e66/backend/strapi

yarn 
echo 'building'
yarn run build:production

echo 'stopping service'
pm2 stop server
echo 'starting service'
yarn run start:pm2


cd /home/e66/backend/cms
yarn 
yarn run build:production