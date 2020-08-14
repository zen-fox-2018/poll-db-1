const db = require('./dbConnection.js');


let updateDataPol = (input) => {

    let pol = `UPDATE Politicians SET name = "${input}" WHERE politicianId = 21;`;

    db.run(pol, (err) => {
        if (err) {
            return console.log(err.message);
        } else {
            console.log(`Success update data table Politician`);
        }
    });
}


let updateDataVotrs = (input) => {
    
    let votrs = `UPDATE Voters SET first_name = "${input}" WHERE voterId = 151;`;

    db.run(votrs, (err) => {
        if (err) {
            return console.log(err.message);
        } else {
            console.log(`success update data table Voters`);
        }
    });
}

let updateDataVotes = (input) => {
    
    let vote = `UPDATE Votes SET politicianId = ${+input} WHERE voteId = 164;`;

    db.run(vote, (err) => {
        if (err) {
            return console.log(err.message);
        } else {
            console.log(`success update data table Votes`);
        }
    });
}

updateDataPol("Arief Rachman");
updateDataVotrs("Arief");
updateDataVotes(21);