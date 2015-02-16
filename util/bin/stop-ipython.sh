#!/bin/bash
if [ "$#" -ne 1 ]
then
    echo $#
    NAME=IPYTHON
else
    NAME=$1
fi

docker stop $NAME
docker rm $NAME
