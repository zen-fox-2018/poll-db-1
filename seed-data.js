const fs = require('fs')
const db = require('./setup.js')

function readFile(file, callback) {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            (err, null)
        } else {
            callback(null, data)
        }
    })
}

function parsingPoliticiansFile() {
    db.serialize(function() {
        readFile('./politicians.csv', (err, politiciansData) => {
            if (err) {
                callback(err, null) 
            } else {
                const dataSplit = politiciansData.split('\n').slice(1)
                for (let i = 0; i < dataSplit.length; i++) {
                let dataReady = dataSplit[i].split(',')
                db.run(`INSERT INTO Politicians(name, party, location, grade_current)
                        VALUES (
                        "${dataReady[0]}", 
                        "${dataReady[1]}", 
                        "${dataReady[2]}", 
                        ${dataReady[3]});
                        `)    
                }
            }
        })
    })
}
// bikin function update berdasarkan nama table

function parsingVotersFile(file) {
    db.serialize(function() {
        readFile('./voters.csv', (err, votersData) => {
            if (err) {
                callback(err, null) 
            } else {
                const dataSplit = votersData.split('\n').slice(1)
                for (let i = 0; i < dataSplit.length; i++) {
                let dataReady = dataSplit[i].split(',')
                db.run(`INSERT INTO Voters(first_name, last_name, gender, age)
                        VALUES (
                        "${dataReady[0]}", 
                        "${dataReady[1]}", 
                        "${dataReady[2]}", 
                        ${dataReady[3]});
                        `)         
                }
            }
        })
    })
}

function parsingVotesFile(file) {
    db.serialize(function() {
        readFile('./votes.csv', (err, votesData) => {
            if (err) {
                callback(err, null) 
            } else {
                const dataSplit = votesData.split('\n').slice(1)
                for (let i = 0; i < dataSplit.length; i++) {
                let dataReady = dataSplit[i].split(',')   
                db.run(`INSERT INTO Votes(voterId, politicianId)
                        VALUES (
                        ${dataReady[0]}, 
                        ${dataReady[1]}); 
                        `)                          
                }
            }
        })
    })
}

parsingPoliticiansFile()
parsingVotersFile()
parsingVotesFile()