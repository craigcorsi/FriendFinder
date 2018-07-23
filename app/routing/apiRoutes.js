// LOAD DATA

var friends = require('../data/friends.js');

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    // Displays a single character, or returns false
    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;
        // determine the closest matching friend
        var bestDiff = totalDifference(newFriend, friends[0]);
        var positionOfBest = 0;
        for (j = 1; j < friends.length; i++) {
            var temp = totalDifference(newFriend, friends[j]);
            if (temp < bestDiff) {
                bestDiff = temp;
                positionOfBest = j;
            }
        }

        // add new friend to the list

        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newFriend.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
        console.log(newFriend);
        friends.push(newFriend);
        // res.json(newFriend);


        // Now return the closest matching friend
        res.json(friends[positionOfBest]);
    });

    function totalDifference(char1, char2) {
        var scores1 = char1.scores;
        var scores2 = char2.scores;
        var total = 0;
        for (i = 0; i < scores1.length; i++) {
            total += Math.abs(scores1[i] - scores2[i]);
        }
        return total;
    }
}