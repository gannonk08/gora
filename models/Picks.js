const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/gora';
const pg = require('pg');


exports.addUserPick = (userId, season, week, team, res) => {
  const insertSql = `INSERT INTO picks (`
    + `user_id,`
    + `season,`
    + `week,`
    + `pick_to_lose`
    + `) VALUES (($1), ($2), ($3), ($4));`

  const selectSql = `SELECT * FROM picks`
    + ` WHERE user_id = ($1)`
    + ` AND season = ($2)`
    + ` AND week = ($3)`
    + ` AND pick_to_lose = ($4)`
    + ` ORDER BY created_on DESC LIMIT 1;`

  const results = [];
  const client = new pg.Client(connectionString);
  client.connect();
  client.query(insertSql, [userId, season, week, team], (err, results) => {
    if (err) {
      client.end()
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    var query = client.query(selectSql, [userId, season, week, team], (err, dbrs) => {
      if (err) {
        client.end()
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      return res.json({
        success: true,
        data: {
          team: dbrs.rows[0].pick_to_lose,
          week: dbrs.rows[0].week
        }
      });

    });
  })

};
