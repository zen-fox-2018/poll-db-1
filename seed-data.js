const db = require('./db')
const fs = require('fs')

function read(file) {
    let result = fs.readFileSync(file, 'utf8').split('\n')
    return result.slice(1)
}

db.serialize(() => {
    let politiciansData = read('politicians.csv')
    let votersData = read('voters.csv')
    let votesData = read('votes.csv')

    politiciansData.forEach(e => {
        let data = e.split(',')
        let query = `
        INSERT INTO Politicians (name, party, location, grade_current)
        VALUES ("${data[0]}", "${data[1]}", "${data[2]}", ${data[3]})`
        db.run(query, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('insert data politicians');
            }
        })
    });

    votersData.forEach(e => {
        let data = e.split(',')
        let query = `
        INSERT INTO Voters (first_name, last_name, gender, age)
        VALUES ("${data[0]}", "${data[1]}", "${data[2]}", ${data[3]})`
        db.run(query, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('insert data voters');
            }
        })
    });

    votesData.forEach(e => {
        let data = e.split(',')
        let query = `
        INSERT INTO Votes (VoterId, PoliticianId)
        VALUES (${data[0]}, ${data[1]})`
        db.run(query, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('insert data votes');
            }
        })
    });

})