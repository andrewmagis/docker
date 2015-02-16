#!/bin/bash
if [ "$#" -ne 1 ]
then
    echo $#
    PORT=8880
else
    PORT=$1
fi


docker run -d -v /home/ISB/jearls/iPythonNotebooks/dbplay:/notebooks -v /home/ISB/jearls/pioneer100:/pythonpath:ro -v /local/data/:/local/data:ro -p $PORT:8888 -e "PASSWORD=100i" -e "PYTHONPATH=/pythonpath" --link 100i-mysql:mysql --name=ipython-notebook-$PORT 100i/ipython:dev

echo Started ipython-notebook-$PORT
