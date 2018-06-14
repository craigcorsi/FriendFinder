var express = require('express');
var app = express();
var PORT = 8080;

var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var friends = require('./app/data/friends.js');

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/home.html"));
});

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/survey.html"));
});

app.get("/:route", function (req, res) {
    if (req.params.route != "survey") {
        res.sendFile(path.join(__dirname, "./app/public/home.html"));
    }
});

app.get("/api/friends", function (req, res) {
    return res.json(friends);
});

// Displays a single character, or returns false
app.post("/api/friends", function (req, res) {
    console.log(req);
    var bestDiff = totalDifference(req, friends[0]);
    var positionOfBest = 0;
    for (j = 1; j < friends.length; i++) {
        var temp = totalDifference(req, friends[j]);
        if (temp < bestDiff) {
            bestDiff = temp;
            positionOfBest = j;
        }
    }
    return res.json(friends[positionOfBest]);
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






app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
