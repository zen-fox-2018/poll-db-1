const db = require('./dbConnection.js');


let tablePoliticians = `CREATE TABLE Politicians (
  politicianId INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  party TEXT,
  location TEXT,
  grade_current REAL
  )`;

let tableVoters = `CREATE TABLE Voters (
  voterId INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT,
  last_name TEXT,
  gender varchar(10),
  age INTEGER
)`;


let tableVotes = `CREATE TABLE Votes (
  voteId INTEGER PRIMARY KEY AUTOINCREMENT,
  voterId INTEGER NOT NULL,
  politicianId INTEGER NOT NULL,
  FOREIGN KEY (voterId) REFERENCES Voters(voterId)
  FOREIGN KEY (politicianId) REFERENCES Politicians(politicianId),
)`;

db.serialize((err) => {
  if (err) {
    return console.log(err);
  } else {

    db.run(tablePoliticians, (err) => {
      if (err) {
        return console.log(err.message);
      }
    });

    db.run(tableVoters, (err) => {
      if (err) {
        return console.log(err.message);
      }
    });

    db.run(tableVotes, (err) => {
      if (err) {
        return console.log(err.message);
      }
    });

  }
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
});