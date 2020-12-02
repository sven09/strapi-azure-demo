# hellospaces-backend


## Updating the server and the gui

Login to the server
```
ssh -i .ssh/e66_id_rsa e66@av2021.hellospaces.de
````

Update backend (Strapi + CMS)
```
./backup-upload.sh
./backup-mongo.sh

./update-backend.sh
```

Update gui
```
./update-gui.sh
```

Cronjobs for backup
```
crontab -e

journalctl -u cron.service
```


## Installation 

Setup the system according to 

https://dev.to/jackrkelly/create-a-full-stack-web-application-using-react-strapi-nginx-mongodb-and-digitalocean-bkh


Step 5:
use admin
db.createUser(
  {
    user: "hs21",
    pwd: "SuperUserHelloSpaces2021",
    roles: [ "root" ]
  }
)


Install pm2 as service
https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04

pm2 list

## Prepare server 
cd /home/e66
```
git clone  https://github.com/efechq/hellospaces-backend.git backend
```

### NGINX config
cp /home/e66/backend/configs/server.conf /etc/nginx/sites-available/default
sudo nano /etc/nginx/sites-available/default

==> Server Namen anpassen
sudo nginx -t
sudo systemctl restart nginx

### API + DASHBOARD

cd /home/e66/backend/strapi
.env anpassen
yarn
yarn build:production
NOT    yarn start:production
NODE_ENV=production pm2 start server.js

```
==> /api /dashboard

### CMS
Zukunft
cd /home/e66/backend/cms
yarn build

### Conference GUI

cd /home/e66
```
git clone https://github.com/efechq/hellospace-gui.git gui

cd gui
git pull
yarn
yarn build
```

git config --global credential.helper "cache --timeout=15500"


## Connect to mongo
Backend is mongo. Change the env to connect to local or remote mongo see mong

ssh -N -L 27018:127.0.0.1:27017 e66@av2021.hellospaces.de

set the .env file to use your settings

# Backup

scripts/backup-upload.sh 
scripts/backup-mongo.sh 

