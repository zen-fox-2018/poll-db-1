const db = require('./dbConnection.js')
const argv = process.argv.slice(2);

switch (argv[0]) {
  case 'insert':
    insertData(argv[1], [argv[2], argv[3], argv[4], argv[5]])
    break;

  case 'update':
    updateData(argv[1], argv[2], [argv[3], argv[4], argv[5], argv[6]])
    break;

  case 'delete':
    deleteData(argv[1], argv[2])
    break;
  default:
    console.log(`COMMAND FOR CRUD:
    FOR INSERT
    > node crud.js insert Politicians  name  party  location  grade_current
    > node crud.js insert Voters  first_name  last_name  gender  age
    > node crud.js insert Votes  voterId  politicianId
    FOR UPDATE
    > node crud.js update id  Politicians  name  party  location  grade_current
    > node crud.js update id  Voters  first_name  last_name  gender  age
    > node crud.js update id  Votes  voterId  politicianId
    FOR DELETE
    > node crud.js delete id  Politicians
    > node crud.js delete id  Voters
    > node crud.js delete id  Votes
    `)
}

function insertData(database, newData) {
  let query = null
  if (database === 'Politicians') {
    query = `
      INSERT INTO Politicians (name, party, location, grade_current)
      VALUES ("${newData[0]}", "${newData[1]}", "${newData[2]}", ${Number(newData[3])})
    `
  } else if (database === 'Voters') {
    query = `
      INSERT INTO Voters (first_name, last_name, gender, age)
      VALUES ("${newData[0]}", "${newData[1]}", "${newData[2]}", ${Number(newData[3])})
    `
  } else if (database === 'Votes') {
    query = `
      INSERT INTO Votes (voterId, politicianId)
      VALUES (${Number(newData[0])}, ${Number(newData[1])})
    `
  }

  db.run(query, (err) => {
    if (err) {
      console.log('Insert Gagal')
    } else {
      console.log('Insert Berhasil')
    }
  })
}

function updateData(id, database, newData) {
  let query = null
  if (database === 'Politicians') {
    query = `
      UPDATE Politicians
      SET name = "${newData[0]}", party = "${newData[1]}", location = "${newData[2]}", grade_current = ${Number(newData[3])}
      WHERE id = ${id}; 
    `
  } else if (database === 'Voters') {
    query = `
      UPDATE Voters
      SET first_name = "${newData[0]}", last_name = "${newData[1]}", gender = "${newData[2]}", age = ${Number(newData[3])}
      WHERE id = ${id}; 
    `
  } else if (database === 'Votes') {
    query = `
      UPDATE Votes
      SET voterId = ${Number(newData[0])}, politicianId = ${Number(newData[1])}
      WHERE id = ${id}; 
    `
  }

  db.run(query, (err) => {
    if (err) {
      console.log('Update Gagal')
    } else {
      console.log('Update Berhasil')
    }
  })
}

function deleteData(id, database) {
  let query = null
  if (database === 'Politicians') {
    query = `
      DELETE FROM Politicians WHERE id = ${id};
    `
  } else if (database === 'Voters') {
    query = `
      DELETE FROM Voters WHERE id = ${id};
    `
  } else if (database === 'Votes') {
    query = `
      DELETE FROM Votes WHERE id = ${id}; 
    `
  }

  db.run(query, (err) => {
    if (err) {
      console.log('Delete Gagal')
    } else {
      console.log('Delete Berhasil')
    }
  })
}