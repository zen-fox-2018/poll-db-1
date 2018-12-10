const db = require('./Database/db')
const Table = require('cli-table')

const table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
    , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
    , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
    , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

function challenge1() {
    let query1 = 
    `SELECT name, party, grade 
    FROM Politicians 
    WHERE party = 'R' AND grade > 9 AND grade < 11`
    db.all(query1, function(err, rows) {
        if(err) {
            console.log(err)
        } else {
            let header = Object.keys(rows[0])
            table.push(header)
            for(let i in rows) {
                table.push(Object.values(rows[i]))
            }
        }
    console.log(table.toString())
    })
}


function challenge2() {
    let query2 = 
    `SELECT COUNT(voterId) AS totalVote, Politicians.name 
    FROM Politicians 
    JOIN Votes ON Politicians.id = Votes.politicianId 
    WHERE name = 'Olympia Snowe'`

    db.all(query2, function(err, rows) {
        if(err) {
            console.log(err)
        } else {
            let header = Object.keys(rows[0])
            table.push(header)
            for(let i in rows) {
                table.push(Object.values(rows[i]))
            }
        }
        console.log(table.toString())
    })
}

function challenge3() {
    let query3 = 
    `SELECT name, COUNT(voterId) AS totalVote FROM Politicians
    JOIN Votes
    ON Politicians.id = votes.politicianId
    WHERE Politicians.name LIKE 'Adam %'
    GROUP BY votes.politicianId`
    db.all(query3, function(err, rows) {
        if(err) {
            console.log(err)
        } else {
            let header = Object.keys(rows[0])
            table.push(header)
            for(let i in rows) {
                table.push(Object.values(rows[i]))
            }
        }
        console.log(table.toString())
    })
}


function challenge4() {
    let query4 = 
    `SELECT COUNT(voterId) AS totalVote, Politicians.name, Politicians.party, Politicians.location FROM Politicians 
    JOIN Votes
    ON Politicians.id = Votes.politicianId
    GROUP BY Politicians.name
    ORDER BY totalVote DESC
    LIMIT 3`
    db.all(query4, function(err, rows) {
        if(err) {
            console.log(err)
        } else {
            let header = Object.keys(rows[0])
            table.push(header)
            for(let i in rows) {
                table.push(Object.values(rows[i]))
            }
        }
        console.log(table.toString())
    })
}

    
function challenge5() {
    let query4 = 
    `SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age
    FROM Voters
    JOIN Votes
    ON Votes.voterId = Voters.id
    WHERE politicianId = (  SELECT Politicians.id 
                        FROM Politicians 
                        WHERE name = 'Olympia Snowe')`
    db.all(query4, function(err, rows) {
        if(err) {
            console.log(err)
        } else {
            let header = Object.keys(rows[0])
            table.push(header)
            for(let i in rows) {
                table.push(Object.values(rows[i]))
            }
        }
        console.log(table.toString())
    })
}

challenge1()
challenge2()
challenge3()
challenge4()
challenge5()
