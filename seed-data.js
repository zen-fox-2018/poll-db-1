const fs = require('fs');
const db = require('./setup.js');

function readFile(files, callback) {
  fs.readFile(files, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      let files = data.split('\n').slice(1);
      callback(null, files);
      // console.log('Succeed!');
    }
  });
}

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

function parsingPoliticiansFiles() {
  readFile('./politicians.csv', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      db.serialize(() => {
        for (let i = 0; i < data.length; i++) {
          let perFiles = data[i].split(',');
          db.run(`INSERT INTO Politicians (name, party, location, grade_current) 
              VALUES("${perFiles[0]}", "${perFiles[1]}", "${perFiles[2]}", ${perFiles[3]});`)
        }
      })
    }
  })
}

function parsingVotersFiles() {
  readFile('./voters.csv', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      db.serialize(() => {
        for (let i = 0; i < data.length; i++) {
          let perFiles = data[i].split(',');
          db.run(`INSERT INTO Voters (first_name, last_name, gender, age) 
            VALUES("${perFiles[0]}", "${perFiles[1]}", "${perFiles[2]}", ${Number(perFiles[3])});`)
        }
      })
    }
  })
}

function parsingVotesFiles() {
  readFile('./votes.csv', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      db.serialize(() => {
        for (let i = 0; i < data.length; i++) {
          let perFiles = data[i].split(',');
          db.run(`INSERT INTO Votes (votersID, politiciansID) 
              VALUES("${perFiles[0]}", "${perFiles[1]}");`)
        }
      }
      )
    }
  })
}

function updateData(tableName, colName, colValue, id) {
  dbAll(`UPDATE ${tableName}
  SET ${colName} = '${colValue}'        
  WHERE ${tableName}.id = ${id};`)      //the value must be inside the ''
}

function deleteData(tableName, id) {
  dbAll(`DELETE FROM ${tableName}
  WHERE ${tableName}.id = ${id};`)
}

parsingPoliticiansFiles();
parsingVotersFiles();
parsingVotesFiles();
updateData("Voters", "gender", "female", 1);