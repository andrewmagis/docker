#!/bin/bash

cd pioneer100

git pull

cd ..

docker build -t 100i/ipython:dev .
