FROM postgres:latest

COPY init.sql /docker-entrypoint-initdb.d/10-init.sql

WORKDIR /home
COPY . .
RUN sh updateSampleDb.sh