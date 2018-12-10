const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const fs = require('fs')

db.serialize(function() {
  //Insert data
  let politicians = fs.readFileSync('./politicians.csv', 'utf8')
  let politiciansData = politicians.split('\n').slice(1)

  for (let i = 0; i < politiciansData.length; i++) {
    let politiciansDataSplit = politiciansData[i].split(',')
    let queryInsertPolitician = `
      INSERT INTO Politicians
      (name,party,location,grade_current)
      VALUES
      ("${politiciansDataSplit[0]}","${politiciansDataSplit[1]}","${politiciansDataSplit[2]}",${politiciansDataSplit[3]});
    `
    db.run(queryInsertPolitician, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(`sukses input data politician`);
      }
    })
  }


  let voters = fs.readFileSync('./voters.csv', 'utf8')
  let votersData = voters.split('\n').slice(1)

  for (let i = 0; i < votersData.length; i++) {
    let votersDataSplit = votersData[i].split(',')
    let queryInsertVoters = `
      INSERT INTO Voters
      (first_name,last_name,gender,age)
      VALUES
      ("${votersDataSplit[0]}","${votersDataSplit[1]}","${votersDataSplit[2]}",${votersDataSplit[3]});
    `
    db.run(queryInsertVoters, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(`sukses input data voter`);
      }
    })
  }

  let votes = fs.readFileSync('./votes.csv', 'utf8')
  let votesData = votes.split('\n').slice(1)

  for (let i = 0; i < votesData.length; i++) {
    let votesDataSplit = votesData[i].split(',')
    let queryInsertVotes = `
      INSERT INTO Votes
      (voterId,politicianId)
      VALUES
      (${votesDataSplit[0]},${votesDataSplit[1]});
    `
    db.run(queryInsertVotes, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(`sukses input data votes`);
      }
    })
  }
})

db.close();