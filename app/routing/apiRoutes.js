// LOAD DATA

var friends = require('../data/friends.js');

module.exports = function (app) {
    function totalDifference(char1, char2) {
        var scores1 = char1.scores;
        var scores2 = char2.scores;
        var total = 0;
        for (i = 0; i < scores1.length; i++) {
            total += Math.abs(scores1[i] - scores2[i]);
        }
        return total;
    }

    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    // Displays a single character, or returns false
    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;

        // determine the closest matching friend
        var bestDiff = totalDifference(newFriend, friends[0]);
        console.log(bestDiff);
        var positionOfBest = 0;
        for (j = 1; j < friends.length; j++) {
            var temp = totalDifference(newFriend, friends[j]);
            console.log(temp);
            if (temp < bestDiff) {
                bestDiff = temp;
                positionOfBest = j;
            }
        }

        // add new friend to the list
        console.log(newFriend);
        friends.push(newFriend);
        // res.json(newFriend);


        // Now return the closest matching friend
        res.json(friends[positionOfBest]);
    });

    
}