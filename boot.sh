#!/bin/sh
while true; do
    flask db upgrade
    if [[ "$?" == "0" ]]; then
        break
    fi
    echo Upgrade command failed, retrying in 15 secs...
    sleep 15
done
flask translate compile
exec gunicorn -b :5000 --access-logfile - --error-logfile - minerva:app