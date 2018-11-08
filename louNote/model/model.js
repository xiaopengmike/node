var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    username: String,
    password: String,
    email: String,
    createTime:{
        type:Date,
        default: Date.now
    }
});

exports.User = mongoose.model('User', userSchema);


var noteSchema = new schema({
    title: String,
    author: String,
    tag: String,
    content: String,
    createTime: {
        type: Date,
        default: Date.now
    }
});

exports.Note = mongoose.model('Note', noteSchema);
