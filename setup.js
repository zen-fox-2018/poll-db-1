const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

function createTable(query, queryname){
    db.run(query, function(err){
        if(err){
            console.log(err)
        }
        else {
            console.log(`sukses membuat tabel ${queryname}`)
        }
    })
}

const qPolitician = `CREATE TABLE Politicians(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text,
    party text,
    location text,
    grade_current REAL
) `

const qVoter = `CREATE TABLE Voters(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name text,
    last_name text,
    gender varchar(11),
    age INTEGER
) `

const qVote = `CREATE TABLE Votes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voterId INTEGER,
    politicianId INTEGER
)`
// createTable(qPolitician, 'Politicians')
// createTable(qVoter, 'Voter')
// createTable(qVote, 'Vote')

module.exports = db
