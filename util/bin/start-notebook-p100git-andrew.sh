#!/bin/bash
if [ "$#" -ne 1 ]
then
    echo $#
    PORT=8889
else
    PORT=$1
fi

/usr/bin/docker run -d -v /home/ISB/amagis/iPythonNotebooks/dbplay:/notebooks -v /home/ISB/amagis/pioneer100:/pythonpath:ro -v /local/data/:/local/data:ro -p $PORT:8888 -e "PASSWORD=100i" -e "PYTHONPATH=/pythonpath" --link 100i-mysql:mysql --name=ipython-notebook-$PORT 100i/ipython:dev

echo Started ipython-notebook-$PORT
