//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

class Setup {
  //politicians
  static setup(){
    db.serialize( function() {
      var createPoliticians =  `CREATE TABLE
                                  Politicians (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                               name TEXT,
                                               party TEXT,
                                               location TEXT,
                                               grade_current REAL)`
      db.run(createPoliticians, function(errPol, data){
        if (errPol) {
          console.log('err pol:',errPol);
        }
        else {
          console.log('Table politicians created!');
        }
      });
      // db.close();


      //voters
      var createVoters =  `CREATE TABLE
                              Voters (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      first_name TEXT,
                                      last_name TEXT,
                                      gender varchar(20),
                                      age INTEGER)`
      db.run(createVoters, function(errVoter, data){
        if (errVoter) {
          console.log('err Voter :',errVoter);
        }
        else {
          console.log('Table voters created!');
        }
      });
      // db.close();

      //votes
      var createVotes =  `CREATE TABLE
                            Votes (voterId INTEGER,
                                   politicianId INTEGER,
                                   FOREIGN KEY (politicianId) REFERENCES Politician(id),
                                   FOREIGN KEY (VoterId) REFERENCES Voters(id))`
      db.run(createVotes, function(errVotes, data){
        if (errVotes) {
          console.log('err Votes :',errVotes);
        }
        else {
          console.log('Table votes created!');
        }
      });
      db.close();
    })
  }
}
Setup.setup();
