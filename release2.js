const db = require('./db');
const args = process.argv.slice(2);

switch (args[0]) {
  //INSERT
  case 'insertPoliticians':
    insertPoliticians(args[1], args[2], args[3], args[4])
    break;

  case 'insertVoters':
    insertVoters(args[1], args[2], args[3], args[4])
    break;

  case 'insertVoting':
    insertVoting(args[1], args[2])
    break;

  //UPDATE
  case 'updatePoliticians':
    updatePoliticians(args[1], args[2], args[3], args[4], args[5])
    break;

  case 'updateVoter':
    updateVoters(args[1], args[2], args[3], args[4], args[5])
    break;
  
  case 'deletePoliticians':
    deletePoliticians(args[1])
    break;
  
  case 'deleteVoters':
    deleteVoters(args[1])
    break;

  //DELETE
}

//INSERT
function insertPoliticians(name, party, location, grade_current) {
  let insert = `INSERT INTO Politicians (
            nama,
            party,
            location,
            grade_current
        ) VALUES (
            '${name}',
            '${party}',
            '${location}',
            '${grade_current}'
        );}`
  db.run(insert, function (err) {
    if (err) {
      throw err
    }
    console.log("INSERT POLITICIANS SUKSES");

  })
}

function insertVoters(first_name, last_name, gender, age) {
  let insert = `INSERT INTO Voters (
                first_name,
                last_name,
                gender,
                age
            ) VALUES (
                '${first_name}',
                '${last_name}',
                '${gender}',
                '${age}'
            );}`

  db.run(insert, function (err) {
    if (err) {
      throw err
    }
    console.log("INSERT VOTERS SUKSES");

  })
}

function insertVoting(id_voter, id_politicians) {
  let insert = `INSERT INTO Votes (
                id_pejabat,
                id_voters
            ) VALUES (
                '${id_voter}',
                '${id_politicians}'
            );}`
  db.run(insert, function (err) {
    if (err) {
      throw err
    }
    console.log("INSERT VOTING SUKSES");

  })

}

//UPDATE
function updatePoliticians(id, name, party, location, grade_current) {
  let query = `UPDATE Politicians 
  SET nama = "${name}",
      party = "${party}",
      location = "${location}",
      grade_current = "${grade_current}"
      WHERE Id = "${id}"`

  db.run(query, function (err) {
    if (err) {
      throw err
    }
    console.log(`UPDATE POLITICIAN BERHASIL`);

  })
}

function updateVoters(id, first_name, last_name, gender, age) {
  let query = `UPDATE Voters 
  SET first_name = "${first_name}",
      last_name = "${last_name}",
      gender = "${gender}",
      age = "${age}"
      WHERE Id = "${id}"`

  db.run(query, function (err) {
    if (err) {
      throw err
    }
    console.log(`UPDATE VOTERS BERHASIL`);

  })
}

function deletePoliticians(id) {
  let query = `DELETE FROM Politicians WHERE Id = "${id}"`
  db.run(query, function (err) {
    if (err) {
      throw err
    }

    console.log("DELETE Politicians BERHASIL");

  })
}

function deleteVoters(id, first_name, last_name, gender, age) {
  let query = `DELETE FROM Voters WHERE Id = "${id}"`
  db.run(query, function (err) {
    if (err) {
      throw err
    }

    console.log("DELETE VOTERS BERHASIL");

  })
}


