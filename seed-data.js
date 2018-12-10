const db = require('./setup.js')
const fs =  require('fs')

const politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n').slice(1)
const voters =  fs.readFileSync('./voters.csv', 'utf8').split('\n').slice(1)
const votes = fs.readFileSync('./votes.csv', 'utf8').split('\n').slice(1)

//db.serialize(function(err){
//     if(err) {
//         console.log(err)
//     }else{
//     for(let i =0 ; i < politicians.length; i++){
//         let splitPoliticians = politicians[i].split(',')
//         //console.log(splitPoliticians)
//         const insertPoliticians = `INSERT INTO Politicians (nama, party, location, grade_current)
//         VALUES (
//                   "${splitPoliticians[0]}",
//                   "${splitPoliticians[1]}",
//                   "${splitPoliticians[2]}",
//                    ${splitPoliticians[3]}
//                   )`
//         db.run(insertPoliticians,function(err){
//             if (err) {
//                 console.log(err)
//             }else{
//                 console.log('data berhasil ditambah')
//             }
//         })
        
//     }
    
//     for(let i = 0 ; i < voters.length; i++) {
//         let votersSplit = voters[i].split(',')
//         const insertVoters = `INSERT INTO Voters (firstName, lastName, gender, age)
//         VALUES (
//                 "${votersSplit[0]}",
//                 "${votersSplit[1]}",
//                 "${votersSplit[2]}",
//                  ${votersSplit[3]}
//          )`
    
//         db.run(insertVoters,function(err) {
//             if(err) {
//                 console.log(err)
//             }
//             else {
//                 console.log('voters added')
//             }
//         })
//     }
    
//     for(let i = 0; i < votes.length; i++){
//         let splitVote = votes[i].split(',')
//         const insertVotes = `INSERT INTO Votes (voter_id, Politicians_id)
//         VALUES (
//             ${splitVote[0]},
//             ${splitVote[1]}
//         )`
    
//         db.run(insertVotes,function(err) {
//             if(err) {
//                 console.log(err)
//             }
//             else {
//                 console.log('vote added')
//             }
//          })
//         }
//     }

// })
function insertNewPoliticians(name, party, location, grade_current) {
        const newPoliticians =  `INSERT INTO Politicians (nama, party, location, grade_current)
            VALUES (
               "${name}",
                "${party}",
                "${location}",
                ${grade_current}
            )`
        db.run(newPoliticians, function(err){
            if(err){
                console.log(err)
            }else {
                console.log('data added')
            }
        })
}

function insertNewVoters(firstname, lastname, newGender, newAge) {
    const newVoters =  `INSERT INTO Voters (firstName, lastName, gender, age)
        VALUES (
           "${firstname}",
            "${lastname}",
            "${newGender}",
            ${newAge}
        )`
    db.run(newVoters, function(err){
        if(err){
            console.log(err)
        }else {
            console.log('data added')
        }
    })
}

function insertNewVotes(newVoter_id, newPoliticians_id) {
    const newVoterS =  `INSERT INTO Votes (Voter_id,Politicians_id)
        VALUES (
           ${newVoter_id},
            ${newPoliticians_id}
        )`
    db.run(newVoters, function(err){
        if(err){
            console.log(err)
        }else {
            console.log('data added')
        }
    })
}
function insertNewVoters(newID, newVote) {
    const newVoters =  `INSERT INTO Voters (id, vote_for)
        VALUES (
           "${firstname}",
            "${lastname}",
            "${newGender}",
            ${newAge}
        )`
    db.run(newVoters, function(err){
        if(err){
            console.log(err)
        }else {
            console.log('data added')
        }
    })
}
// //insertNewPoliticians('ahmad syukron','R','NY',10)

function updateDataPoliticians (newlocation, newgrade_current) {
        const updatePolitician = `UPDATE politicians 
        SET location = "${newlocation}",
        grade_current = "${newgrade_current}"
        WHERE id = 21`

        db.run(updatePolitician,function(err){
            if(err){
                console.log(err)
            }else{
                console.log('data updated')
            }
        })
 }
// //updateDataPoliticians('LA',11)

function deletDataPOliticians (id) {
        const deletePoliticians = `DELETE FROM Politicians
        WHERE id = ${id}
        `
        
        db.run(deletePoliticians,function(err){
           if(err){
                console.log(err)
           }else{
               console.log('data deleted')
           } 
        })
    
}
// //deletDataPOliticians(20)


db.serialize(function(){
    const selectName  =  `SELECT * FROM Politicians
        WHERE grade_current > 9`

    db.all(selectName, function(err,data){
        if(err){
            console.log(err)
        }else {
            console.log(data)
        }
    })

    const queryCountVoter = `SELECT COUNT(nama) AS totalVotes, nama FROM Politicians
        INNER JOIN Votes  
        ON Politicians.id = Votes.Politicians_id
        WHERE nama = "Olympia Snowe"
        GROUP BY nama`
        

    db.all(queryCountVoter, function(err,data){
        if(err){
            console.log(err)
        }else {
            console.log(data)
        }
    })

    const queryAdamCount = `SELECT nama, COUNT(nama) AS totalVote FROM Politicians
        INNER JOIN Votes
        ON Politicians.id = Votes.Politicians_id
        WHERE nama LIKE "%Adam%"
        GROUP BY nama`

    db.all(queryAdamCount, function(err,data){
        if(err){
                console.log(err)
            }else {
                console.log(data)
            }
        })

    const higherVotes = `SELECT COUNT(nama) AS totalVote, nama FROM politicians
    INNER JOIN votes
    ON politicians.id = Votes.Politicians_id  
    GROUP BY nama
    ORDER BY totalVote DESC
    LIMIT 3

    `
    db.all(higherVotes, function(err,data){
        if(err){
            console.log(err)
        }else {
            console.log(data)
        }
    })

    const queryVoterSnowe =  `SELECT Voters.firstName, Voters.lastName, Voters.gender, Voters.age FROM Voters
        INNER JOIN Votes  ON Voters.id = Votes.voter_id
        INNER JOIN Politicians  ON Politicians.id = Votes.Politicians_id
        WHERE nama = "Olympia Snowe"
       
        `
        db.all(queryVoterSnowe, function(err,data){
            if(err){
                console.log(err)
            }else {
                console.log(data)
            }
        })

})

   