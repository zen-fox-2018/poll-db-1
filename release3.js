const Table = require(`cli-table`)
const db = require(`./db`)

//NO 1
let query1 = `SELECT * FROM Politicians P WHERE P.party = "R" AND P.grade_current BETWEEN 9 AND 11`

//NO 2
let query2 = `SELECT COUNT(P.id) AS totalVote, P.nama AS Name FROM Politicians P
JOIN Votes V ON P.id = V.politician_id  WHERE P.nama = "Olympia Snowe"`

//NO 3
let query3 = ` SELECT P.nama, COUNT(P.nama) AS TotalVote FROM Politicians P JOIN Votes V ON P.id = V.politician_id 
WHERE P.nama LIKE "Adam%"
GROUP BY P.nama`

//NO 4
let query4 = ` SELECT COUNT(P.nama) AS TotalVotes, P.nama AS name, P.party AS party, P.location AS Location
FROM Politicians P JOIN Votes V ON P.id = V.politician_id 
GROUP BY P.nama ORDER BY COUNT(P.nama) DESC LIMIT 3`

//NO 5
let query5 = `SELECT Vr.first_name AS first_name, Vr.last_name AS last_name, Vr.gender AS Gender, Vr.age AS age
FROM Politicians P 
JOIN Votes Vt ON P.id = Vt.politician_id
JOIN Voters Vr ON Vt.voter_id = Vr.id WHERE P.nama = "Olympia Snowe"`

   
//   table.push(
//       ['foo', 'bar', 'baz']
//     , ['frob', 'bar', 'quuz']
//   );
   
db.all(query1, function (err, rows) {
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
    let header = []
    let row = []

    for (const key in rows[0]) {
        header.push(key)
    }
    table.push(header)

    for (let i = 0; i < rows.length; i++) {
        for (const key in rows[i]) {
            row.push(rows[i][key])
        }
        table.push(row)
        row = []
    }
    console.log(`                           NO 1                     `);  
    console.log(table.toString());
      
})

db.all(query2, function (err, rows) {
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
    let header = []
    let row = []

    for (const key in rows[0]) {
        header.push(key)
    }
    table.push(header)

    for (let i = 0; i < rows.length; i++) {
        for (const key in rows[i]) {
            row.push(rows[i][key])
        }
        table.push(row)
        row = []
    }
    console.log(`                           NO 2                     `);  
    console.log(table.toString());
      
})

db.all(query3, function (err, rows) {
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
    let header = []
    let row = []

    for (const key in rows[0]) {
        header.push(key)
    }
    table.push(header)

    for (let i = 0; i < rows.length; i++) {
        for (const key in rows[i]) {
            row.push(rows[i][key])
        }
        table.push(row)
        row = []
    }
    console.log(`                           NO 3                     `);  
    console.log(table.toString());
      
})

db.all(query4, function (err, rows) {
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
    let header = []
    let row = []

    for (const key in rows[0]) {
        header.push(key)
    }
    table.push(header)

    for (let i = 0; i < rows.length; i++) {
        for (const key in rows[i]) {
            row.push(rows[i][key])
        }
        table.push(row)
        row = []
    }
    console.log(`                           NO 4                     `);  
    console.log(table.toString());
      
})

db.all(query5, function (err, rows) {
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
    let header = []
    let row = []

    for (const key in rows[0]) {
        header.push(key)
    }
    table.push(header)

    for (let i = 0; i < rows.length; i++) {
        for (const key in rows[i]) {
            row.push(rows[i][key])
        }
        table.push(row)
        row = []
    }
    console.log(`                           NO 5                     `);  
    console.log(table.toString());
      
})


  
