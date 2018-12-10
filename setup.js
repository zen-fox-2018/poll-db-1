//your code here
const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const db =  new sqlite3.Database('database.db');

db.serialize(function(){
        // const qCreateTablePolitician = `CREATE TABLE 'Politicians' (
        //                 'id' INTEGER PRIMARY KEY AUTOINCREMENT, 
        //                 'nama' TEXT, 
        //                 'party' varchar(20),
        //                 'location' TEXT,
        //                 'grade_current' INTEGER)`

        // const qCreateTableVoter = `CREATE TABLE 'Voters' (
        //                 'id' INTEGER PRIMARY KEY AUTOINCREMENT,
        //                 'firstName' varchar(20),
        //                 'lastName' varchar(20),
        //                 'gender' TEXT,
        //                 'age' INTEGER)`

//         const qCreateVoteTable = `CREATE TABLE 'Votes' (
//                         'id' INTEGER PRIMARY KEY AUTOINCREMENT,
//                         'voter_id' INTEGER,
//                         'politicians_id' INTEGER)`

//         //db.run(qCreateTablePolitician)
//        // db.run(qCreateTableVoter)
//         db.run(qCreateVoteTable)
})
module.exports = db