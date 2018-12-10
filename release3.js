const db = require('./datab') 
const Table = require('cli-table')

function satu() {
  let table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
           , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
           , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
           , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
  });

  let query = `
    SELECT 
      name, 
      party, 
      grade_current 
    FROM 
      Politicians 
    WHERE 
      party = 'R' AND grade_current 
      BETWEEN 
        9 AND 11`

  db.all(query , (err, rows) => {
    if(err){
      console.log(err)
    } else {
      let header = Object.keys(rows[0])
      table.push(
          header 
      );
      for (let i in rows) {
        table.push(Object.values(rows[i]))
      }
    }
    console.log(table.toString())
  })
}

satu()

function dua() {
  let table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
           , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
           , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
           , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
  });

  let query = `
    SELECT 
      COUNT(*) AS totalVote, 
      name 
    FROM 
      Politicians
    JOIN 
      Votes ON Politicians.id = Votes.politicianId
    WHERE 
      name = 'Olympia Snowe'`

  db.all(query , (err, rows) => {
    if(err){
      console.log(err)
    } else {
      let header = Object.keys(rows[0])
      table.push(
          header 
      );
      for (let i in rows) {
        table.push(Object.values(rows[i]))
      }
    }
    console.log(table.toString())
  })
}
dua()

function tiga() {
  let table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
           , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
           , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
           , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
  });

  let query = `
    SELECT 
      name , 
      COUNT(*) AS totalVotes 
    FROM 
      Politicians 
    JOIN 
      Votes ON Politicians.id = Votes.politicianId
    WHERE 
      name LIKE 'Adam%'
    GROUP BY 
      name`

  db.all(query , (err, rows) => {
    if(err){
      console.log(err)
    } else {
      let header = Object.keys(rows[0])
      table.push(
          header 
      );
      for (let i in rows) {
        table.push(Object.values(rows[i]))
      }
    }
    console.log(table.toString())
  })
}
tiga()

function empat() {
  let table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
           , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
           , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
           , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
  });

  let query = `
    SELECT 
      COUNT(*) AS totalVotes ,
      name , 
      party , 
      location
    FROM 
      Politicians 
    JOIN 
      Votes ON Politicians.id = Votes.politicianId
    GROUP BY 
      name
    ORDER BY 
      totalVotes desc
    LIMIT 3` 

  db.all(query , (err, rows) => {
    if(err){
      console.log(err)
    } else {
      let header = Object.keys(rows[0])
      table.push(
          header 
      );
      for (let i in rows) {
        table.push(Object.values(rows[i]))
      }
    }
    console.log(table.toString())
  })
}
empat()

function lima() {
  let table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
           , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
           , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
           , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
  });
  let query = `
    SELECT 
      first_name, 
      last_name, 
      gender , 
      age 
    FROM 
      Voters
    JOIN 
      (SELECT * 
       FROM 
        Politicians
       JOIN 
        Votes ON Politicians.id = Votes.politicianId
       WHERE 
        name = 'Olympia Snowe') AS polVot
    ON Voters.id = polVot.voterId` 
    
  db.all(query , (err, rows) => {
    if(err){
      console.log(err)
    } else {
      let header = Object.keys(rows[0])
      table.push(
          header 
      );
      for (let i in rows) {
        table.push(Object.values(rows[i]))
      }
    }
    console.log(table.toString())
  })
}
lima()