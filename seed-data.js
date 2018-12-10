
const db = require("./db");

//read data
function readFile(file) {
    const fs = require("fs")
    const read = fs.readFileSync(file, "utf8")

    return read
}

db.serialize(function() {
    let politicians = readFile("politicians.csv").split("\n").slice(1);

    for(let i = 0; i < politicians.length - 1; i++) {
        let splitted = politicians[i].split(",");
        let insertPoliticians = `INSERT INTO Politicians (name, party, location, grade_current)
                                VALUES("${splitted[0]}", "${splitted[1]}", "${splitted[2]}", ${splitted[3]});`
        
        db.run(insertPoliticians, function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log("Sucessfully inserted data Politicians!")
            }
        })
    }

    let voters = readFile("voters.csv").split("\n").slice(1);

    for(let i = 0; i < voters.length - 1; i++) {
        let splittedVoters = voters[i].split(",");
        let insertVoters = `INSERT INTO Voters(first_name, last_name, gender, age)
                                 VALUES("${splittedVoters[0]}", "${splittedVoters[1]}", "${splittedVoters[2]}", ${splittedVoters[3]});`
        db.run(insertVoters, function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log("Successfully inserted voters data!")
            }
        })
    }

    let votes = readFile("votes.csv").split("\n").slice(1);

    for(let i = 0; i < votes.length - 1; i++) {
        let votesSplitted = votes[i].split(",")
        let insertVotes = `INSERT INTO Votes(voterId, politicianId)
                           VALUES(${Number(votesSplitted[0])}, ${Number(votesSplitted[1])});`
        db.run(insertVotes, function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log("Successfully inserted data votes")
            }
        })
    }
})