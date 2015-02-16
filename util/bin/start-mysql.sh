#!/usr/bin/env bash

docker run  -d -v /local/data/docker-mysql/mysql:/var/lib/mysql  -p 3307:3306  --name=100i-mysql tutum/mysql
