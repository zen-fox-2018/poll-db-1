const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

db.serialize(() => {
    const qCreateTablePoliticians = `CREATE TABLE IF NOT EXISTS 'Politicians' (
            'id' INTEGER PRIMARY KEY AUTOINCREMENT , 
            'name' TEXT,
            'party' varchar(20),
            'location' TEXT,
            'grade_current' INTEGER
        )`
        const qCreateTableVoters = `CREATE TABLE IF NOT EXISTS  'Voters' (
            'id' INTEGER PRIMARY KEY AUTOINCREMENT , 
            'first_name' TEXT,
            'last_name' TEXT,
            'gender' varchar(20),
            'age' INTEGER
        )`
        db.run(qCreateTablePoliticians, (err) =>{
            if(err) {
                console.log(err);
                
            } else {
                console.log('Success create Table Politicians');
                
            }
        })
        db.run(qCreateTableVoters, (err) =>{
            if(err) {
                console.log(err);
                
            } else {
                console.log('Success create Table Voters');
                
            }
        })

        const qCreateTablePoliticiansVoters = `CREATE TABLE IF NOT EXISTS  'Politicians-Voters' (
            'id' INTEGER PRIMARY KEY AUTOINCREMENT ,
            'Politicians_id' INTEGER,
            'Voters_id' INTEGER,
            FOREIGN KEY ('Politicians_id') REFERENCES Politicians('id'), 
            FOREIGN KEY ('Voters_id') REFERENCES Voters('id')
        )`
        db.run(qCreateTablePoliticiansVoters, (err)=>{
            if(err){
                console.log(err);
            } else {
                console.log('Success Create Table Votes');
            }
        })
        

})


module.exports = db