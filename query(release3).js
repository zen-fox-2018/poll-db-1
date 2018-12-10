const db = require('./dbConnection.js')

let queryPartyR = `
  SELECT name, party, grade_current
  FROM Politicians
  WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;
`
// db.all(queryPartyR, (err, rows) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(rows)
//   }
// })

let qCountOlympia = `
  SELECT COUNT(votesId) AS totalVote, name
  FROM Votes
  INNER JOIN Politicians ON Votes.politicianId = Politicians.id
  WHERE name = 'Olympia Snowe'
`
// db.all(qCountOlympia, (err, rows) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(rows)
//   }
// })

let qCountAdam = `
  SELECT name, COUNT(politicianId) AS totalVote
  FROM Politicians
  INNER JOIN Votes ON Votes.politicianId = Politicians.id
  WHERE name LIKE 'Adam%'
  GROUP BY name
`
// db.all(qCountAdam, (err, rows) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(rows)
//   }
// })

let qCountMostVote = `
  SELECT COUNT(*) AS totalVote, name, party, location
  FROM Politicians
  INNER JOIN Votes ON Votes.politicianId = Politicians.id
  GROUP BY name
  ORDER BY totalVote DESC
  LIMIT 3
`
// db.all(qCountMostVote, (err, rows) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(rows)
//   }
// })

let qCountVoteSnowe = `
  SELECT first_name, last_name, gender, age
  FROM Voters
  INNER JOIN Votes ON Voters.id = Votes.voterId
  WHERE politicianId = ( SELECT id
  FROM Politicians
  WHERE name = 'Olympia Snowe')
`
// db.all(qCountVoteSnowe, (err, rows) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(rows)
//   }
// })