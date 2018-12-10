const fs = require('fs')
const db = require('./db')
function seed() {
    db.serialize(function () {
        let dataPoliticians = fs.readFileSync("./politicians.csv","utf8")
        let politicians = dataPoliticians.split('\n')
        let data = politicians.slice(1)
        data.forEach ( politician => {
            let insert = politician.split(",")
            let q = ` INSERT INTO Politicians (name, party, location, grade_current)
                        VALUES ("${insert[0]}", "${insert[1]}", "${insert[2]}", ${insert[3]})`
            db.run(q,function(err) {
                if(err) {
                    console.log(`error ngeseed data Ploticians`,err)
                }
            })
        })
    
        let dataVoters = fs.readFileSync("./voters.csv","utf8")
        let Voters = dataVoters.split('\n')
        let data2 = Voters.slice(1)
        data2.forEach(voter => {
            let insert = voter.split(',')
            let q = ` INSERT INTO Voters (first_name, last_name, gender, age)
            VALUES ("${insert[0]}", "${insert[1]}", "${insert[2]}", ${insert[3]})`
            db.run(q,function(err) {
                if (err) {
                    console.log('error di seed data Voters', err)
                }
            })
        })
    
        let dataVotes = fs.readFileSync("./votes.csv","utf8")
        let Votes = dataVotes.split('\n')
        let data3 = Votes.slice(1)
        data3.forEach(vote => {
            let insert = vote.split(',')
            const q = ` INSERT INTO Votes (voterId, politicianId)
            VALUES (${insert[0]}, ${insert[1]})`
            db.run(q, function (err) {
                if (err) {
                    console.log('error di seed data votes ', err)
                }
            })
        })
    
    })
    db.close()
}

seed()
