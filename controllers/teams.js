const constants = require('../models/constants.js');
const connectionString = process.env.DATABASE_URL;
const pg = require('pg');
const fetch = require('node-fetch');
const picksQueries = require('../models/Picks.js');
const serverLoc = process.env.BASE_URL || 'http://localhost:8080'
const weeks = [...Array(19).keys()].slice(1);


exports.getAll = (req, res) => {
  var results = [];
  const client = new pg.Client(connectionString);
  client.connect();
  client.query('SELECT * FROM teams', (err, dbrs) => {
    results = dbrs.rows.map(c => c["abrv"])
    client.end()
    fetch(serverLoc + '/schedule/5')
      .then(response => response.json())
      .then(json => {
        res.render('picks',
          {
            weeks: weeks,
            schedule: json,
            teams: results,
            title: 'picks'
          }
        )
      })
  })
};

exports.submitPick = (req, res) => {
  const userId= req.session.passport.user;
  const week = req.body.week;
  const team = req.body.team;
  if (userId == null ) {
    res.redirect('/login')
  } else if (isErrorsInPickForm(week, team)){
    return res.json({success: false, data: "error in form"});
  } else {
    console.log(req.body)
    console.log(req.session.passport.user)
    return picksQueries.addUserPick(userId,2018,week,team, res)
  }

};

function isErrorsInPickForm(week, team) {
  if(weeks.includes(parseInt(week)) && constants.teams.includes(team) ){
    return false
  } else {
    return true
  }
}