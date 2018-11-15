const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/gora';
const pg = require('pg');

const client = new pg.Client(connectionString);
client.connect();
client.query('SELECT * FROM TEAMS', (err, res) => {
    console.log(err ? err.stack : res) // Hello World!
    client.end()
})