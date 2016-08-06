var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var express = require('express');

var app = express();

app.get('/',function(req,res){
    res.send("<h1>你好</h1>");
});

app.get('/shy',function(req,res){
   res.send("<h1>哈哈</h1>");
});
//正则表达式，不怎么会写
app.get(/^\/student\/([\d]{10})$/,function(req,res){
   res.send("学生信息，学号" + req.params[0]);    // params 参数，
});

app.get("/teacher/:gonghao",function(req,res){
    res.send("老师信息，工号" + req.params.gonghao);
});

app.listen(80,"192.168.1.102");


