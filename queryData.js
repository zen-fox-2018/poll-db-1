const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');

function showResult(query) {
    db.all(query, function(err, rows) {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}
function showNamePartyAndGrade() {
    let query = `
        SELECT 
            name, 
            party, 
            grade_current 
        FROM Politicians 
        WHERE grade_current BETWEEN 9 AND 11
            AND party = "R"`
    showResult(query)
  
}
showNamePartyAndGrade()

function countVote() {
    let query = `
        SELECT 
            COUNT(politicianId) AS totalVote, 
            Politicians.name 
        FROM Votes
        INNER JOIN Politicians
        ON politicianId = Politicians.id
        WHERE Politicians.name = "Olympia Snowe"`
    showResult(query)
}
countVote()

function countVoteAdam() {
    let query = `
        SELECT 
            Politicians.name, 
            COUNT(Politicians.name) AS totalVote
        FROM Votes
        INNER JOIN Politicians
        ON politicianId = Politicians.id
        WHERE Politicians.name LIKE "%Adam%"
        GROUP BY Politicians.name`
    showResult(query)

}
countVoteAdam()

function mostVoted() {
    let query = `
        SELECT 
            COUNT(Votes.politicianId) AS totalVote, 
            Politicians.name, 
            Politicians.party, 
            Politicians.location
        FROM Politicians
        INNER JOIN Votes
        ON Politicians.id = Votes.politicianId
        GROUP BY Politicians.name
        ORDER BY totalVote DESC
        LIMIT 3
        `
    showResult(query)
}
mostVoted()

function whoVotes() {
    // let query = `SELECT first_name, last_name, gender, age
    //     FROM Voters
    //     INNER JOIN Votes
    //     ON Voters.id = Votes.voterId
    //     WHERE Votes.politicianId = (
    //         SELECT Politicians.id
    //         FROM Politicians
    //         WHERE Politicians.name = "Olympia Snowe"
    //     )`
    let query = `
        SELECT 
            Voters.first_name,
            Voters.last_name,
            Voters.gender,
            Voters.age
        FROM Politicians
        INNER JOIN Votes
        INNER JOIN Voters
        ON Politicians.id = Votes.politicianId AND
        Votes.voterId = Voters.id
        WHERE Politicians.name = "Olympia Snowe"`
    showResult(query)
}
whoVotes()