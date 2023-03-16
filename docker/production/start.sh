#!/bin/bash

# Load the image from the tar file
docker load < clchat_app.tar

# Run the docker-compose file 
docker-compose up -d