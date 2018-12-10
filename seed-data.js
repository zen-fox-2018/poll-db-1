const fs = require(`fs`)
const db = require(`./db`)

let politicians = fs.readFileSync(`politicians.csv`, `utf8`)
let voters = fs.readFileSync(`voters.csv`, `utf8`)
let votes = fs.readFileSync(`votes.csv`, `utf8`)
politicians = politicians.split(`\n`).slice(1)
voters = voters.split(`\n`).slice(1)
votes = votes.split(`\n`).slice(1)
let politiciansResult = []
let votersResult = []
let votesResult = []

for (let i = 0; i < politicians.length - 1; i++) {
    politiciansResult.push(politicians[i].split(`,`))
}

for (let i = 0; i < voters.length - 1; i++) {
    votersResult.push(voters[i].split(`,`))
}

for (let i = 0; i < votes.length - 1; i++) {
    votesResult.push(votes[i].split(`,`))
}
db.serialize(function () {



    for (let i = 0; i < politiciansResult.length; i++) {
        let insertPoliticians = `INSERT INTO Politicians (
        nama, party, location, grade_current
    ) VALUES (
        "${politiciansResult[i][0]}","${politiciansResult[i][1]}","${politiciansResult[i][2]}","${politiciansResult[i][3]}"
    );`

        db.run(insertPoliticians, function (err) {
            err && console.log(err);
        })
    }

    for (let i = 0; i < votersResult.length; i++) {
        let insertVoters = `INSERT INTO Voters (
        first_name, last_name, gender, age
    ) VALUES (
        "${votersResult[i][0]}","${votersResult[i][1]}","${votersResult[i][2]}","${votersResult[i][3]}"
    );`

        db.run(insertVoters, function (err) {
            err && console.log(err);
        })

    }


    for (let i = 0; i < votesResult.length; i++) {
        let insertVotes = `INSERT INTO Votes (
        voter_id, politician_id
    ) VALUES (
        "${votesResult[i][0]}","${votesResult[i][1]}"
    );`

        db.run(insertVotes, function (err) {
            err && console.log(err);
        })

    }

})











