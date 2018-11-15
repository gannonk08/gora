`CREATE ROLE kgannon WITH LOGIN PASSWORD 'Broncos25!';
CREATE DATABASE gora;
GRANT ALL PRIVILEGES ON DATABASE gora TO kgannon;`

Dump local db into prod:

`heroku pg:push gora DATABASE_URL --app gora18`