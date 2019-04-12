#!/bin/bash

file_1="db_rimeim_pruebas.sql"
file_2="db_rimeim.sql"
file_3="sql_compile.sql"

for filename in *.sql; do
    if [ "$filename" != "$file_1" ] && [ "$filename" != "$file_2" ] && [ "$filename" != "$file_3" ]; then
        cat $filename >> sql_compile.sql
        echo "" >> sql_compile.sql
        echo "" >> sql_compile.sql
    fi
done

