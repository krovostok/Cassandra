#!/bin/bash

sudo docker cp init.cql nosql-cassandra:/init.cql
sudo docker exec -i nosql-cassandra cqlsh -f /init.cql