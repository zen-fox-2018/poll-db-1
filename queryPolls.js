const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./politiciansPoll.db', (err) => {
    if (err) throw console.error(err.message)
});

function query1() {
    const query = `
                  SELECT name, party, grade_current
                  FROM Politicians
                  WHERE party = 'R'
                    AND grade_current BETWEEN 9 AND 11;
                  `
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}

query1()

function snowee() {
    const query = `
                  SELECT COUNT(*) AS totalVote, Politicians.name
                  FROM Votes
                  JOIN Politicians
                    ON Politicians.id = Votes.politicianId
                  WHERE politicianId = 17;
                  `
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}

snowee()

function adam() {
    const query = `
                  SELECT Politicians.name, COUNT(*) AS totalVote
                  FROM Votes
                  INNER JOIN Politicians
                    ON politicianId = Politicians.id
                  WHERE Politicians.name LIKE 'Adam%'
                  GROUP BY Politicians.name;  
                  `
    
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}

adam()

function query3() {
    const query = `
                    SELECT COUNT(voterId) AS totalVote, Politicians.name, Politicians.party, Politicians.location
                    FROM Votes
                    INNER JOIN Politicians
                        ON politicianId = Politicians.id
                    GROUP BY Politicians.name
                    ORDER BY totalVote DESC LIMIT 3;
                  `

    db.all(query, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}
query3()

function whosVotedSnowee() {
    const query = `
                  SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age
                  FROM Voters
                  INNER JOIN Votes
                    ON Voters.id = Votes.voterId
                  INNER JOIN Politicians
                    ON Politicians.id = Votes.politicianId
                  WHERE Politicians.name = 'Olympia Snowe';
                  `

    db.all(query, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}

whosVotedSnowee()