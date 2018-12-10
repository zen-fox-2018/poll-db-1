const db = require('./dbConnection.js');
const fs = require('fs');

function readFileSync(path) {
  return fs.readFileSync(path, 'utf8')
}

// function readFile(path, callback) {

// }

function insertFromCsv(file) {
    let splitFile = file.split('\n').slice(1).map( a => a.split(','))
    return splitFile
}

function parsePoliticians(file) {
  for (let i = 0 ; i < file.length ; i++) {
    if (file[i][0] !== '') {
      let qPolitician = `
        INSERT INTO Politicians (name, party, location, grade_current)
        VALUES ("${file[i][0]}", "${file[i][1]}", "${file[i][2]}", ${Number(file[i][3])});`
      db.run(qPolitician, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log(`Success ${i+1}`)
        }
      })
    }
  }
}

function parseVoters(file) {
  for (let i = 0 ; i < file.length ; i++) {
    if (file[i][0] !== '') {
      let qVoters = `
        INSERT INTO Voters (first_name, last_name, gender, age)
        VALUES ("${file[i][0]}", "${file[i][1]}", "${file[i][2]}", ${Number(file[i][3])});`
      db.run(qVoters, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log(`Success ${i+1}`)
        }
      })
    }
  }
}

function parseVotes(file) {
  for (let i = 0 ; i < file.length ; i++) {
    if (file[i][0] !== '') {
      let qVotes = `
        INSERT INTO Votes (voterId, politicianId)
        VALUES (${Number(file[i][0])}, ${Number(file[i][1])});`
      db.run(qVotes, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log(`Success ${i+1}`)
        }
      })
    }
  }
}

let arrayPoliticians = insertFromCsv(readFileSync('./politicians.csv')); //politicians
let arrayVoters = insertFromCsv(readFileSync('./voters.csv')); // voters
let arrayVotes = insertFromCsv(readFileSync('./votes.csv')) // votes

db.serialize(function() {
  parsePoliticians(arrayPoliticians)
  parseVoters(arrayVoters)
  parseVotes(arrayVotes)
}) 