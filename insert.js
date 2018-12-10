
const db = require("./db");
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case "politicians":
        let insertNewCandidates = `INSERT INTO Candidates (name, party, location, grade_current)
                                VALUES("${args[1]}", "${args[2]}", "${args[3]}", ${args[4]});`
        db.run(insertNewCandidates, function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log("Sucessfully added new candidates!")
            }
        })
        break;
    case "voters" :
        let insertNewVoters = `INSERT INTO Voters (first_name, last_name, gender, age)
                                VALUES("${args[1]}", "${args[2]}", "${args[3]}", ${args[4]});`
        db.run(insertNewVoters, function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log("You have successfully added this person to Voters table!")
            }
        })
    break;
    default: "Please choose between Candidates or Voters to add a new person!"
        break;
}