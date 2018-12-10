
const db = require("./db");

db.serialize(function() {
    let createTableCandidates = `CREATE TABLE IF NOT EXISTS Politicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255),
        party Text,
        location TEXT,
        grade_current REAL
    );`

    db.run(createTableCandidates, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Successfully created candidates table!")
        }
    })

    let createTableVoters = `CREATE Table IF NOT EXISTS Voters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        gender VARCHAR(6),
        age INTEGER
    );`

    db.run(createTableVoters, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Successfully created table for Voters!")
        }
    })

    let createTableConjunction = `CREATE TABLE IF NOT EXISTS Votes (
        voterId INTEGER,
        politicianId INTEGER,
            FOREIGN KEY (voterId) REFERENCES Voters(id),
            FOREIGN KEY (politicianId) REFERENCES Candidates(id)
    );`

    db.run(createTableConjunction, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Successfully created table conunction!")
        }
    })
})