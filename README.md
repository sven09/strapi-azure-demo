# hellospaces-backend


# Running Docker

rm node_modules
```

docker-compose up
```

see docker host ip e.g. 192.168.65.0


## Mongo installation

### Mongo installed on docker host on hetzner

Mongo was installed by following this tutorial: https://www.thepolyglotdeveloper.com/2019/01/getting-started-mongodb-docker-container-deployment/

https://console.hetzner.cloud/projects/547930/servers/7675246/overview

IP 49.12.115.96

Mongo Volume : DockerhostVolume




# Mongo Installation

## Dev

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

* Access via Mongo DB Compass
