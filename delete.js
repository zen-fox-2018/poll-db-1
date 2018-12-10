
const db = require("./db");
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case "politicians":
        let deletePoliticians = `DELETE FROM Politicians
                                WHERE id = ${args[1]};`
        db.run(deletePoliticians, function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log("You have successfully deleted this person from Politicians!")
            }
        })
        break;
    case "voters":
        let deleteVoters = `DELETE FROM Voters
                            WHERE voters_id = ${args[1]};`
        db.run(deleteVoters, function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log("You have successfully deleted this person fomr Voters!")
            }
        })
    default:
        break;
}
