const argv = process.argv.slice(2)
const db = require('./datab')

function update(table, id , field , value) {
  let query = `
    UPDATE ${table} 
    SET ${field} = "${value}"
    WHERE id = ${Number(id)}
  `
  db.run(query, (err) => {
    if(err) {
      console.log(`Error updating data : \n` , err)
    } else {
      console.log(`Success updating data`)
    }
  })
  db.close((err) => {
    if(err) {
      console.log(`Error closing database`, err)
    } else {
      console.log(`Success closing database`)
    }
  })
}

function deleteData(table, id) {
  let query = `
    DELETE FROM ${table}
    WHERE id = ${Number(id)}
  `
  db.run(query, (err) => {
    if(err) {
      console.log(`Error deleting data: \n`, err)
    } else {
      console.log(`Success deleting data`)
    }
  })
  db.close((err) => {
    if(err) {
      console.log(`Error closing database`)
    } else {
      console.log(`Success closing database`)
    }
  })
}

function insert(table, value) {
  let namaTable = table
  let field = null
  let val = null
  if (table == 'Politicians' && value.length == 4) {
    namaTable = 'Politicians'
    field = `(name, party, location, grade_current)`
    val = `("${value[0]}" , "${value[1]}" , "${value[2]}" , ${Number(value[3])} )`
  } else if (table == 'Voters' && value.length == 4) {
    namaTable = 'Voters'
    field = `(first_name, last_name, gender, age)`
    val = `("${value[0]}" , "${value[1]}" , "${value[2]}" , ${Number(value[3])} )`
  } else if (table == 'Votes' && value.length == 2) {
    namaTable = 'Votes'
    field = `(voterId, politicianId)`
    val = `(${Number(value[0])} , ${Number(value[1])})`
  } else {
    console.log(`Error invalid input`)
  }

  if(field !== null) {
    let query = `
      INSERT INTO ${namaTable} ${field}
      VALUES ${val}
    `
  
    db.run(query , (err) => {
      if(err) {
        console.log(err)
      } else {
        console.log(`Success insert data into ${table}`)
      }
    })
    
  }
}

function execute(param) {
  let command = param[0]
  let option = param.slice(1)

  switch (command) {
    case 'update': update(option[0], option[1], option[2], option[3])
      break;
    case 'delete': deleteData(option[0], option[1], option[2], option[3])
      break;
    case 'insert': insert(option[0], option.slice(1))
      break;
    default: help()
      break;
  }
}

function help () {
  console.log(`
  node index.js insert <table_name> <value>
  node index.js update <table_name> <id> <field> <value>
  node index.js delete <table-name> <id>
  
  AVAILABLE TABLE: 
  * Politicians ==> (name, party, location, grade_current)
  * Voters      ==> (first_name, last_name, gender, age)
  * Votes       ==> (voterId, politicianId)
  `)
}

execute(argv)