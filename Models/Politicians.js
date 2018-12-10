const db = require('../Database/db.js')

class Politicians{
    static findOne(input, cb) {
        let query = `SELECT * FROM Politicians WHERE ${input.field} = "${input.value}"`

        db.get(query, function(err, data) {
            if(err) {
                cb(err, null)
            } else {
                cb(null, data)
            }
        })
    }

    static create(input, cb) {
        let query = 
        `INSERT INTO Politicians (name, party, location, grade)
        VALUES("${input.name}", "${input.party}", "${input.location}", ${Number(input.grade)})`

        db.run(query, function(err) {
            if(err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }

    static update(input, cb) {
        Politicians.findOne({field: 'id', value: input.id}, function(err, row) {
            if(err) {
                cb(err)
            } else {
                if(row === undefined) {
                    cb('Id not found')
                } else {
                    console.log(row)
                    let query = `UPDATE Politicians Set ${input.field} = "${input.value}" WHERE id = ${input.id}`

                    db.run(query, function(err) {
                        if(err) {
                            cb(err)
                        } else {
                            cb(null)
                        }
                    })
                }
            }
        })
    }

    static delete(input, cb) {
        Politicians.findOne({field: 'id', value: input}, function(err, row) {
            if(err) {
                cb(err)
            } else {
                if(row === undefined) {
                    cb('Id not Found')
                } else {
                    let query = `DELETE FROM Politicians WHERE id = ${row.id}`
                    db.run(query, function(err) {
                        if(err) {
                            cb(err)
                        } else {
                            cb(null)
                        }
                    })
                }
            }
        })
    }
}

module.exports = Politicians