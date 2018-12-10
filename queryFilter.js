const db = require('./dbConnection.js');


// Nomer 1

let num1 = `SELECT name, party, grade_current FROM Politicians WHERE party = "R" AND grade_current >= 9 AND grade_current <=11`;

// db.all(num1, (err, data) => {
//     if (err) {
//         return console.log(err.message);
//     } else {
//         console.log(data);
//     }
// });


// Nomer 2

let num2 =
`SELECT COUNT(*) as "totalVotes", Politicians.name
FROM Votes INNER JOIN Politicians ON Votes.politicianId = Politicians.politicianId
WHERE Politicians.name = "Olympia Snowe";`;

// db.all(num2, (err, data) => {
//     if (err) {
//         return console.log(err.message);
//     } else {
//         console.log(data);
//     }
// });


// Nomer 3

let num3 =
`SELECT Politicians.name, COUNT(*) as "totalVotes"
FROM Votes
INNER JOIN Politicians ON Votes.politicianId = Politicians.politicianId
WHERE Politicians.name LIKE "Adam %" GROUP BY Politicians.name;`;

// db.all(num3, (err, data) => {
//     if (err) {
//         return console.log(err.message);
//     } else {
//         console.log(data);
//     }
// });

//Nomer 4

let num4 =
`SELECT COUNT(*) as "totalVotes", Politicians.name, Politicians.party, Politicians.location
FROM Votes
INNER JOIN Politicians ON Votes.politicianId = Politicians.politicianId 
GROUP BY Politicians.name
ORDER BY "totalVotes"
DESC
LIMIT 3;`;

// db.all(num4, (err, data) => {
//     if (err) {
//         return console.log(err.message);
//     } else {
//         console.log(data);
//     }
// });


// Nomer 5

let num5 =
`SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age
FROM Voters
INNER JOIN Votes ON Voters.voterId = Votes.voterId 
INNER JOIN Politicians ON Votes.politicianId = Politicians.politicianId
WHERE Politicians.name = "Olympia Snowe";`;

db.all(num5, (err, data) => {
    if (err) {
        return console.log(err.message);
    } else {
        console.log(data);
    }
});