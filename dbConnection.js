const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        return console.log(err.message);
    } else {
        console.log('Setup database ...')
    }
});

module.exports = db;