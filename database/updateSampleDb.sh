DCON=$(sudo docker container ls |  grep postgres | awk '{print $1;}')
sudo docker exec -it $DCON /bin/sh
psql -U minerva -d minervaDB -f sampleDatabase.sql
exit
