# poll-db-1

RELEASE 3
1. =======================================
SELECT name, party, grade FROM Politicians 
WHERE party = 'R' 
AND grade > 9 AND grade < 11
==========================================

2. =======================================
SELECT COUNT(voterId) AS totalVote, Politicians.name FROM Politicians 
JOIN Votes
ON Politicians.id = Votes.politicianId
WHERE name = 'Olympia Snowe'
==========================================

3. =======================================
SELECT name, COUNT(voterId) AS totalVote FROM Politicians
JOIN Votes
ON Politicians.id = votes.politicianId
WHERE Politicians.name LIKE 'Adam %'
GROUP BY votes.politicianId
==========================================

4. =======================================
SELECT COUNT(voterId) AS totalVote, Politicians.name, Politicians.party, Politicians.location FROM Politicians 
JOIN Votes
ON Politicians.id = Votes.politicianId
GROUP BY Politicians.name
ORDER BY totalVote DESC
LIMIT 3
==========================================

5. =======================================
SELECT 
	Voters.first_name, 
	Voters.last_name, 
	Voters.gender, 
	Voters.age
FROM Voters
JOIN Votes
ON Votes.voterId = Voters.id
WHERE politicianId = (  SELECT Politicians.id 
                        FROM Politicians 
                        WHERE name = 'Olympia Snowe')
==========================================