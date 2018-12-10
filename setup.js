//your code here
const db = require('./db')

db.serialize(function () {
    const createTablePoliticians = `
    CREATE TABLE IF NOT EXISTS Politicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100),
        party VARCHAR(50),
        location TEXT,
        grade_current REAL
    );`
    const createTableVoters = `
    CREATE TABLE  IF NOT EXISTS Voters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        gender VARCHAR(10),
        age INTEGER
    );
    `
    const createTableVotes = `
    CREATE TABLE IF NOT EXISTS Votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId INTEGER ,
        politicianId INTEGER,
        FOREIGN KEY (voterId) REFERENCES Voters(id),
        FOREIGN KEY (politicianId) REFERENCES Politicians(id)
    );

    `
    db.run(createTablePoliticians, function(err) {
        if (err) {
            console.log("error create tabe Politicians", err)
        }
    })
    db.run(createTableVotes, function(err) {
        if (err) {
            console.log("error create table votes", err)
        }
    })
    db.run(createTableVoters, function(err) {
        if (err) {
            console.log("error create table voters", err)
        }
    })
})

db.close()