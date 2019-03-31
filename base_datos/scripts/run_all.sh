#!/bin/bash

for filename in *.sql; do
    mysql -u {username} -p{password} db_rimeim < $filename;
done
