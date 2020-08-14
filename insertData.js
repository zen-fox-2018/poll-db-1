const db = require('./dbConnection.js');

let insertDataPol = (name, party, location, grade_current) => {
    let pol =
        `INSERT INTO Politicians (name, party, location, grade_current)
    VALUES ("${name}", "${party}", "${location}", ${+grade_current});`;

    db.run(pol, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Success add data to table Politicians');
        }
    });
}

let insertDataVotrs = (first_name, last_name, gender, age) => {
    let votrs =
        `INSERT INTO Voters (first_name, last_name, gender, age)
    VALUES ("${first_name}", "${last_name}", "${gender}", ${+age});`;

    db.run(votrs, (err) => {
        if (err) {
            return console.log(err.message);
        } else {
            console.log('Success add data to table Voters');
        }
    });
}

let insertDataVotes = (voterId, politicianId) => {
    let vote =
        `INSERT INTO Votes (voterId, politicianId)
    VALUES (${+voterId}, ${+politicianId});`;

    db.run(vote, (err) => {
        if (err) {
            return console.log(err.message);
        } else {
            console.log('Success add data to table Votes');
        }
    });
}

insertDataPol("Arief Rachman", "D", "WA", 14.23695519);
insertDataVotrs("Arief", "Rachman", "male", 24);
insertDataVotes(20, 12);