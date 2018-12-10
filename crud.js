const db = require('./db')

function insert (tablename, object) {
    db.serialize(function () {
        let keys = Object.keys(object)
        let values = Object.values(object)
        let q = null
        if (keys.length === 4) {
            q = `INSERT INTO ${tablename} ( ${keys[0]}, ${keys[1]}, ${keys[2]}, ${keys[3]})
                VALUES ("${values[0]}", "${values[1]}", "${values[2]}", ${values[3]})`
        } else {
            q = `INSERT INTO ${tablename} ( ${keys[0]}, ${keys[1]}}
                VALUES (${values[0]}, ${values[1]}  )`
        }
        db.run(q, function(err) {
            if (err) {
                console.log('error di insert data', err)
            } else {
                console.log(`berhasil insert data ke ${tablename}`)
            }
        })
    })

}

function update ( table , id, field, value) {
    console.log(field)
    db.run(`UPDATE ${table} SET ${field} = "${value}" WHERE id = ${id}`, function (err) {
       if (err) {
           console.log('error di update', err)
       } else {
           console.log(`berhasil updated data di ${table} pada id : ${id}`)
       }
     });
}

function Delete (tablename, id) {
    db.run(`DELETE FROM ${tablename} WHERE id = ${id}`, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log(`berhasil menghapus data pada id ${id}`)
        }
    })
}
let obj1 = {
    name: "billy",
    party: "R",
    location: "LA",
    grade_current: 9.5 ,


}


// insert("Politicians", obj1)
// update ("Voters", 4, "first_name", "zia")
Delete("Politicians", 21)