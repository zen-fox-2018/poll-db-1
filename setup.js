//your code here
const db = require('./db.js');


db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS voters`);
  db.run(`DROP TABLE IF EXISTS votes`);
  db.run(`DROP TABLE IF EXISTS politicians`);

  const qcreateTableVoters = `
  CREATE TABLE IF NOT EXISTS 'voters' (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    gender VARCHAR (10),
    age INTEGER
  );`

  db.run(qcreateTableVoters, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`success cretae table voters`);
    }
  });

  const qcreateTablePoliticians = `
  CREATE TABLE IF NOT EXISTS 'politicians' (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    party TEXT,
    location TEXT,
    grade_current REAL
  );`

  db.run(qcreateTablePoliticians, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`success cretae table politicians`);
    }
  });

  const qcreateTableVotes = `
  CREATE TABLE IF NOT EXISTS 'votes' (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voterId INTEGER,
    politicianId INTEGER,
    FOREIGN KEY (politicianId) REFERENCES politicians(id),
    FOREIGN KEY (voterId) REFERENCES politicians(id)
  );`

  db.run(qcreateTableVotes, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`success cretae table votes`);
    }
  });
})

db.close();
