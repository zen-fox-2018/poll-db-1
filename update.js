const db = require("./db");
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case "voters":
    let updateVoters = `UPDATE Voters 
                        SET first_name = "${args[1]}",
                            last_name = "${args[2]}",
                            gender = "${args[3]}",
                            age = ${args[4]}
                        WHERE 
                        voters_id = ${args[5]};`
    db.run(updateVoters, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Successfully updated this person")
        }
    })
        break;
    default:
        break;
}