let db = require(`./db`)

db.serialize(function () {
    let createPoliticianTable = `CREATE TABLE Politicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT,
        party TEXT,
        location TEXT,
        grade_current INTEGER
    );`

    let createVoterTable = `CREATE TABLE Voters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        gender TEXT,
        age INTEGER
    )`

    let createVotesTable = `CREATE TABLE Votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voter_id INTEGER,
        politician_id INTEGER,
        FOREIGN KEY (voter_id) REFERENCES Voters(id),
        FOREIGN KEY (politician_id) REFERENCES Politicians(id)
    );`

    db.run(createPoliticianTable, function (err) {
        err && console.log(err);
        
    })

    db.run(createVoterTable, function (err) {
        err && console.log(err);
        
    })

    db.run(createVotesTable, function (err) {
        err && console.log(err);
        
    })
})

db.close()

module.exports = db
