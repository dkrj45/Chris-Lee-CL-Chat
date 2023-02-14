#!/bin/bash

rm -rf ./front-end/node_modules
rm -rf ./back-end/node_modules
docker build -t clchat_app .