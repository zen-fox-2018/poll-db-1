//your code here
const db = require('./dbConnection.js')

let cTablePoliticians = `CREATE TABLE IF NOT EXISTS Politicians (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name text,
  party text,
  location text,
  grade_current INTEGER
  )`

let cTableVoters = `CREATE TABLE IF NOT EXISTS Voters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name text,
  last_name text,
  gender text,
  age INTEGER
)`

let cTableVotes = `CREATE TABLE IF NOT EXISTS Votes (
  votesId INTEGER PRIMARY KEY,
  voterId INTEGER,
  politicianId INTEGER,
  FOREIGN KEY (voterId) REFERENCES Voters(id),
  FOREIGN KEY (politicianId) REFERENCES Politicians(id)
)`

db.serialize(function() {
  db.run(cTablePoliticians, (err) => {
    if (err) {
      console.log(err) 
    } 
  });
  
  db.run(cTableVoters, (err) => {
    if (err) {
      console.log(err)
    } 
  });

  db.run(cTableVotes, (err) => {
    if (err) {
      console.log(err)
    } 
  });

})

