const fs = require('fs')
const db = require('./setup.js')

const politicians = fs.readFileSync('politicians.csv','utf8').split('\n').slice(1)
const voters = fs.readFileSync('voters.csv','utf8').split('\n').slice(1)
const votes = fs.readFileSync('votes.csv','utf8').split('\n').slice(1)

//Masukin Data

// db.serialize(()=> {

//     for(let i = 0 ; i < politicians.length; i++){
//         let politiciansSplit = politicians[i].split(',')
//         const queryInsertPol = `INSERT INTO Politicians (name, party, location, grade_current)
//         VALUES(
//             '${politiciansSplit[0]}',
//             '${politiciansSplit[1]}',
//             '${politiciansSplit[2]}',
//             '${Number(politiciansSplit[3])}'
//         )`
//         db.run(queryInsertPol, (err) =>{
//             if(err) console.log(err);
//             else console.log('Success add data');
            
            
//         })
//     }
    
//     for(let i = 0 ; i < voters.length; i++){
//         let votersSplit = voters[i].split(',')
//         console.log(votersSplit);
        
//         const queryInsertvoters = `INSERT INTO Voters (first_name, last_name, gender, age)
//         VALUES(
//             "${votersSplit[0]}",
//             "${votersSplit[1]}",
//             "${votersSplit[2]}",
//             "${Number(votersSplit[3])}"
//         )`
//         db.run(queryInsertvoters, (err) =>{
//             if(err) console.log(err);
//             else console.log('Success add data');
            
//         })
//     }
    
    
//     for(let i = 0 ; i < votes.length; i++){
//         let votesSplit = votes[i].split(',')
//         const queryInsertvotes = `INSERT INTO 'Politicians-Voters' (Voters_id, Politicians_id)
//         VALUES(
//             '${Number(votesSplit[0])}',
//             '${Number(votesSplit[1])}'
//         )`
//         db.run(queryInsertvotes, (err) =>{
//             if(err) console.log(err);
//             else console.log('Success add data');
            
//         })
//     }
// })


function InsertDataPoliticians(name, party, location, grade_current) {
    const queryInsertPol = `INSERT INTO Politicians (name, party, location, grade_current)
    VALUES(
        ${name},
        ${party},
        ${location},
        ${grade_current}
    );`

    db.run(queryInsertPol, (err) =>{
        if(err) console.log(err);
        else console.log('Success add data');
    })
}

function InsertDataVoters(first_name, last_name, gender, age) {
    const queryInsertvoters = `INSERT INTO Voters (first_name, last_name, gender, age)
    VALUES(
        "${first_name}",
        "${last_name}",
        "${gender}",
        "${Number(age)}"
    )`

    db.run(queryInsertvoters, (err) =>{
        if(err) console.log(err);
        else console.log('Success add data');
        
    })
}


function InsertDataVotes(idVoters, idPolitician) {
    const queryInsertvoters = `INSERT INTO Politicians-Voters VALUES(null, ${idVoters}, ${idPolitician});`

    db.run(queryInsertvoters, (err) =>{
        if(err) console.log(err);
        else console.log('Success add data');
        
    })
}

function UpdateDataVoters(id, first_name, last_name, gender, age) {
    const qUpdateVoters = `
        UPDATE Voters 
        SET first_name = "${first_name}",
            last_name = "${last_name}",
            gender = "${gender}",
            age = ${age}
        WHERE id = ${id};`
        db.run(qUpdateVoters, (err) =>{
            if(err) console.log(err);
            else console.log('Berhasil Update Data');
            
        })
}

function UpdateDataVotes(id,idVoters, idPolitician) {
    const qUpdateVotes = `
        UPDATE 'Politicians-Voters' 
        SET Voters_id = ${idVoters},
            Policitians_id = ${idPolitician}
        WHERE id = ${id};`
        db.run(qUpdateVotes, (err) =>{
            if(err) console.log(err);
            else console.log('Berhasil Update Data');
            
        })
}

function UpdateDataPoliticians(id, name, party, location, grade_current) {
    const qUpdatePoliticians = `
        UPDATE Politicians 
        SET name = "${name}",
            party = "${party}",
            location = "${location}",
            grade_current = ${grade_current}
        WHERE id = ${id};`
        db.run(qUpdatePoliticians, (err) =>{
            if(err) console.log(err);
            else console.log('Berhasil Update Data');
            
        })
}

function DeleteData(nameTable,id) {
    const qDelete= `
        DELETE FROM "${nameTable}" WHERE id = ${id};`
        db.run(qDelete,(err) => {
            if(err) console.log(err);
            else console.log(`Berhasil Delete data id ${id} di table ${nameTable}`);
        })
}

db.serialize(()=> {
    // InsertDataVoters('Christian', 'Sihotang', 'male', 23)
    // UpdateDataVoters(151, 'Chris', 'Sihotang', 'male', 24)
    // DeleteData('Voters', 151)
    db.all(`SELECT name, party, location, grade_current FROM Politicians
    WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;`, 
    (err,data)=> {
    if(err) console.log(err);
    else{
        console.log(data);
    }
    })



    db.all(`SELECT COUNT(*) AS totalVote, Politicians.name  FROM 'Politicians-Voters'
    JOIN Politicians
    ON Politicians.id = 'Politicians-Voters'.Politicians_id
    WHERE Politicians.name = 'Olympia Snowe'
    GROUP BY Politicians.name;`, 
    (err,data)=> {
    if(err) console.log(err);
    else{
        console.log(data);
    }
    })

    db.all(`SELECT Politicians.name , COUNT(*) AS totalVote FROM Politicians
    JOIN 'Politicians-Voters' 
    ON Politicians.id = 'Politicians-Voters'.Politicians_id
    WHERE Politicians.name LIKE "Adam %"
    GROUP BY Politicians.name;` ,
    (err, data)=> {
    if(err) console.log(err);
    else {
        console.log(data);
        
    }
    })

    db.all(`SELECT COUNT(*) AS totalVote, Politicians.name, Politicians.party, Politicians.location FROM Politicians
    JOIN 'Politicians-Voters' 
    ON Politicians.id = 'Politicians-Voters'.Politicians_id
    GROUP BY Politicians.name
    ORDER BY totalVote DESC LIMIT 3;` ,
    (err,data)=> {
    if(err) console.log(err);
    else console.log(data);
    })

    db.all(`SELECT Voters.first_name, Voters.last_name , Voters.gender, Voters.age FROM 'Politicians-Voters'
    JOIN  Voters
    ON 'Politicians-Voters'.Voters_id = Voters.id
    JOIN Politicians
    ON 'Politicians-Voters'.Politicians_id = Politicians.id
    WHERE Politicians.name = 'Olympia Snowe' ;
    `,
    (err,data)=> {
        if(err) console.log(err);
        else console.log(data);
        
    })
})