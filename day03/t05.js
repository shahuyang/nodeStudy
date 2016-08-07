var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var  express = require("express");

var app = express()
//设置模板引擎
app.set("view engine","ejs");

//路由设计，发请求页面 和 接收请求页面是同一个
//但是请求方式 不一样
app.get("/",function(req,res){
    res.render('form');
});
app.post("/",function(req,res){
//    将数据添加进数据库
    res.send("成功")
});

app.listen(80,"192.168.1.102")