const fs = require('fs');
const db = require('./dbConnection.js');


// INSERT DATA TO TABLE POLITICIANS
const politicians = fs.readFileSync('./politicians.csv', 'utf8');
let politiciansSplit = politicians.split('\n').slice(1);

for (let i = 0; i < politiciansSplit.length; i++) {
    let splitDataPol = politiciansSplit[i].split(',');
    let insertDataPol =
        `INSERT INTO Politicians (name, party, location, grade_current)
    VALUES ("${splitDataPol[0]}", "${splitDataPol[1]}", "${splitDataPol[2]}", ${+splitDataPol[3]});`;

    db.serialize((err) => {
        if (err) {
            return console.log(err);
        } else {
            if (politiciansSplit[i] !== '') {
                db.run(insertDataPol, (err) => {
                    if (err) {
                        return console.log(err.message);
                    } else {
                        console.log(`Insert data politicians ${i+1}`);
                    }
                });
            }
        }
    });
}

// INSERT DATA TO TABLE VOTERS
const voters = fs.readFileSync('./voters.csv', 'utf8');
let votersSplit = voters.split('\n').slice(1);

for (let i = 0; i < votersSplit.length; i++) {
    let splitDataVotrs = votersSplit[i].split(',');
    let insertDataVotrs =
        `INSERT INTO Voters (first_name,last_name,gender,age)
    VALUES ("${splitDataVotrs[0]}", "${splitDataVotrs[1]}", "${splitDataVotrs[2]}", ${+splitDataVotrs[3]});`;

    db.serialize((err) => {
        if (err) {
            return console.log(err);
        } else {
            if (votersSplit[i] !== '') {
                db.run(insertDataVotrs, (err) => {
                    if (err) {
                        return console.log(err.message);
                    } else {
                        console.log(`Insert data voters ${i+1}`);
                    }
                });
            }
        }
    });
}

// INSERT DATA TO TABLE VOTES
const votes = fs.readFileSync('./votes.csv', 'utf8');
let votesSplit = votes.split('\n').slice(1);

for (let i = 0; i < votesSplit.length; i++) {
    let splitDataVote = votesSplit[i].split(',');
    let insertDataVote =
        `INSERT INTO Votes (voterId, politicianId)
    VALUES (${+splitDataVote[0]}, ${+splitDataVote[1]});`;

    db.serialize((err) => {
        if (err) {
            return console.log(err);
        } else {
            if (votesSplit[i] !== '') {
                db.run(insertDataVote, (err) => {
                    if (err) {
                        return console.log(err.message);
                    } else {
                        console.log(`Insert data votes ${i+1}`);
                    }
                });
            }
        }
    });
}