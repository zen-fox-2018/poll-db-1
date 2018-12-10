//your code here
const db = require('./datab')

function createTable() {
  const qVoters = `
    CREATE TABLE IF NOT EXISTS Voters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name VARCHAR,
      last_name VARCHAR,
      gender VARCHAR(6),
      age INTEGER
    )
  `
  const qPoli = `
    CREATE TABLE IF NOT EXISTS Politicians (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR,
      party VARCHAR(1),
      location VARCHAR(5),
      grade_current REAL
    )
  `
  const qVotes = `
    CREATE TABLE IF NOT EXISTS Votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      voterId INTEGER,
      politicianId INTEGER,
      FOREIGN KEY (voterId) REFERENCES Voters(id),
      FOREIGN KEY (politicianId) REFERENCES Politicians(id)
    )
  `

  db.serialize((err) => {
    if(err) {
      console.log(err)
    } else {
      db.run(qPoli , (err) => {
        if(err) {
          console.log(`Error create politicians table`, err)
        } else {
          console.log(`success create politicians table`)
        }
      })
      db.run(qVoters , (err) => {
        if(err) {
          console.log(`Error create voters table`, err)
        } else {
          console.log(`success create voters table`)
        }
      })
      db.run(qVotes , (err) => {
        if(err) {
          console.log(`Error create votes table`, err)
        } else {
          console.log(`success create votes table`)
        }
      })
    }
  })

  db.close((err) => {
    if(err) {
      console.log(`error closing database`)
    } else {
      console.log(`success closing database`)
    }
  })
}

createTable()