const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database.db');


function insertDataPoliticians(name, party, location, grade_current) {
    let qInsertNew =
        `INSERT INTO Politicians (name, party, location, grade_current)
         VALUES ("${name}", "${party}", "${location}", ${grade_current})`

    db.all(qInsertNew, function (err,data) {
        if (err) {
            console.log(err)
        } else (
            // console.log(data)
            console.log("Insert New Data Politicians Table Success")
        )
    })
}

function insertDataVoters(first_name,last_name,gender,age) {
    let qInsertNew =
        `INSERT INTO Voters (first_name,last_name,gender,age)
         VALUES ("${first_name}", "${last_name}", "${gender}", ${age})`

    db.all(qInsertNew, function (err,data) {
        if (err) {
            console.log(err)
        } else (
            // console.log(data)
            console.log("Insert New Data Voters Table Success")
        )
    })
}

function insertDataVotes(voterId,politicianId) {
    let qInsertNew =
        `INSERT INTO Votes (voterId,politicianId,)
         VALUES (${voterId}, ${politicianId})`

    db.all(qInsertNew, function (err,data) {
        if (err) {
            console.log(err)
        } else (
            // console.log(data)
            console.log("Insert New Data Votes Table Success")
        )
    })
}

function deleteData(table,id) {
    let qDelete =
        `DELETE FROM ${table}
         WHERE id = ${id}`

    db.all(qDelete, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete Data Success")
        }
    })
}

function updateDataPoliticians(name,party,location,grade_current,id) {
    let qUpdate =
        `UPDATE Politicians
         SET name = "${name}" ,party = "${party}" ,location = "${location}",grade_current = ${grade_current}
         WHERE id = ${id}`

    db.all(qUpdate, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Update Data Politicians Table berhasil")
        }
    })
}

function updateDataVoters(first_name,last_name,gender,age,id) {
    let qUpdate =
        `UPDATE Voters
         SET first_name = "${first_name}" ,last_name = "${last_name}" ,gender = "${gender}",age = ${age}
         WHERE id = ${id}`

    db.all(qUpdate, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Update Data Voters Table berhasil")
        }
    })
}

function updateDataVotes(voterId,politicianId,id) {
    let qUpdate =
        `UPDATE Votes
         SET voterId = ${voterId} ,politicianId = ${politicianId}
         WHERE id = ${id}`

    db.all(qUpdate, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Update Data Votes Table berhasil")
        }
    })
}

insertDataPoliticians('Rachmad Zaini', 'G', 'PLG', 20)
insertDataPoliticians('Mahdi Haris', 'G', 'JKT', 20)
insertDataVoters('Rina','Rosyada','female',23)
insertDataVotes(151,21)
deleteData('Politicians',22)
updateDataPoliticians('Prabowo','D','JKT',19,21)
updateDataVoters('Hermione','Granger','female',20,151)
updateDataVotes(151,22,164)


let qR31 =
    `SELECT name, party, grade_current 
     FROM Politicians 
     WHERE party = 'R' 
     AND grade_current 
     BETWEEN 9 AND 11`

let qR32 =
    `SELECT COUNT(Votes.voterId) AS totalVote, Politicians.name 
     FROM Votes 
     INNER JOIN Politicians 
     ON Votes.politicianId = Politicians.id 
     WHERE name = "Olympia Snowe"
     GROUP BY name`

let qR33 =
    `SELECT Politicians.name , COUNT(Votes.voterId) AS totalVote
     FROM Politicians
     INNER JOIN Votes
     ON Politicians.id = Votes.politicianId
     WHERE name LIKE "%Adam%"
     GROUP BY name`

let qR34 =
    `SELECT COUNT(Votes.voterId) AS totalVote, Politicians.name, Politicians.party, Politicians.location
     FROM Votes
     INNER JOIN Politicians
     ON Votes.politicianId = Politicians.id
     GROUP BY name
     ORDER BY totalVOte DESC
     LIMIT 3`

let qR35 = 
    `SELECT first_name, last_name, gender, age FROM Voters
     INNER JOIN Votes
     ON Voters.id = Votes.voterId
     INNER JOIN Politicians
     ON Votes.politicianId = Politicians.id
     WHERE Politicians.name = "Olympia Snowe"`

db.serialize(function (err) {
    if (err) {
        console.log(err)
    } else {
        //R31
        db.all(qR31, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('Release 3 No. 1')
                console.table(data)
                console.log('')
            }
        })
        //R32
        db.all(qR32, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('Release 3 No. 2')
                console.table(data)
                console.log('')
            }
        })
        //R33
        db.all(qR33, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('Release 3 No. 3')
                console.table(data)
                console.log('')
            }
        })
        //R34
        db.all(qR34, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('Release 3 No. 4')
                console.table(data)
                console.log('')
            }
        })
        //R35
        db.all(qR35, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('Release 3 No. 5')
                console.table(data)
            }
        })
    }
})