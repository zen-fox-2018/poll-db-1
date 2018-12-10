const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database.db');

function runInsertPoliticians() {

    let politician = fs.readFileSync('./politicians.csv', 'utf8')
    let convertPolitician = politician.split('\n').splice(1)

    for (let i = 0; i < convertPolitician.length; i++) {

        let input = convertPolitician[i].split(',')

        let insertPoliticians =
            `INSERT INTO Politicians (name, party, location, grade_current)
             VALUES ("${input[0]}", "${input[1]}", "${input[2]}", ${Number(input[3])})`

        db.all(insertPoliticians, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log(`Insert data Politicians ke ${i+1} Success`);
            }
        })
    }
}

function runInsertVoters() {

    let voters = fs.readFileSync('./voters.csv', 'utf8')
    let convertVoters = voters.split('\n').splice(1)
    // console.log(convertVoters.length);
    // console.log(convertVoters[convertVoters.length-1])
    // console.log(convertVoters[0]);
    for (let i = 0; i < convertVoters.length; i++) {

        let input = convertVoters[i].split(',')

        let insertVoters =
            `INSERT INTO Voters (first_name, last_name, gender, age)
             VALUES ("${input[0]}", "${input[1]}", "${input[2]}", ${Number(input[3])})`

        db.all(insertVoters, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log(`Insert data Voters ke ${i+1} Success`)
            }
        })
    }
}

function runInsertVotes() {

    let votes = fs.readFileSync('./votes.csv', 'utf8')
    let convertVotes = votes.split('\n').splice(1)

    // console.log(convertVotes);
    for (let i = 0; i < convertVotes.length; i++) {

        let input = convertVotes[i].split(',')

        let inserVotes =
            `INSERT INTO Votes (voterId, politicianId)
             VALUES (${Number(input[0])},${Number(input[1])})`

        db.all(inserVotes, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log(`Insert data Votes ke ${i+1} Success`)
            }
        })
    }


}


db.serialize(function (err) {
    if (err) {
        console.log(err)
    } else {
        runInsertPoliticians()
        runInsertVoters()
        runInsertVotes()
    }
})
