#!/bin/bash

# Source directory (trailing slash: contents of the directory will be copied, not the directory itself)
source_dir="/home/nekros/programming/margaux-portfolio/pocketbase/"

# Destination directory on the remote host
destination_dir="/root/pb"

# Relative paths to exclude
exclude_dir_1="pb_data"
exclude_dir_2="pb_migrations"

# Remote host
remote_host="root@178.62.204.252"

rsync -av --exclude="$exclude_dir_1" --exclude="$exclude_dir_2" "$source_dir" "$remote_host:$destination_dir"
