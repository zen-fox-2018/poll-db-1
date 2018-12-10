const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const argv = process.argv.slice(2)
const command = argv[0]
const options = argv.slice(1)

switch (command) {
  case "Politicians":
    let queryUpdatePolitician = `
      UPDATE Politicians
      SET
      name = "${options[1]}",
      party = "${options[2]}",
      location = "${options[3]}",
      grade_current = ${options[4]}
      WHERE id = ${options[0]};
    `
    db.run(queryUpdatePolitician, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(`sukses update data politician`);
      }
    })
    db.close();
    break;

  case "Voters":
    let queryUpdateVoters = `
    UPDATE Voters
    SET
    first_name = "${options[1]}",
    last_name = "${options[2]}",
    gender = "${options[3]}",
    age = ${options[4]}
    WHERE id = ${options[0]};
    `
    db.run(queryUpdateVoters, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(`sukses update data voter`);
      }
    })
    db.close();
    break;

  case "Votes":
    let queryUpdateVotes = `
    UPDATE Voters
    SET
    voterId = "${options[1]}",
    politicianId = "${options[2]}"
    WHERE id = ${options[0]};
    `
    db.run(queryUpdateVotes, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(`sukses update data votes`);
      }
    })
    db.close();
    break;
  default: console.log(`silahkan gunakan dengan benar`);

}