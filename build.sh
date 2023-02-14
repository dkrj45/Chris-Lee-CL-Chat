#!/bin/bash

npm run build --prefix ./front-end

docker build -t my-app .