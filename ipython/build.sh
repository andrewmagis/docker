#!/bin/bash

cd pioneer100

git pull

cd ..

sudo docker build -t 100i/ipython:latest .
