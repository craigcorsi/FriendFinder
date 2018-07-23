// DEPENDENCIES
var express = require('express');
var PORT = process.env.PORT || 8080;
var bodyParser = require('body-parser');
// var path = require('path');

// EXPRESS CONFIGURATION
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("app/public"));

// var friends = require('./app/data/friends.js');


// ROUTER
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);


// LISTENER
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
