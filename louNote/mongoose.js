var express = require("express");

var app = express();

app.get('/', function(req, res) {
res.send('01');
});

app.listen(3000);


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define User schema
var _User = new Schema({
    email : String,
    name : String,
    salt : String,
    password : String
});

// export them
exports.User = mongoose.model('User', _User);