var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.get('/liUser', function (req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("notebook");
        dbo.collection("users").find({}).toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            console.log(result);
            res.end(JSON.stringify(result));
            db.close(result);
        });
    });

})

app.post('/addUser', jsonParser, function (req, res) {

    var name = req.body.name
    var password = req.body.password

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("notebook");
        var myobj = {name: name, password: password};
        console.log(myobj);

        dbo.collection("users").find({'name': name}).toArray(function (err, result) {
            //用户名去重
            if (result.length > 0) {
                res.end('用户名已存在');
            }
            if (result.length == 0) {
                dbo.collection("users").insertOne(myobj, function (err, resu) {
                    if (err) throw err;
                    console.log("用户插入成功");

                    dbo.collection("users").find({'name': name}).toArray((err, result) => {
                        res.end(JSON.stringify(result));
                    })

                    db.close();
                });
            }
        })

    });


})

app.delete('/delUser', jsonParser, function (req, res) {

    var name = req.body.name
    var password = req.body.password

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("notebook");
        var whereStr = {"name":name};  // 查询条件
        dbo.collection("users").deleteOne(whereStr, function(err, obj) {
            if (err) throw err;
            console.log("文档删除成功");
            console.log(obj);
            db.close();
            res.end("删除成功");
        });

    });


})

app.put('/editUser', jsonParser, function (req, res) {

    var name = req.body.name
    var password = req.body.password

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("notebook");
        var whereStr = {"name":name};  // 查询条件
        var updateStr = {$set: { "password" : password }};
        dbo.collection("users").updateOne(whereStr, updateStr, function(err, resu) {
            if (err) throw err;
            db.close();
            res.end("文档更新成功")
        });
    });

    // MongoClient.connect(url, function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("notebook");
    //     var whereStr = {"name":name};  // 查询条件
    //     dbo.collection("users").deleteOne(whereStr, function(err, obj) {
    //         if (err) throw err;
    //         console.log("文档删除成功");
    //         console.log(obj);
    //         db.close();
    //         res.end("删除成功");
    //     });
    //
    // });


})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})