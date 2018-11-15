const express = require('express');
const router = express.Router();
const request = require('request');
const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;
var dateFormat = require('dateformat');

exports.getWeek = (req, res) => {
  try {
    const selectedWeek = req.params.week
    fetch(`http://www.nfl.com/ajax/scorestrip?season=2018&seasonType=REG&week=${selectedWeek}`)
      .then(response => response.text())
      .then(xml => {
        return parseString(xml, function (err, result) {
          res.setHeader('Content-Type', 'application/json');
          return res.send(convertToReadableJson(result));
        });

      })
  } catch (err) {
    console.log('Error Getting Schedules', err)
    return res.status(500).send()
  }

};

exports.renderWeek = (req, res) => {
  try {
    fetch('http://www.nfl.com/ajax/scorestrip?season=2018&seasonType=REG&week=4')
      .then(response => response.text())
      .then(xml => {
        return parseString(xml, function (err, result) {
          res.render('partials/schedules',
            {
              schedule: convertToReadableJson(result)
            }
          )
        });
      })
  } catch (err) {
    console.log('Error Getting Schedules', err)
    return res.status(500).send()
  }

};

function convertToReadableJson(json) {
  var withWeekSum = convertWeek(json)
  return convertMatchUps(withWeekSum)
}

function convertWeek(json) {
  var week = {
    year: json.ss.gms[0].$.y,
    week: json.ss.gms[0].$.w
  }
  json.weekSummary = week;
  delete json.ss.gms[0].$;
  return json
}

function convertMatchUps(json) {
  var games = json.ss.gms[0].g.map(g => {
    return {

      // date: dateFormat(g.$.eid + "00"),
      date: parseDate(g.$.eid.substring(0, 8)),
      day: g.$.d,
      time: g.$.t,
      home: g.$.h,
      away: g.$.v,
      homeScore: parseInt(g.$.hs),
      awayScore: parseInt(g.$.vs),
      homeFullName: g.$.hnn,
      awayFullName: g.$.vnn
    }
  })
  json.games = games;
  delete json.ss;
  return json;
}

function parseDate(str) {
  var y = str.substr(0,4),
    m = str.substr(4,2) - 1,
    d = str.substr(6,2);
  var D = new Date(y,m,d);
  var date = (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? D : 'invalid date';
  return dateFormat(date, "fullDate")
}