#!/bin/bash
if [ "$#" -ne 1 ]
then
    echo $#
    PORT=8880
else
    PORT=$1
fi

docker stop ipython-notebook-$PORT 
docker rm ipython-notebook-$PORT 
