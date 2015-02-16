#!/bin/bash
if [ "$#" -ne 1 ]
then
    echo $#
    PORT=8880
else
    PORT=$1
fi


sudo docker run -d -v /home/ISB/jearls/iPythonNotebooks/dbplay:/notebooks -p $PORT:8888 -e "PASSWORD=100i" --link 100i-mysql:mysql --name=ipython-notebook-$PORT 100i/ipython

echo Started ipython-notebook-$PORT
