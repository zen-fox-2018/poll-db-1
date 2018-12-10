//your code here
const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');
const createPoliticians = 
        `CREATE TABLE Politicians 
        (id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        party TEXT,
        location TEXT,
        grade_current REAL);
        `
const createVoters = 
        `CREATE TABLE Voters
        (id INTEGER PRIMARY KEY AUTOINCREMENT, 
        first_name TEXT,
        last_name TEXT,
        gender TEXT,
        age INTEGER)
        `
const createVotes = 
        `CREATE TABLE Votes
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId INTEGER,
        politicianId INTEGER,
        FOREIGN KEY (voterId) REFERENCES Voters(id),
        FOREIGN KEY (politicianId) REFERENCES Politicians(id)
        ) 
        `
db.serialize(function() {
    db.run(createPoliticians, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log('succeed')
        }
    })
    db.run(createVoters, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log('succeed')
        }
    })
    db.run(createVotes, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log('succeed')
        }
    })
})
db.close();

