const db = require('./dbConnection.js');
const fs = require('fs');


const politicians = fs.readFileSync('./politicians.csv', 'utf8');
const voters = fs.readFileSync('./voters.csv', 'utf8');
const votes = fs.readFileSync('./votes.csv', 'utf8');

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

function insertData(database, newData) {
  if (database === 'Politicians') {
    let query = `
      INSERT INTO Politicians (name, party, location, grade_current)
      VALUES ("${newData[0]}", "${newData[1]}", "${newData[2]}", ${Number(newData[3])})
    `
  } else if (database === 'Voters') {
    let query = `
      INSERT INTO Voters (first_name, last_name, gender, age)
      VALUES ("${newData[0]}", "${newData[1]}", "${newData[2]}", ${Number(newData[3])})
    `
  } else if (database === 'Votes') {
    let query = `
      INSERT INTO Votes (voterId, politicianId)
      VALUES (${Number(newData[0])}, ${Number(newData[1])})
    `
  }

  db.run(query, (err) => {
    if (err) {
      console.log('Insert Gagal')
    } else {
      console.log('Insert Berhasil')
    }
  })
}

function updateData(database, id,  newData) {
  if (database === 'Politicians') {
    let query = `
      UPDATE Politicians
      SET name = "${newData[0]}", party = "${newData[1]}", location = "${newData[2]}", grade_current = ${Number(newData[3])}
      WHERE id = ${id}; 
    `
  } else if (database === 'Voters') {
    let query = `
      UPDATE Voters
      SET first_name = "${newData[0]}", last_name = "${newData[1]}", gender = "${newData[2]}", age = ${Number(newData[3])}
      WHERE id = ${id}; 
    `
  } else if (database === 'Votes') {
    let query = `
      UPDATE Votes
      SET voterId = ${Number(newData[0])}, politicianId = ${Number(newData[1])}
      WHERE id = ${id}; 
    `
  }

  db.run(query, (err) => {
    if (err) {
      console.log('Update Gagal')
    } else {
      console.log('Update Berhasil')
    }
  })
}

function deleteData(database, id) {
  if (database === 'Politicians') {
    let query = `
      DELETE FROM Politicians WHERE id = ${id};
    `
  } else if (database === 'Voters') {
    let query = `
      DELETE FROM Voters WHERE id = ${id};
    `
  } else if (database === 'Votes') {
    let query = `
      DELETE FROM Votes WHERE id = ${id}; 
    `
  }

  db.run(query, (err) => {
    if (err) {
      console.log('Delete Gagal')
    } else {
      console.log('Delete Berhasil')
    }
  })
}

let queryPartyR = `
  SELECT name, party, grade_current
  FROM Politicians
  WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;
`
// db.all(queryPartyR, (err, rows) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(rows)
//   }
// })

// let qCountOlympia = `
//   SELECT COUNT(votesId) AS totalVote, name
//   FROM Votes
//   INNER JOIN Politicians ON Votes.politicianId = Politicians.id
//   WHERE name = 'Olympia Snowe'
// `
// let qCountAdam = `
//   SELECT name, COUNT(politicianId) AS totalVote
//   FROM Politicians
//   INNER JOIN Votes ON Votes.politicianId = Politicians.id
//   WHERE name LIKE 'Adam%'
//   GROUP BY name
// `
// let qCountMostVote = `
//   SELECT COUNT(politicianId) AS totalVote, name, party, location
//   FROM Politicians
//   INNER JOIN Votes ON Votes.politicianId = Politicians.id
//   GROUP BY name
//   ORDER BY totalVote DESC
//   LIMIT 3
// `
let qCountVoteSnowe = `
  SELECT first_name, last_name, gender, age
  FROM Voters
  INNER JOIN Votes ON Voters.id = Votes.voterId
  WHERE politicianId = ( SELECT id
  FROM Politicians
  WHERE name = 'Olympia Snowe')
`
db.all(qCountVoteSnowe, (err, rows) => {
  if (err) {
    console.log(err)
  } else {
    function olympiaVoter(first_name, last_name, gender, age) {
      this.first_name = first_name
      this.last_name = last_name 
      this.gender = gender
      this.age = age
    }

    // for(let i = 0 ; i < rows.length ; i++) {
      // let output = new olympiaVoter(rows[i].first_name, rows[i].last_name, rows[i].gender, rows[i].age)
      console.log(rows[0].first_name)
      console.table(rows[0].first_name)
    // }
  }
})

let arrayPoliticians = insertFromCsv(politicians);
let arrayVoters = insertFromCsv(voters)
let arrayVotes = insertFromCsv(votes)

// db.serialize(function() {
//   parsePoliticians(arrayPoliticians)
//   parseVoters(arrayVoters)
//   parseVotes(arrayVotes)
// }) 