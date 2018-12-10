
const db = require("./db");

//RELEASE 3: SOAL 1

db.serialize(function() {
    
    let selectParty = `SELECT name, party, grade_current FROM Politicians
                       WHERE party = "R" AND grade_current >= 9 AND grade_current < 11`
    
    db.all(selectParty, function(err, data) {
        if(err) {
            throw err
        } else {
            console.log(data)
        }
    })
    
    //RELEASE 3: SOAL NOMOR 2
    
    let selectOlympiaSnowe = `SELECT name, COUNT(Votes.politicianId) AS totalVotes FROM Politicians 
                              JOIN Votes ON Politicians.id = Votes.politicianId 
                              GROUP BY name
                              HAVING name LIKE "Olympia Snowe";`
                              
    
    db.all(selectOlympiaSnowe, function(err, data) {
        if(err) {
            throw err
        } else {
            console.log(data)
        }
    })
    
    //RELEASE 3: NOMOR 3
    let olympiaSnoweVoter = `SELECT name, COUNT(Votes.politicianId) AS totalVotes FROM Politicians
                             JOIN Votes ON Politicians.id = Votes.politicianId
                             GROUP BY name
                             HAVING name LIKE "Adam%";`
    
    db.all(olympiaSnoweVoter, function(err, data) {
        if(err) {
            throw err
        } else {
            console.log(data)
        }
    })
    
    //RELEASE 3: NOMOR 4
    
    let getAverage = `SELECT name, party, location, COUNT(Votes.politicianId) AS totalVotes FROM Politicians
                      JOIN Votes ON Politicians.id = Votes.politicianId
                      GROUP BY name
                      ORDER BY totalVotes DESC`
    db.all(getAverage, function(err, data) {
        if(err) {
            throw err
        } else {
            console.log(data)
        }
    })
    
    let showOlympiaVoters = `SELECT first_name, last_name, gender, age FROM Voters 
                             JOIN Votes ON Voters.id = Votes.voterId
                             WHERE politicianId = 17`
                             
    db.all(showOlympiaVoters, function(err, data) {
        if(err) {
            throw err
        } else {
            console.log(data)
        }
    })
})