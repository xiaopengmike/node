var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var models = require('./model/model');

var User = models.User;
var Note = models.Note;

mongoose.connect('mongodb://localhost/notes', (err, db) => {
});

var app = express();
app.use(bodyParser.json());
app.use(session({
    key: 'session',
    secret: 'keboard cat',
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    store: new MongoStore({
        db: 'notes',
        mongooseConnection: mongoose.connection
    }),
    resave: false,
    saveUninitialized: true
}));

app.get('/', function (req, res) {
    res.send('首页');
});

// init使用mongoose存入数据库notes例子
app.get('/init', function (req, res) {
    var user = new User({
        email: '03',
        username: 'Freewind'
    });
    user.save();
    res.send('Data放入成功');
});

app.get('/reg', function (req, res) {
    res.send('reg');
});

//注册
app.post('/reg', function (req, res) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var passwordRepeat = req.body.passwordRepeat;

    if (password != passwordRepeat) {
        console.log('密码不一致');
        res.end('password != passwordRepeat');
        return
    }

    //检查用户名是否存在
    User.find({'username': username}, function (err, data) {
        if (err) {
            console.log(err);
            return res.end('err');
        }

        if (data.length != 0) {
            console.log('用户名已经存在');
            console.log(data);
            return res.end('uname exsited');
        }

        if (data.length == 0) {
            //创建用户
            var newUser = new User({
                username: username,
                password: password
            });
            newUser.save(function (err, doc) {
                if (err) {
                    console.log(err);
                    return res.end(err);
                }
                else {
                    console.log('suc！');
                    req.session.user = newUser;
                    return res.end('suc');
                }
            });
        }
    })
});

//登陆
app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.find({'username': username, 'password': password}, function (err, data, next) {
        console.log(data);
        if (err) {
            console.log(err);
            console.log('login error');
            return next(err);
        }
        if (data.length == 1) {
            console.log('登录成功！');
            req.session.user = data;
            return res.redirect('/');
        }
        else {
            console.log('登录失败');
            return res.redirect('/login');
        }
    });

});

//退出登陆
app.post('/logout', function (req, res) {
    req.session.destroy(function(err) {
        if(err){
            res.json({ret_code: 2, ret_msg: '退出登录失败'});
            return;
        }

        // req.session.loginUser = null;
        res.clearCookie(identityKey);
        res.redirect('/');
    });

});

//笔记发布
app.post('/postNote', function (req, res) {
    var note = new Note({
        title: req.body.title,
        author: req.body.username,
        tag: req.body.tag,
        content: req.body.content
    });

    note.save(function (err, doc) {
        if (err) {
            console.log(err);
            return res.redirect('/post');
        }
        console.log('文章发表成功！')
        res.end('suc')
    });
});


app.listen(8081);

