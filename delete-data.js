const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const argv = process.argv.slice(2)
const command = argv[0]
const options = argv.slice(1)

switch (command) {
  case "Politicians":
    let queryDeletePolitician = `
      DELETE FROM Politicianss
      WHERE id = ${options[0]};
    `
    db.run(queryDeletePolitician, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(`sukses delete data politician`);
      }
    })
    db.close();
    break;

  case "Voters":
    let queryDeleteVoters = `
    DELETE FROM Voters
    WHERE id = ${options[0]};
    `
    db.run(queryDeleteVoters, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(`sukses delete data voter`);
      }
    })
    db.close();
    break;

  case "Votes":
    let queryDeleteVotes = `
    DELETE FROM Voters
    WHERE id = ${options[0]};
    `
    db.run(queryDeleteVotes, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(`sukses delete data votes`);
      }
    })
    db.close();
    break;
  default: console.log(`silahkan gunakan dengan benar`);

}