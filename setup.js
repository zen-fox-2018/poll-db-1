const db = require('./db')

db.serialize(() => {
    let qPoliticiansTable = `
    CREATE TABLE IF NOT EXISTS Politicians 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        party TEXT,
        location TEXT,
        grade_current REAL
    )`
    let qVotersTable = `
    CREATE TABLE IF NOT EXISTS Voters
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        gender VARCHAR,
        age INTEGER
    )`
    let qVotesTable = `
    CREATE TABLE IF NOT EXISTS Votes
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        VoterId INTEGER,
        PoliticianId INTEGER,
        FOREIGN KEY (VoterId) REFERENCES Voters(id),
        FOREIGN KEY (PoliticianId) REFERENCES Politicians(id)
        
    )`

    db.run(qPoliticiansTable, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Politicians table created');
        }
    })
    db.run(qVotersTable, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Voters table created');
        }
    })
    db.run(qVotesTable, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Votes table created');
        }
    })
})