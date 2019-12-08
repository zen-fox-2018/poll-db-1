NO.1
SELECT name, party, grade_current FROM Politicians 
WHERE party = 'R' AND grade_current BETWEEN 9 AND 11

NO. 2
SELECT COUNT(*) AS totalVote, name FROM Politicians
JOIN Votes ON Politicians.id = Votes.politicianId
WHERE name = 'Olympia Snowe'

No. 3
SELECT name , COUNT(*) AS totalVotes FROM Politicians 
JOIN Votes ON Politicians.id = Votes.politicianId
WHERE name LIKE 'Adam%'
GROUP BY name

No. 4
SELECT COUNT(*) AS totalVotes ,name , party , location FROM Politicians 
JOIN Votes ON Politicians.id = Votes.politicianId
GROUP BY name
ORDER BY totalVotes desc
LIMIT 3

No. 5
SELECT first_name, last_name, gender , age FROM Voters
JOIN (SELECT * FROM Politicians
JOIN Votes ON Politicians.id = Votes.politicianId
WHERE name = 'Olympia Snowe') AS table1 ON Voters.id = table1.voterId