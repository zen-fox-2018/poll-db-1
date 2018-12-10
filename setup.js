//your code here
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database.db');


let qTablePoliticians =
    `CREATE TABLE  IF NOT EXISTS Politicians (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT,
     party TEXT,
     location TEXT,
     grade_current REAL
     )`;

let qTableVoters =
    `CREATE TABLE IF NOT EXISTS Voters (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     first_name TEXT,
     last_name TEXT,
     gender TEXT,
     age INTEGER
     )`;

let qTableVotes =
    `CREATE TABLE IF NOT EXISTS Votes (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     voterId INTEGER,
     politicianId INTEGER,
     FOREIGN KEY (voterId) REFERENCES Voters(id),
     FOREIGN KEY (politicianId) REFERENCES Politicians(id)
     )`;

db.serialize(function (err) {
    if (err) {
        console.log(err)
    } else {
        db.all(qTablePoliticians, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('Create Table Politicians Succed');

            }
        })
        db.all(qTableVoters, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('Create Table Voters Succed');

            }
        })
        db.all(qTableVotes, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('Create Table Votes Succed');

            }
        })
    }

})
