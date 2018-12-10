const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const fs = require('fs')

db.serialize(function() {

//Query Create Table
  let queryCreateTablePoliticians = `
    CREATE TABLE Politicians
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(30),
      party VARCHAR(30),
      location VARCHAR(30),
      grade_current REAL
    );
  `

  let queryCreateTableVoters = `
    CREATE TABLE Voters
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name VARCHAR(30),
      last_name VARCHAR(30),
      gender VARCHAR(30),
      age INTEGER
    );
  `

  let queryCreateTableVotes = `
    CREATE TABLE Votes
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      voterId INTEGER,
      politicianId INTEGER,
      FOREIGN KEY (voterId) REFERENCES Voters(id),
      FOREIGN KEY (politicianId) REFERENCES Politicians(id)
    );
  `

  // Eksekusi Create Table
  db.run(queryCreateTablePoliticians, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(`sukses membuat table Politicians`);
    }
  })

  db.run(queryCreateTableVoters, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(`sukses membuat table Voters`);
    }
  })

  db.run(queryCreateTableVotes, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(`sukses membuat table Votes`);
    }
  })

})

db.close();
