const fs = require("fs")
const sqlite3 = require('sqlite3').verbose()
const db = require('./setup.js')

function readFile(path, cb) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, data)
        }
    })
}

function parsePoliticians() {
    db.serialize(function () {
        readFile('./politicians.csv', function (err, data) {
            if (err) {
                console.log(err, 'error')
            } else {
                let parsedData = data.split("\n").slice(1)

                for (let i = 0; i < parsedData.length; i++) {
                    let splitData = parsedData[i].split(',')
                    let insertData =
                        `INSERT INTO Politicians (name,party,location,grade_current)
                     VALUES('${splitData[0]}','${splitData[1]}', '${splitData[2]}', ${splitData[3]});`

                    db.run(insertData, function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("success add data")
                        }
                    })
                }
            }
        })
    })
}

function parseVoters() {
    db.serialize(function () {
        readFile('./voters.csv', function (err, data) {
            if (err) {
                console.log(err, 'error')
            } else {
                let parsedData = data.split("\n").slice(1)

                for (let i = 0; i < parsedData.length; i++) {
                    let splitData = parsedData[i].split(',')
                    let insertData =
                        `INSERT INTO voters (first_name, last_name, gender, age)
                     VALUES('${splitData[0]}','${splitData[1]}', '${splitData[2]}', ${splitData[3]});`

                    db.run(insertData, function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("success fetching data")
                        }
                    })
                }
            }
        })
    })
}

function parseVotes() {
    db.serialize(function () {
        readFile('./votes.csv', function (err, data) {
            if (err) {
                console.log(err, 'error')
            } else {
                let parsedData = data.split("\n").slice(1)

                for (let i = 0; i < parsedData.length; i++) {
                    let splitData = parsedData[i].split(',')
                    let insertData =
                        `INSERT INTO votes (voterID, politicianID)
                     VALUES(${splitData[0]},${splitData[1]});`

                    db.run(insertData, function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("success fetching data")
                        }
                    })
                }
            }
        })
    })
}

function update(table_name, column_name, value, id){
    let update =
    `UPDATE ${table_name} SET ${column_name} = '${value}' WHERE ${table_name}.id = ${id};`

    db.run(update, function(err){
        if(err){
            console.log(err, 'error')
        }   else{
            console.log('update successful')
        }
    })
}

function deletion(table_name, column_name, value){
    let deletion = 
    `DELETE FROM ${table_name} WHERE ${column_name} = ${value}`

    db.run(update, function(err){
        if(err){
            console.log(err, 'error')
        }   else{
            console.log('delete successful')
        }
    })

}

function showRepublicansByGrade(){
    let query  = `SELECT name, party, grade_current FROM Politicians 
                  WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`
    
    db.all(query, function(err, rows){
       if(err){
           console.log(err, 'error')
        }  else{
            console.log(rows)
        }
    })
}

function showOlympiaSnoweVote(){
    let query = 
    `SELECT COUNT (Votes.voterID) AS TotalVote, name 
    FROM Politicians
    INNER JOIN Votes ON Votes.politicianID = Politicians.id
    WHERE politicians.name = 'Olympia Snowe'`

    db.all(query, function(err, rows){
        if(err){
            console.log(err)
        }   else{
            console.log(rows)
        }
    })
}

function showAdam(){
    let query = 
    `SELECT COUNT (Votes.voterID) AS TotalVote, name 
    FROM Politicians
    INNER JOIN Votes ON Votes.politicianID = Politicians.id
    WHERE Politicians.name LIKE '%Adam%' GROUP BY Politicians.name` 

    db.all(query, function(err, rows){
        if(err){
            console.log(err)
        }   else{
            console.log(rows)
        }
    })
}

function HighestVotes(){
    let query = 
    `SELECT COUNT (Votes.voterID) AS TotalVote, name, party, location
    FROM Politicians
    INNER JOIN Votes ON Votes.politicianID = Politicians.id
    GROUP BY Politicians.name
    ORDER BY TotalVote DESC LIMIT 3` 

    db.all(query, function(err, rows){
        if(err){
            console.log(err)
        }   else{
            console.log(rows)
        }
    })

}

function showVoters(){
    let query = `
    SELECT 
        first_name,
        last_name,
        gender,
        age
    FROM Voters 
    INNER JOIN Votes ON Votes.voterID = Voters.id
    INNER JOIN Politicians ON Votes.politicianID = Politicians.id
    WHERE Politicians.name = 'Olympia Snowe' `

    db.all(query, function(err, rows){
        if(err){
            console.log(err)
        }   else{
            console.log(rows)
        }
    })
}


// update('Politicians', 'party', 'D', 1)
// parsePoliticians()
// parseVoters()
// parseVotes()

// showRepublicansByGrade()
// showOlympiaSnoweVote()
// showAdam()
// HighestVotes()
// showVoters()


