const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

function showPoliticiansR() {
  db.all(`SELECT *
          FROM Politicians
          WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;`,
        function(errShowPoliticiansR,dataPoliticianR) {
          if (errShowPoliticiansR) {
            console.log('Politician R err :',errShowPoliticiansR);
          }
          else {
            console.log(dataPoliticianR);
            console.log('---------');
          }
        })
}

function  olympiaSnowe(){
  db.all(`SELECT COUNT(Votes.politicianId) AS totalVote, Politicians.name as name
          FROM Votes
          LEFT JOIN Politicians ON politicianId = Politicians.id
          WHERE Politicians.name = 'Olympia Snowe'
          ;`,
        function(errOlympiaSnowe,dataOlympiaSnowe) {
          if (errOlympiaSnowe) {
            console.log('Olympia Snowe err :',errOlympiaSnowe);
          }
          else {
            console.log(dataOlympiaSnowe);
            console.log('---------');
          }
        })
}

function adamTotal() {
  db.all(`SELECT Politicians.name as name, COUNT(Votes.politicianId) AS totalVote
          FROM Votes
          LEFT JOIN Politicians ON politicianId = Politicians.id
          WHERE Politicians.name LIKE 'Adam%'
          GROUP BY Politicians.name
          ;`,
        function(errAdam,dataAdam) {
          if (errAdam) {
            console.log('Adam err :',errAdam);
          }
          else {
            console.log(dataAdam);
            console.log('---------');
          }
        })
}

function mostVoted() {
  db.all(`SELECT
            COUNT(Votes.politicianId) AS totalVote,
            Politicians.name AS name,
            Politicians.party AS party,
            Politicians.location AS location
          FROM Votes
          LEFT JOIN Politicians ON politicianId = Politicians.id
          GROUP BY Politicians.name
          ORDER BY totalVote DESC
          LIMIT 3
          ;`,
        function(errMostVoted,dataMostVoted) {
          if (errMostVoted) {
            console.log('Most Voted err :',errMostVoted);
          }
          else {
            console.log(dataMostVoted);
            console.log('---------');
          }
        })
}

function whoVoteOlympia() {
  db.all(`SELECT
            Voters.first_name AS first_name,
            Voters.last_name AS last_name,
            Voters.gender AS gender,
            Voters.age AS age
            FROM Voters
            LEFT JOIN Politicians ON Politicians.id = Votes.politicianId
            JOIN Votes ON Votes.voterId = Voters.id
            WHERE Politicians.name = 'Olympia Snowe'
          ;`,
        function(errVoteOlympia,dataVoteOlympia) {
          if (errVoteOlympia) {
            console.log('Vote Olympia err :',errVoteOlympia);
          }
          else {
            console.log(dataVoteOlympia);
            console.log('---------');
          }
        })
}


showPoliticiansR();
olympiaSnowe();
adamTotal();
mostVoted();
whoVoteOlympia();
db.close()


// SELECT
//         Politicians.id AS id
//         FROM Politicians
//         WHERE Politicians.name =  'Olympia Snowe'
