var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var bodyParser = require('body-parser');

// 基于body-parser 的解析
var jsonParser = bodyParser.json();
//// 基于 body-parse 的编码
var urlencodedParser = bodyParser.urlencoded({ extended: false })

C(jsonParser,urlencodedParser)





app.set("view engine","ejs");
app.get("/",function(req,res){
  res.render("form");
});


app.post("/",function(req,res){
    C(req.body)
})

//app.post('/', urlencodedParser, function (req, res) {
//    if (!req.body) return res.sendStatus(400)
//    res.send('welcome, ' + req.body.name)
//});

// POST /api/users gets JSON bodies
//app.post('/', jsonParser, function (req, res) {
//    if (!req.body) return res.sendStatus(400)
//    res.send('welcome, ' + req.body.name)
//})

app.listen(80,"127.0.0.1")

