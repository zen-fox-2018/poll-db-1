const db = require('./setup.js')
const fs = require('fs')

function readDocument(lokasi_file, cb) {
    fs.readFile(lokasi_file, 'utf8', function (err, data) {
        if (err) {
            console.log('error baca doc', err)
        }
        else {
            cb(null, data)
        }
    })
}


function parsingDocument(lokasi_file, cb) {
    readDocument(lokasi_file, function (err, data) {
        if (err) {
            console.log('error parsing', err)
            cb(err, null)
        }
        else {
            // console.log(data)
            let politiciansDoc = data.split('\n').slice(1)
            let newDoc = []
            for (let i = 0; i < politiciansDoc.length; i++) {
                let singleData = politiciansDoc[i].split(',')
                let newDocInside = []
                for (let j = 0; j < singleData.length; j++) {
                    newDocInside.push(singleData[j])
                }
                newDoc.push(newDocInside)
            }
            // console.log(newDoc)
            cb(null, newDoc)
        }
    })

}

function tampilkanQueryDariTable(untuk, query, cb) {
    db.run(query, function (err, msg) {
        if (err) {
            // console.log(err)
            cb(err)
        }
        else {
            let msg = `sukses ${untuk}`
            cb(msg)
        }
    })


}
//update
function queryUpdate(namaTabel, namaKolom, value, id) {
    let query = `UPDATE ${namaTabel} SET ${namaKolom} = '${value}' WHERE ${namaTabel}.id = ${id} `
    return query
}
//delete
function queryDelete(namaTabel, namaKolom, value) {
    let query = `DELETE FROM ${namaTabel} WHERE ${namaKolom} IS '${value}' `
    return query
}

//UPDATE
// let query = queryUpdate("Voters","gender", "female",5)
// tampilkanQueryDariTable('update',query, function(err,msg){
//     if(err){
//         console.log(err)
//     }
//     else {
//         console.log(msg)
//     }
// })

//DELETE
// let query2 = queryDelete("Voters","gender", "male")
// tampilkanQueryDariTable('delete',query2, function(err,msg){
//     if(err){
//         console.log(err)
//     }
//     else {
//         console.log(msg)
//     }
// })


function insertDatatoTable(lokasi_file, dataName, cb) {
    db.serialize(function () {
        if (dataName === 'politician') {
            parsingDocument(lokasi_file, function (err, data) {
                if (err) {
                    console.log('ini error insert tabel politician', err)
                }
                else {
                    let processedData = data
                    // console.log(processedData)
                    for (let i = 0; i < processedData.length; i++) {
                        let query = `INSERT INTO Politicians (name, party, location, grade_current)
                    VALUES (
                        "${processedData[i][0]}",
                        "${processedData[i][1]}",
                        "${processedData[i][2]}",
                        ${processedData[i][3]}
                    )`
                        db.run(query, function (err) {
                            if (err) {
                                cb(err)
                            }
                            else {
                                let msg = 'sukses  data ke tabel politician'
                                cb(msg)
                            }
                        })
                    }
                }
            })
        }
        else if (dataName === 'voters') {
            parsingDocument(lokasi_file, function (err, data) {
                if (err) {
                    console.log('ini error insert tabel voters', err)
                }
                else {
                    let processedData = data
                    // console.log(processedData)
                    for (let i = 0; i < processedData.length; i++) {
                        let query = `INSERT INTO Voters (first_name, last_name, gender, age)
                        VALUES (
                            "${processedData[i][0]}",
                            "${processedData[i][1]}",
                            "${processedData[i][2]}",
                            ${processedData[i][3]}
                        )`
                        db.run(query, function (err) {
                            if (err) {
                                cb(err)
                            }
                            else {
                                let msg = 'sukses  data ke tabel voters'
                                cb(msg)
                            }
                        })
                    }
                }
            })
        }

        else if (dataName === 'votes') {
            parsingDocument(lokasi_file, function (err, data) {
                if (err) {
                    console.log('ini error insert tabel vote', err)
                }
                else {
                    let processedData = data
                    // console.log(processedData)
                    for (let i = 0; i < processedData.length; i++) {
                        let query = `INSERT INTO Votes (voterId, politicianId)
                        VALUES (
                            ${processedData[i][0]},
                            ${processedData[i][1]}
                        )`
                        db.run(query, function (err) {
                            if (err) {
                                cb(err)
                            }
                            else {
                                let msg = 'sukses  data ke tabel votes'
                                cb(msg)
                            }
                        })
                    }
                }
            })
        }
    })
}



//ENTRI data POLITIKUS ke DATABASE
// insertDatatoTable('./politicians.csv','politician', function(err,msg){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(msg)
//     }
// })

//ENTRI data VOTERS ke DATABASE
// insertDatatoTable('./voters.csv', 'voters', function (err, msg) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(msg)
//     }
// })

//ENTRI data JUMLAH VOTE ke DATABASE
// insertDatatoTable('./votes.csv', 'votes', function (err, msg) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(msg)
//     }
// })

//release 3
let query3 = `SELECT 
name, party, grade_current
FROM Politicians
WHERE 
grade_current BETWEEN 9 AND 11 AND
party = 'R'
ORDER BY name ASC`

//release 3 nomor 2
let query4 = `
SELECT COUNT(Votes.voterId) AS totalVote, name
FROM Politicians
INNER JOIN Votes ON  Politicians.id = Votes.politicianId
WHERE Politicians.name = 'Olympia Snowe' `

//release 3 nomor 3
let query5 = `
SELECT name, COUNT(Votes.voterId) AS totalVote
FROM Politicians
LEFT JOIN Votes ON Politicians.id = Votes.PoliticianId
WHERE Politicians.name LIKE '%Adam%'
GROUP BY Politicians.name`

//release 3 nomor 4
let query6 = `
SELECT COUNT(Votes.voterId) AS totalVote, name, party, location
FROM Politicians
LEFT JOIN Votes ON Politicians.id = Votes.PoliticianId
GROUP BY Politicians.name
ORDER BY totalVote DESC
LIMIT 3`

//release 3 nomer 5
let query7 = `
SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age 
FROM Voters
INNER JOIN Votes ON Votes.voterId = Voters.id
INNER JOIN Politicians ON Votes.politicianId = Politicians.id
WHERE Politicians.name = 'Olympia Snowe'`

db.all(query7, function (err, rows) {
    if (err) {
        console.log(err)
        // cb(err)
    }
    else {
        // let msg = `sukses ${untuk}`               
        console.log(rows)
    }
})

