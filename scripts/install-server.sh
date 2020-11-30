#!/bin/bash -e

URL=av2021.hellospaces.de
CERT_EMAIL=apps@efec.de

# Stop generating errors for non-interactive shell
echo '####################################################'
echo 'debconf debconf/frontend select Noninteractive' | sudo debconf-set-selections

# perform standard ubuntu updates
echo '####################################################'
echo "Doing updates to system"
sudo apt-get update -q > /dev/null
sudo apt-get upgrade -y -q > /dev/null
sudo apt-get dist-upgrade -y -q > /dev/null
sudo apt-get autoremove -y -q > /dev/null

# add 3rd party repos
echo '####################################################'
echo "INstal git , Adding Node.js and Yarn repos"
sudo apt install git
## node
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - > /dev/null
## yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - > /dev/null
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list > /dev/null

# install required packages for strapi
echo '####################################################'
echo "Installing Strapi package depends"
sudo apt-get update -q > /dev/null
sudo apt-get install -y -q nodejs yarn build-essential libpng-dev node-gyp > /dev/null

# install nginx
echo '####################################################'
echo "Installing Nginx"
sudo apt-get install -y -q nginx > /dev/null
# sudo mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.original
# sudo mv /tmp/nginx/nginx.conf.new /etc/nginx/nginx.conf
# sudo systemctl -q enable nginx
# sudo systemctl -q restart nginx

# add pm2 globally
echo '####################################################'
echo "Setting up PM2"
sudo npm install pm2@latest -g
#sudo yarn global add pm2 > /dev/null

sudo env PATH=$PATH:/usr/bin /usr/local/share/.config/yarn/global/node_modules/pm2/bin/pm2 startup ubuntu -u e66 --hp /home/e66
pm2 save

# add certbot
echo '####################################################'
echo "Installing cerbot"
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
# sudo certbot --noninteractive --agree-tos --renew-by-default --email CERT_EMAIL --nginx -d URL
# sudo certbot --noninteractive --agree-tos --renew-by-default --email apps@efec.de --nginx -d av2021.hellospaces.de


# Only valid for 90 days, test the renewal process with
# certbot renew --dry-run

# install mongo 
echo '####################################################'
echo "Installing Mongo"
sudo apt install -y mongodb
sudo systemctl status mongodb
mongo --eval 'db.runCommand({ connectionStatus: 1 })'

# install PostgreSQL
# sudo apt-get install -y -q postgresql postgresql-contrib > /dev/null