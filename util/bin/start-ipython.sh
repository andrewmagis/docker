#!/bin/bash
if [ "$#" -ne 1 ]
then
    echo $#
    NAME=IPYTHON
else
    NAME=$1
fi


sudo docker run -it --link 100i-mysql:mysql --name=$NAME 100i/ipython ipython
