const db = require('./db')

let query1 = `
SELECT name, party, grade_current
FROM Politicians
WHERE party = "R" AND grade_current BETWEEN 9 AND 11`

db.all(query1, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        // console.log(data);
    }
})

let query2 = `
SELECT COUNT(*) AS totalVote, name
FROM Votes
JOIN Politicians ON Politicians.id = Votes.PoliticianId
WHERE Politicians.name = "Olympia Snowe"`

db.all(query2, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        // console.log(data);
    }
})

let query3 = `
SELECT Politicians.name, COUNT(*) AS totalVote
FROM Votes
JOIN Politicians ON Politicians.id = Votes.PoliticianId
WHERE Politicians.name LIKE "Adam %"
GROUP BY Politicians.name`

db.all(query3, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        // console.log(data);
    }
})

let query4 = `
SELECT COUNT(*) AS totalVote, Politicians.name, Politicians.party, Politicians.location
FROM Votes
JOIN Politicians ON Politicians.id = Votes.PoliticianId
GROUP BY Politicians.name
ORDER BY totalVote DESC
LIMIT 3`

db.all(query4, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        // console.log(data);
    }
})

let query5 = `
SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age
FROM Votes
JOIN Voters ON Voters.id = Votes.VoterId
JOIN Politicians ON Politicians.id = Votes.PoliticianId
WHERE Politicians.name = "Olympia Snowe"`

db.all(query5, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})