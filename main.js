const db = require('./db')
const Table = require('cli-table')

function number1() {
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
       let q = `SELECT * FROM Politicians
       WHERE party = "R" 
       AND grade_current BETWEEN 9 AND 11`
      db.all(q,function(err,rows) {
          if (err) {
              console.log(err)
          } else {
              let header = Object.keys(rows[0])
              table.push(
                  header 
              );
              rows.forEach(data => {
                table.push(Object.values(data))
              })
              console.log(table.toString());
            //   console.log(rows)
          }
      })
}

function number2() {
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
       let q = `SELECT COUNT(politicianId) AS totalVote , name 
       FROM Politicians 
       JOIN Votes ON Politicians.id = Votes.politicianId
       WHERE Politicians.name = "Olympia Snowe"`
      db.all(q,function(err,rows) {
          if (err) {
              console.log(err)
          } else {
              let header = Object.keys(rows[0])
              table.push(
                  header 
              );
              rows.forEach(data => {
                table.push(Object.values(data))
              })
              console.log(table.toString());
            //   console.log(rows)
          }
      })
}

function number3 () {
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
       let q = `SELECT name, COUNT(politicianId) AS totalVote 
       FROM Politicians 
       JOIN Votes ON Politicians.id = politicianId 
       WHERE name 
       like "%Adam%" 
       GROUP BY name`
      db.all(q,function(err,rows) {
          if (err) {
              console.log(err)
          } else {
              let header = Object.keys(rows[0])
              table.push(
                  header 
              );
              rows.forEach(data => {
                table.push(Object.values(data))
              })
              console.log(table.toString());
            //   console.log(rows)
          }
      })
}

function number4() {
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
       let q = `SELECT COUNT(politicianId) AS totalVote, name, party, location FROM Politicians 
       JOIN Votes ON Politicians.id = politicianId 
       GROUP BY name
       ORDER BY totalVote DESC
       LIMIT 3`
      db.all(q,function(err,rows) {
          if (err) {
              console.log(err)
          } else {
              let header = Object.keys(rows[0])
              table.push(
                  header 
              );
              rows.forEach(data => {
                table.push(Object.values(data))
              })
              console.log(table.toString());
            //   console.log(rows)
          }
      })
}

function number5() {
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
       let q = `SELECT first_name, last_name, gender, age FROM Voters 
       JOIN Votes ON Voters.id = voterId 
       JOIN Politicians ON politicianId = Politicians.id
       WHERE Politicians.name = "Olympia Snowe"
       `
      db.all(q,function(err,rows) {
          if (err) {
              console.log(err)
          } else {
              let header = Object.keys(rows[0])
              table.push(
                  header 
              );
              rows.forEach(data => {
                table.push(Object.values(data))
              })
              console.log(table.toString());
            //   console.log(rows)
          }
      })
}

db.serialize(function() {
    number1()
    number2()
    number3()
    number4()
    number5()

})


db.close()