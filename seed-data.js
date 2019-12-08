const db = require('./datab') 
const fs = require('fs')

function readData(path) {
  return fs.readFileSync(path, 'utf8').trim().split('\n').slice(1)
}

function seedData() {
  db.serialize((err) => {
    if(err) {
      console.log(`Error serialize` , err)
    } else {
      let politicians = readData('politicians.csv')
      let votes = readData('votes.csv') 
      let voters = readData('voters.csv')
  
      for (let i = 0; i < politicians.length; i++) {
        let poli = politicians[i].split(',')
        let qPoli = `
          INSERT INTO Politicians (name, party, location, grade_current)
          VALUES ("${poli[0]}", "${poli[1]}", "${poli[2]}", ${Number(poli[3])})
        `
        db.run(qPoli, (err) => {
          if(err) {
            console.log(err)
          } else {
            console.log(`Success insert data into politicians`)
          }
        })
      }
  
      for (let i = 0; i < voters.length; i++) {
        let voter = voters[i].split(',')
        let qVoter = `
          INSERT INTO Voters (first_name, last_name, gender, age)
          VALUES ("${voter[0]}", "${voter[1]}", "${voter[2]}", ${Number(voter[3])})
        `
        db.run(qVoter, (err) => {
          if(err) {
            console.log(err)
          } else {
            console.log(`Success insert data into Voters`)
          }
        })
      }
      for (let i = 0; i < votes.length; i++) {
        let vote = votes[i].split(',')
        let qVote = `
          INSERT INTO Votes (voterId, politicianId)
          VALUES (${Number(vote[0])}, ${Number(vote[1])})
        `
        db.run(qVote, (err) => {
          if(err) {
            console.log(err)
          } else {
            console.log(`Success insert data into Votes`)
          }
        })
      }
    }
  })
  db.close()
}

// seedData()

