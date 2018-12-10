const db = require('./db.js');
const readData = require('./readData.js');

db.serialize(() => {
  let voters = readData.readData('./voters.csv').slice(1);
  voters.forEach( v => {
    db.run(`INSERT INTO voters (first_name, last_name, gender, age) VALUES ("${v[0]}", "${v[1]}", "${v[2]}", "${v[3]}");`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('success insert data voters');
      }
    });
  });

  let politicians = readData.readData('./politicians.csv').slice(1);
  politicians.forEach( p => {
    db.run(`INSERT INTO politicians (name, party, location, grade_current) VALUES ("${p[0]}", "${p[1]}", "${p[2]}", "${p[3]}");`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('success insert data politicians');
      }
    });
  });

  let votes = readData.readData('./votes.csv').slice(1);
  votes.forEach( v => {
    db.run(`INSERT INTO votes (voterId, politicianId) VALUES ("${v[0]}", "${v[1]}");`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('success insert data votes');
      }
    });
  });
})

db.close();
