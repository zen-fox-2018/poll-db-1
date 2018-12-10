const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const argv = process.argv.slice(2)
const command = argv[0]
const options = argv.slice(1)

switch (command) {
  case "Politicians":
    let queryInsertPolitician = `
      INSERT INTO Politicians
      (name,party,location,grade_current)
      VALUES
      ("${options[0]}","${options[1]}","${options[2]}",${options[3]});
    `
    db.run(queryInsertPolitician, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(`sukses input data politician`);
      }
    })
    db.close();
    break;

  case "Voters":
    let queryInsertVoters = `
      INSERT INTO Voters
      (first_name,last_name,gender,age)
      VALUES
      ("${options[0]}","${options[1]}","${options[2]}",${options[3]});
    `
    db.run(queryInsertVoters, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(`sukses input data voter`);
      }
    })
    db.close();
    break;

  case "Votes":
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
    db.close();
    break;
  default: console.log(`silahkan gunakan dengan benar`);

}