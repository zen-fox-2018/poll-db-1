const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pollDB.db');
const fs = require('fs');

db.serialize(function() {
    const qInsertPolitician = fs.readFileSync('./politicians.csv', "utf8").split("\n").slice(1)
    for(let i = 0; i <  qInsertPolitician.length; i++) {
        let split = qInsertPolitician[i].split(',')
        db.run(`INSERT INTO Politicians(name, party, location, grade_current)
        VALUES
        ("${split[0]}","${split[1]}","${split[2]}",${Number(split[3])})
        `, function(err){
            if(err) {
                console.log(err)
            }else{
                console.log(`sucsess`)
            }
        })
    }

    const qInsertVoters = fs.readFileSync('./voters.csv', "utf8").split("\n").slice(1)
    for(let i = 0; i <  qInsertVoters.length; i++) {
        let split = qInsertVoters[i].split(',')
        db.run(`INSERT INTO Voters(first_name,last_name,gender,age)
        VALUES
        ("${split[0]}","${split[1]}","${split[2]}",${Number(split[3])})
        `, function(err){
            if(err) {
                console.log(err)
            }else{
                console.log(`sucsess`)
            }
        })
    }

    const qInsertVotes = fs.readFileSync('./votes.csv', "utf8").split("\n").slice(1)
    for(let i = 0; i <  qInsertVotes.length; i++) {
        let split = qInsertVotes[i].split(',')
        db.run(`INSERT INTO Votes(voterId,politicianId)
        VALUES
        (${Number(split[0])},${Number(split[1])})
        `, function(err){
            if(err) {
                console.log(err)
            }else{
                console.log(`sucsess`)
            }
        })
    }

});

function insert (tableName, input) {
    switch (tableName) {
        case 'Politicians': 
        db.run(`INSERT INTO Politicians (name, party, location, grade_current)
        VALUES
        ( ("${input[0]}","${input[1]}","${input[2]}",${Number(input[3])}))
        `, function(err){
            if(err) {
                console.log(err)
            }else{
                console.log(`sucsess`)
            }
        }) 
            break;
        case 'Voters' :
        db.run(`INSERT INTO Voters (first_name,last_name,gender,age)
        VALUES
        ( ("${input[0]}","${input[1]}","${input[2]}",${Number(input[3])}))
        `, function(err){
            if(err) {
                console.log(err)
            }else{
                console.log(`sucsess`)
            }
        }) 
            break
        case 'Votes' :
        db.run(`INSERT INTO Votes (voterId,politicianId)
        VALUES
        ( ("${Number(input[0])}","${Number(input[1])}"))
        `, function(err){
            if(err) {
                console.log(err)
            }else{
                console.log(`sucsess`)
            }
        }) 
            break
        default: console.log('error')
            break;
    }
}

function updateData (tableName,id, field, value) {
    let update = `
                UPDATE ${tableName}
                SET ${field} = "${value}"
                WHERE ${tableName}.id = ${id};
                `
    db.run(update, function(err){
        if(err) {
            console.log(err)
        }else{
            console.log(`sucsess update`)
        }
    })
}

function deleteData (tableName, id) {
    let deleted = `
    DELETE FROM ${tableName} WHERE id = "${id}";
    `
    db.run(deleted, function(err){
        if(err) {
            console.log(err)
        }else{
            console.log(`Sucsess Delete`)
        }
    })
   
}

function findAll (input) {
    db.all(input ,function (err, data) {
        if(err) {
            console.log(err)
        }else{
            console.log(data)
        }
    })
}

let sql1 = `
            SELECT 
            name, party, grade_current
            FROM Politicians
            WHERE 
                grade_current BETWEEN 9 AND 11
                AND party = "R";
`

let sql2 = ` 
            SELECT 
                Count(PoliticianId) AS "totalVote",
                name
            FROM Politicians
            INNER JOIN Votes ON Politicians.id = Votes.PoliticianID
            WHERE Politicians.name = "Olympia Snowe";
`
// findAll(sql2)
let sql3 = `
            SELECT 
                name,
                COUNT (Votes.PoliticianID) AS "totalVote"
            FROM Politicians
            INNER JOIN Votes ON Politicians.id = Votes.PoliticianID
            GROUP BY Politicians.name
            HAVING
                Politicians.name LIKE "Adam %";
`

let sql4 = `
        SELECT 
        COUNT (PoliticianID) AS "totalVote",
        name,
        party,
        location
        FROM Politicians
        INNER JOIN Votes ON Politicians.id = Votes.PoliticianID
        GROUP BY Politicians.name
        ORDER BY totalVote DESC
        LIMIT 3
        ;
`
findAll(sql4)
let sql5 = `
            SELECT 
                Voters.first_name,
                Voters.last_name,
                Voters.gender,
                Voters.age
            FROM Votes
            INNER JOIN Voters ON Votes.voterId = Voters.id
            WHERE Votes.politicianId = (SELECT 
                                    id
                                    FROM
                                    Politicians
                                    WHERE 
                                    Politicians.name = "Olympia Snowe"
                                    );
`

// let sql5 = `
//             SELECT 
//                 Voters.first_name,
//                 Voters.last_name,
//                 Voters.gender,
//                 Voters.age
//             FROM Votes
//             INNER JOIN Voters ON Votes.voterId = Voters.id
//             INNER JOIN Politicians ON Votes.politicianId = Politicians.id
//             WHERE Politicians.name = "Olympia Snowe"
// `
// findAll(sql5)


db.close();