const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(function() {
  // 1. Menampilkan nama politician, partai dan grade_current politician tersebut yang berada di partai R
  // dan memiliki grade_current range 9 s/d 11
  let query1 =
  `
  SELECT name, party, grade_current FROM Politicians
  WHERE party = 'R' AND grade_current > 9 AND grade_current < 11
  `
  db.all(query1, function(err, rows) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(rows);
    }
  })


  // 2. Menghitung jumlah vote untuk politician Olympia Snowe
  let query2 =
  `
  SELECT count(voterId) AS totalVote, name FROM Votes
  JOIN Politicians ON Votes.politicianId = Politicians.id WHERE Politicians.name = 'Olympia Snowe';
  `
  db.all(query2, function(err, rows) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('\n');
      console.log(rows);
    }
  })


  // 3. Menghitung jumlah vote untuk politician yang nama-nya mengandung kata "Adam"
  let query3 =
  `
  SELECT name, count(voterId) AS totalVote FROM Politicians JOIN Votes
  ON Politicians.id = Votes.politicianId WHERE Politicians.name like '%Adam%' GROUP BY politicianId
  `
  db.all(query3, function(err, rows) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('\n');
      console.log(rows);
    }
  })


  //4. Menampilkan 3 politician beserta nama partai dan lokasi politician tersebut
  // yang memiliki suara terbanyak
  let query4 =
  `
  SELECT count(voterId) AS totalVote, name, party, location FROM Politicians JOIN Votes
  ON Politicians.id = Votes.politicianId GROUP BY politicianId ORDER BY totalVote DESC LIMIT 3
  `
  db.all(query4, function(err, rows) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('\n');
      console.log(rows);
    }
  })


  // 5. Menampilkan siapa saja yang melakukan voting ke politician yang bernama Olympia Snowe
  let query5 =
  `
  SELECT * FROM Voters JOIN Votes ON Voters.id = Votes.voterId
  JOIN Politicians ON Votes.politicianId = Politicians.id
  WHERE Politicians.name = 'Olympia Snowe'
  `
  db.all(query5, function(err, rows) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('\n');
      console.log(rows);
    }
  })

})


