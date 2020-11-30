#!/bin/bash -e

# https://ubuntu.com/server/docs/backups-shell-scripts

# sudo mkdir -p /mnt/HC_Volume_8270604/av2021/files
# sudo sudo chown -R $USER:$USER /mnt/HC_Volume_8270604/av2021/files

# ./backup-upload.sh 
# 0 12 * * * /home/e66/backup-upload.sh

# What to backup. 
backup_files="/home/e66/backend/strapi/public/uploads"

# Where to backup to.
dest="/mnt/HC_Volume_8270604/av2021/files"

# Create archive filename.
TODAY=`date +"%Y%m%d%H%M"`
archive_file="$TODAY.tgz"

# Print start status message.
echo "Backing up $backup_files to $dest/$archive_file"
date
echo

# Backup the files using tar.
tar czvf $dest/$archive_file -C $backup_files .

# Print end status message.
echo
echo "Backup finished"
date

# Long listing of files in $dest to check file sizes.
ls -lh $dest

cd