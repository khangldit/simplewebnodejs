const { Console } = require('console');
var express = require('express');
var app = express();
var path = require('path');
const { nextTick } = require('process');
var adminRouter = express.Router();


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.route('/login')
    .get(function(req,res){
        res.send('this is the login form');
    })
    .post(function(req,res){
        console.log("processing");
        res.send('processing the login form')
    })

adminRouter.use(function(req,res,next){
    console.log("This is requet!")
    console.log("This is method and url of request:",req.method,req.url)
    next();
});

adminRouter.param('name', function(req,res,next,name){
    if (name ==="khang")
    req.params.name = "KhangLD"
    console.log("name in middleware "+req.name)
    next();
})
adminRouter.get('/', function (req, res,next) {
    var rs = { mess: "I am ADMIN in the dashboard!"};
    res.send(rs);
});

adminRouter.get('/users/', function (req, res) {
    var rs = {mess: "Please enter user name!"}
    res.send(rs);
});

adminRouter.get('/users/:name', function (req, res) {
    if (req && req.params)
        var rs = { mess: "I am "+req.params.name+"!"};
    else
        var rs = {mess: "Please enter user name!"}
    res.send(rs);
});

adminRouter.get('/posts', function (req, res) {
    var rs = { mess: "I show all the posts!"};
    res.send(rs);
});

app.use('/admin', adminRouter);


// app.listen(1337);
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("EXAMPLE APP LISTRNING AT http://%s:%s", host, port)
});
