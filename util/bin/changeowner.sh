#!/bin/bash

echo "useradd -u $1 tempuser"
echo "chown -R tempuser $2"
