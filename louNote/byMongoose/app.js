var express = require("express");
var mongoose = require('mongoose');

var models = require('./models');

var User = models.User;

mongoose.connect('mongodb://localhost/demo',(err,db)=>{
    console.log(db);
});

var app = express();

// init data. Use "get" to simplify
app.get('/init', function(req, res) {
    var user = new User({
        email : '00000nowind_lee@qq.com',
        name : 'Freewind'
    });
    user.save();
    res.send('Data inited');
});

app.listen(3000);

