# hellospaces-backend

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
yarn build
yarn start:production
```
==> /api /dashboard

### CMS
Zukunft


### Conference GUI

cd /home/e66
```
git clone https://github.com/efechq/hellospace-gui.git gui

cd gui
git pull
yarn
yarn build
```

# Backups

TODO

## Backup uploads to volume

## Backup mongo db to volume


# Development

## Connect to mongo
Backend is mongo. Change the env to connect to local or remote mongo see mong

ssh -N -L 27018:127.0.0.1:27017 e66@SERVERNAME

set the .env file to your settings


# HINTS


Installation:
* Floating IP: https://docs.hetzner.com/de/cloud/floating-ips/persistent-configuration/
* New E66 User & UFW: https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04 
* Mongo: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04-source

```
sudo systemctl status mongod
sudo systemctl start mongod
sudo systemctl stop mongod
sudo systemctl restart mongod
```
* MongoDB Backup
__TODO__ https://www.digitalocean.com/community/tutorials/how-to-set-up-scheduled-logical-mongodb-backups-to-digitalocean-spaces
sudo mkdir /mnt/HC_Volume_8036741/mongo_dev_backup
mongodump --db test --archive=./backup/test_dump.gz --gzip

* Mongo Create Test DB
````
mongo 
db.restaurants.insert({'name': 'Pizzeria Sammy'})

* Mongo Super Admin
https://docs.mongodb.com/guides/server/auth/

```
use admin
db.createUser(
  {
    user: "hs21",
    pwd: "SuperUserHelloSpaces2021",
    roles: [ "root" ]
  }
)

db.shutdownServer()
exit
sudo systemctl restart mongod
```


