# hellospaces-backend

This the strapi based backend for hellospaces.



## Run
```
yarn develop
yarn start
```

### Setup on your machine

* Install mongo and run locally https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
* Create user
```
use admin
db.createUser(
  {
    user: "hs21",
    pwd: "SuperUserHelloSpaces2021",
    roles: [ "root" ]
  }
)
```

## Connect to mongo
Backend is mongo. Change the env to connect to local or remote mongo see mong

ssh -N -L 27018:127.0.0.1:27017 e66@116.203.0.227

set the .env file to your settings


### Setup and bootstrap

An admin user will created in bootstrap.js with credentials from .env

## preload of data



### Add api initialy
strapi generate:api schedule title:string
strapi generate:api speaker title:string



# Running Docker

rm node_modules
```
docker-compose up
```

see docker host ip e.g. 192.168.65.0


## Mongo installation log

### Mongo installed on docker host on hetzner

Mongo was installed by following this tutorial: https://www.thepolyglotdeveloper.com/2019/01/getting-started-mongodb-docker-container-deployment/

https://console.hetzner.cloud/projects/547930/servers/7675246/overview

IP 49.12.115.96

Mongo Volume : DockerhostVolume


* Server: hsdev01
* Volume: hs_vol01
* Network: hs_net_dev01
* Floating: IP

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


