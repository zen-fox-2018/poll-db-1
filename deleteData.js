const db = require('./dbConnection.js');

let deleteDataPol = (input) => {
    let pol = `DELETE FROM Politicians WHERE politicianId = 21`;

    db.run(pol, (err) => {
        if (err) {
            return console.log(err.message);
        } else {
            console.log('Success delete data from Politicians');
        }
    });
}

let deleteDataVotrs = (input) => {
    let votrs = `DELETE FROM Voters WHERE voterId = 21`;

    db.run(votrs, (err) => {
        if (err) {
            return console.log(err.message);
        } else {
            console.log('Success delete data from Voters');
        }
    });
}

let deleteDataVotes = (input) => {
    let vote = `DELETE FROM Votes WHERE voteId = 21`;

    db.run(vote, (err) => {
        if (err) {
            return console.log(err.message);
        } else {
            console.log('Success delete data from Votes');
        }
    });
}