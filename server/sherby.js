// Boiler plate to start node rest server. BatsFix. Using body-parser code for
// now not sure how secure it is !!! 
// BatsFix. password probably should be encrypted when being transmitted, should it
// be over https (or should it be encrypted at client side first...
//
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var users = [{ 'name': 'bats', 'password': '1234' }, { 'name': 'derek', 'password': '1' }, { 'name': 'farzad', 'password': '1' }];

app.post('/login', function (req, res) {
    if (!req.body.name) {
        console.log("name is missing");
        return res.send({ "status": "error", "message": "missing username" });
    }
    if (!req.body.password) {
        console.log("password is missing");
        return res.send({ "status": "error", "message": "missing password" });
    }
    for (key in users) {
        user = users[key];
        console.log("user name is [" + user.name + "]");
        if (user.name == req.body.name && user.password == req.body.password) {
            return res.send({ "status": "success", "message": "hello" });
        }
    }
    return res.send({ "status": "error", "message": "unknown user" });
});

app.post('/register', function (req, res) {
    if (!req.body.username) {
        return res.send({ "status": "error", "message": "missing user name" });
    }
    if (!req.body.userpassword) {
        return res.send({ "status": "error", "message": "missing user password" });
    }
    for (user in users) {
        if (user.name == req.body.username) {
            return res.send({ "status": "error", "message": "this is an existing user name. choose a different user name" });
        }
    }
    users.push({ 'name': req.body.username, 'password': req.body.password });
    return res.send({ "status": "success", "message": "successfully registered" });
});

// BatsFix. This is listening at local machine on port 3000.
var server = app.listen(3000, function () {
    console.log("listening on port %s", server.address().port)
});

