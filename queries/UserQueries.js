const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/gora';
const pg = require('pg');

function insertUserIfDoesntExist() {
  var sql =
  `INSERT INTO users` +
  `(id)` +
  `SELECT ($1)` +
  `WHERE` +
  `NOT EXISTS (` +
  `SELECT id FROM users WHERE id = ($1)` +
  `)`
}

exports.insertUserId = (userId) => {
  const client = new pg.Client(connectionString);
  client.connect();
  client.query(insertUserIfDoesntExist, [userId], (err, results) => {
    if (err) {
      client.end()
      console.log(err);
      return {success: false, data: err};
    } else {
      return {
        success: true
      };
    }
  })
}