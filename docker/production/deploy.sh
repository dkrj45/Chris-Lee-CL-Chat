#!/bin/bash

# Need to have the PEM file named "default.pem" in the same directory as this script

ssh -i default.pem $URL -t "cd /home/ec2-user/hosting/clchat/output && docker-compose down"

./build.sh

if [ -z "$URL" ]; then
    echo "URL is not set"
    exit 1
fi

scp -i default.pem clchat_app_production.tar.gz $URL:/home/ec2-user/hosting/clchat/clchat_app_production.tar.gz

ssh -i default.pem $URL -t "cd /home/ec2-user/hosting/clchat && tar xvf clchat_app_production.tar.gz && cd output && chmod 777 start.sh && ./start.sh"