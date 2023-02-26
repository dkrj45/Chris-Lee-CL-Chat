#!/bin/bash

rm -rf output
mkdir -p output
cd ../../
rm -rf back-end/node_modules
rm -rf front-end/node_modules
docker buildx build -t clchat_app --platform linux/arm64 .
cd docker/production

docker save clchat_app > ./output/clchat_app.tar

cp start.sh output/start.sh
cp docker-compose.yml output/docker-compose.yml
cp app.env output/app.env
cp database.env output/database.env

tar cvzf clchat_app_production.tar.gz output