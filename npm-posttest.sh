#!/bin/bash
if [ -z $NODE_ENV ] || [ $NODE_ENV != "production" ]
  then
    # echo "Destroying test database"

    if (! mysqladmin -u root drop boundrydb_test -f)
      then echo "Failed to drop database.  Perhaps it doesn't exist?" && exit 1
    fi

    if (! mysql.server stop)
      then echo "Failed to stop mysql server" && exit 1
    fi

    # echo "Test database successfully destroyed!"
fi