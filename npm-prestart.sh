#!/bin/bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" && brew install mysql &&

if [ -z $NODE_ENV ] || [ $NODE_ENV != "production" ]
  then 
    # echo "Creating test database"

    if (! mysql.server start)
      then echo "Failed to start mysql server" && exit 1
    fi

    if (! mysqladmin -u root create boundrydb_test)
      then echo "Could not create database.  Perhaps it exists already?" && exit 1
    fi

    # echo "Test database successfully created!"
fi