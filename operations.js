const db = require('./db.js');
const Table = require('cli-table');
class Operations {
  static input(data) {
    let tableName = data[0];
    data = data.slice(1);
    let valueData = '';
    data.forEach( (d, i) => {
      if (isNaN(d)) {
        valueData += `"${d}"`;
      } else {
        valueData += d;
      }
      if (i < data.length - 1 ) {
        valueData += ', ';
      }
    })

    const queryInput = `INSERT INTO ${tableName} VALUES (null, ${valueData});`;
    db.run(queryInput, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`input data success`);
      }
    })
  }

  static delete(data) {
    let tableName = data[0];
    let dataId = +data[1];
    db.run(`DELETE FROM ${tableName} WHERE id = ${dataId};`);
  }

  static update(data) {
    let tableName = data[0];
    let dataId = +data[1];
    data = data.slice(2);
    let setValue = '';
    for (let i = 0; i < data.length; i += 2) {
      setValue += `${data[i]} = "${data[i+1]}"`;
      if (i < data.length - 2 ) {
        setValue += ', ';
      }
    }

    db.run(`UPDATE ${tableName} SET ${setValue} WHERE id = ${dataId};`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Sukses update data`);
      }
    });
  }

  static numberOne(data) {
    let party = data[0];
    let minGrade = data[1];
    let maxGrade = data[2];
    db.all(`SELECT name, party, grade_current FROM politicians WHERE party = "${party}" AND grade_current BETWEEN ${minGrade} AND ${maxGrade};`, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  }

  static numberTwo(data) {
    let politician = data[0];
    const query = `SELECT politicians.name, COUNT(politicianId) AS totalVote FROM votes, politicians WHERE votes.politicianId = politicians.id  AND votes.politicianId IN (SELECT id from politicians WHERE name like "%${politician}%") GROUP BY votes.politicianId`;
    db.all(query, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    })
  }

  static numberFour(data) {
    let limit = data[0];
    const query = `SELECT  COUNT(votes.politicianId) AS totalVote, politicians.name, politicians.party, politicians.location FROM votes, politicians WHERE votes.politicianId = politicians.id GROUP BY politicianId ORDER BY COUNT(politicianId) DESC LIMIT ${data}`;
    db.all(query, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    })
  }

  static numberFive(data) {
    let politician = data[0];
    const query = `SELECT voters.first_name, voters.last_name, voters.gender, voters.age FROM voters, votes WHERE votes.voterId = voters.id AND votes.politicianId = (SELECT id FROM politicians WHERE name LIKE "${politician}");`;
    db.all(query, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    })
  }
}

module.exports = Operations;
