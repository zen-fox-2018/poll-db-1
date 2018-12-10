const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');

function readData(path, callback) {
    fs.readFile(path, 'UTF-8', function(err, data) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, data)
        }
    });
}


function parsingPoliticians() {
    readData('politicians.csv', function(err, data) {
        if (err) {
            callback(err)
        } else {
            let theData = data.split('\n').slice(1)
            db.serialize(function(){
            for (let i = 0; i <= theData.length-1; i++) {
                let inputData = theData[i].split(',')
                db.run(`INSERT INTO Politicians (name,party,location,grade_current)
                VALUES ("${inputData[0]}", "${inputData[1]}", "${inputData[2]}", ${Number(inputData[3])});`), function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('succeed')
                    }       
                }
               
            }   
        })
        }
    })
}  

function parsingVoters() {
    readData('voters.csv', function(err, data) {
        if (err) {
            callback(err, null)
        } else {
            db.serialize(function(){
            let theData = data.split('\n').slice(1)
            for (let i = 0; i <= theData.length-1; i++) {
                let inputData = theData[i].split(',')
                if (inputData.length != 0) {
                    db.run(`INSERT INTO Voters (first_name,last_name,gender,age)
                    VALUES ("${inputData[0]}", "${inputData[1]}", "${inputData[2]}", ${Number(inputData[3])});`), function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('succeed')
                        }       
                    }
                }       
            }
            }) 
        } 
    })
}

function parsingVotes() {
    readData('votes.csv', function(err, data) {
        if (err) {
            callback(err, null)
        } else {
            let theData = data.split('\n').slice(1)
            db.serialize(function(){
            for (let i = 0; i <= theData.length-1; i++) {
                let inputData = theData[i].split(',')
                db.run(`INSERT INTO Votes (voterId,politicianId)
                VALUES (${Number(inputData[0])}, ${Number(inputData[1])});`), function(err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('succeed')
                    }       
                }
            }
            })
        }     
    })   
}
// parsingPoliticians()
// parsingVoters()
// parsingVotes()
const queryPoliticians = `SELECT * FROM Politicians`
const queryVoters = `SELECT * FROM Voters`
const queryVotes = `SELECT * FROM Votes`
db.all(queryVotes, function(err, rows) {
    if (err) {
        console.log(err)
    } else {
        console.log(rows)
    }
})
// db.close();

