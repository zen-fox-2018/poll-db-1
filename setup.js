const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

function dbRun(tableName) {
  db.run(tableName, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Table Created!');
    }
  })
}

db.serialize(() => {

  const qPoliticians =
    `CREATE TABLE IF NOT EXISTS Politicians (
      id integer PRIMARY KEY AUTOINCREMENT,
      name text,
      party varchar(5),
      location varchar(10),
      grade_current real
  )`

  const qVoters =
    `CREATE TABLE IF NOT EXISTS Voters (
    id integer PRIMARY KEY AUTOINCREMENT,
    first_name text,
    last_name text,
    gender text,
    age integer
  )`

  const qVotes =
    `CREATE TABLE IF NOT EXISTS Votes (
        votersId integer,
        politiciansId integer,
        FOREIGN KEY (votersId) REFERENCES Voters(id),
        FOREIGN KEY (politiciansId) REFERENCES Politicians(id)
    )`

  // dbRun(qPoliticians);
  // dbRun(qVoters);
  // dbRun(qVotes);
});

module.exports = db;