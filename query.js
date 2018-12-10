const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

function dbAll(query) {
  db.all(query, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
      console.log('\n');
    }
  })
}

db.serialize(() => {
  //1. display nama politicians, partai R, grade_current (9 - 11);
  function qOne() {
    dbAll(`SELECT name, party, grade_current
      FROM Politicians
      WHERE grade_current BETWEEN 9 AND 11
        AND party = 'R';`)
  }
  
  //2. Jumlah votes utk Olympia Snowe - Politicians
  function qTwo() {
    dbAll(`SELECT COUNT(votersId) AS totalVote, Politicians.name
      FROM Votes
      INNER JOIN Politicians
        ON politiciansId = Politicians.id
      WHERE Politicians.name = "Olympia Snowe";`)
  }

  //3. Hitung jumlah vote dengan nama ADAM
  function qThree() {
    dbAll(`SELECT Politicians.name, COUNT(votersId) AS totalVote
      FROM Votes
      INNER JOIN Politicians
        ON politiciansId = Politicians.id
      WHERE Politicians.name LIKE "Adam %"
      GROUP BY Politicians.name;`)
  }

  //4. 3 Highest Vote
  function qFour() {
    dbAll(`SELECT COUNT(VotersId) AS totalVote, Politicians.name, Politicians.party, Politicians.location
      FROM Votes
      INNER JOIN Politicians
        ON politiciansId = Politicians.id
      GROUP BY Politicians.name
      ORDER BY totalVote DESC LIMIT 3;`)
  }

  //5. voters name on Olympia Snowe
  function qFive() {
    dbAll(`SELECT first_name, last_name, gender, age
    FROM Voters
    INNER JOIN Votes
      ON Voters.id = Votes.votersId
    INNER JOIN Politicians
      ON Votes.politiciansId = Politicians.id
    WHERE Politicians.name = "Olympia Snowe";`)
  }

  qOne();
  qTwo();
  qThree();
  qFour();
  qFive();
})
