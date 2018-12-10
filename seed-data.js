const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// setup();
function readFile(dataCSV) {
  var csv = fs.readFileSync(dataCSV, 'utf8')
  var arrSplit1 = csv.split('\n');
  var arrSplit2 = arrSplit1.slice(1,arrSplit1.length-1);
  return arrSplit2;
}

var arrPoliticians = readFile('./politicians.csv');
var arrVoters = readFile('./voters.csv');
var arrVotes = readFile('./votes.csv');

function insertInto(insertStr, arr) {
  var commandStr = ``;
  for (var i = 0; i < arr.length; i++) {
    var arrSplit = arr[i].split(',');
    if (insertStr == 'politicians') {
      commandStr = `INSERT INTO Politicians
                    (name, party, location, grade_current)
                    VALUES
                    ("${arrSplit[0]}", "${arrSplit[1]}", "${arrSplit[2]}", ${Number(arrSplit[3])});`;
    }
    else if (insertStr == 'voters') {
      commandStr = `INSERT INTO Voters
                    (first_name, last_name, gender, age)
                    VALUES
                    ("${arrSplit[0]}", "${arrSplit[1]}", "${arrSplit[2]}", ${Number(arrSplit[3])});`;
    }
    else if (insertStr == 'votes'){
      commandStr = `INSERT INTO Votes
                    (voterId, politicianId)
                    VALUES
                    ("${Number(arrSplit[0])}", "${Number(arrSplit[1])}");`;
    }
    // console.log(arrSplit);
    db.serialize(function () {
      db.run(commandStr, function(errLoop){
        if (errLoop) {
          console.log('err Loop :',insertStr,errLoop);
        }
      })
    })
  }
}


function insertPolitician(name, party, location, grade_current) {
  db.run(`INSERT INTO Politicians
          (name, party, location, grade_current)
          VALUES
          ("${name}", "${party}", "${location}", ${grade_current});`,
    function(errInsertPolitician) {
      if (errInsertPolitician) {
        console.log('error insert politician :', err);
      }
  })
}

function insertVoter(first_name, last_name, gender, age) {
  db.run(`INSERT INTO Voters
          (first_name, last_name, gender, age)
          VALUES
          ("${arrSplit[0]}", "${arrSplit[1]}", "${arrSplit[2]}", ${Number(arrSplit[3])});`,
    function(errInsertVoters) {
      if (errInsertVoters) {
        console.log('error insert Voters :', err);
      }
  })
}

function insertVote(voterId, politicianId) {
  db.run(`INSERT INTO Votes
          (voterId, politicianId)
          VALUES
          (${Number(arrSplit[0])}, ${Number(arrSplit[1])});`,
    function(errInsertVotes) {
      if (errInsertVotes) {
        console.log('error insert Votes :', err);
      }
  })
}

function updatePolitician(id,name, party, location, grade_current) {
  db.run(`UPDATE Politicians
          SET name = "${name}",
              party = "${party}",
              location = "${location}",
              grade_current = "${grade_current}"
          WHERE id = ${id};`,
    function(errUpdatePolitician){
      if (errUpdatePolitician) {
        console.log('err update politician :', errUpdatePolitician);
      }
    })
}

function updateVoter(id,first_name, last_name, gender, age) {
  db.run(`UPDATE Politicians
          SET first_name = "${first_name}",
              last_name = "${last_name}",
              gender = "${gender}",
              age = "${age}"
          WHERE id = ${id};`,
    function(errUpdateVoters){
      if (errUpdateVoters) {
        console.log('err update voters :', errUpdateVoters);
      }
    })
}

function updateVote(voterId, politicianId) {
  db.run(`UPDATE Votes
          SET politicianId = "${last_name}",
          WHERE voterId = ${voterId};`,
    function(errUpdateVotes){
      if (errUpdateVotes) {
        console.log('err update votes :', errUpdateVotes);
      }
    })
}


function deletePolitician(id) {
  db.run(`DELETE FROM Politicians
          WHERE id = ${id};`)
}

function deleteVoter(id) {
  db.run(`DELETE FROM Voter
          WHERE id = ${id};`)
}

function deleteVote(voterId) {
  db.run(`DELETE FROM Votes
          WHERE VoterId = ${voterId};`)
}
//SEED DATA AWAL
// db.serialize( function(errSeed){
//   if (errSeed) {
//     console.log('err seed : ',errSeed);
//   }
//   else {
    // insertInto('politicians', arrPoliticians);
    // insertInto('voters', arrVoters);
    // insertInto('votes', arrVotes);
//   }
// })

deletePolitician(21);

db.all('SELECT * FROM Politicians;', function(errShow, data) {
  if (errShow) {
    console.log(errShow);
  }
  else {
    console.log(data);
  }
});
db.close()
