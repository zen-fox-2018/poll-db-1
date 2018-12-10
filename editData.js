const db = require('./db')
const argv = process.argv.slice(2)

switch (argv[0]) {
    case 'insert':
        let obj = {
            name: argv[2],
            party: argv[3],
            location: argv[4],
            grade_current: argv[5]
        }
        insertData(obj, argv[1])
        break;

    case 'update':
        updateData(argv.slice(2), argv[1])
        break;

    case 'delete':
        deleteData(argv[2], argv[1])
        break;

    default:
        break;
}

function insertData(data, table) {
    let field = []
    // let values = ``
    let values = []
    // let last = Object.keys(obj)[Object.keys(obj).length-1];
    for (const key in data) {
        field.push(key)
        if (+data[key]) {
            // values += `"${data[key]}"`
            values.push(data[key])
        } else {
            // values += data[key]
            values.push(`"${data[key]}"`)
        }
        // key !== last ?  values += ', ': values += ''
    }
    let query = `
    INSERT INTO ${table} (${field.join(', ')})
    VALUES (${values.join(', ')})`
    db.run(query, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('berhasil insert data');
        }
    })      
}

function updateData(data, table) {
    let id = data[0]
    let set = []
    for (let i = 1; i < data.length; i += 2) {
        if (+data[i+1]) {
            set.push(`${data[i]} = ${data[i+1]}`)
        } else {
            set.push(`${data[i]} = "${data[i+1]}"`)
        }
    }
    let query = `
    UPDATE ${table}
    SET ${set.join(', ')}
    WHERE id = ${id}`
    db.run(query, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('berhasil update data');
        }
    })
}

function deleteData(id, table) {
    let query = `
    DELETE FROM ${table}
    WHERE id = ${id} `
    db.run(query, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('berhasil delete data');
        }
    })    
}