//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pollDB.db');
 
db.serialize(function() {
    const qPoliticians = `
        CREATE TABLE IF NOT EXISTS Politicians 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            party text,
            location text,
            grade_current INTEGER
        )
        `
    const qVoters =  `
        CREATE TABLE IF NOT EXISTS Voters 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name text,
            last_name text,
            gender text,
            age INTEGER
        )
    `
    const qVotes =  `
        CREATE TABLE IF NOT EXISTS Votes 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            voterId,
            politicianId,
            FOREIGN KEY (voterId) REFERENCES Voters(id)
            FOREIGN KEY (politicianId) REFERENCES Politicians(id)
        )
        `

  db.run(qPoliticians, function(err){
      if(err) {
          console.log(err)
      }else{
          console.log(`sucsess`)
      }
  })

  db.run(qVoters, function(err){
    if(err) {
        console.log(err)
    }else{
        console.log(`sucsess`)
    }
})

db.run(qVotes, function(err){
    if(err) {
        console.log(err)
    }else{
        console.log(`sucsess`)
    }
})

});

 
db.close();