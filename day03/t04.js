var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var express = require('express');

var app = express();

app.get("/Ab",function(req,res){
   res.send("年后")
});

app.get("/teacher/:id",function(req,res){
    var id = req.params.id;
    // 正则表达式表示 6位数
    var reg = /^[\d]{6}$/;
    // 这里定义了一个 正则表达式 reg
    //  reg.test()  是正则表达式的方法
    if(reg.test(id)){
        res.send(id)
    }else{
        res.send("您输入老师编号错误")
    }
});

app.get("/:username/:oid",function(req,res){
    var username = req.params['username'];
    var oid = req.params['oid'];

    //原生方法也可以随便用
    res.write(username);
    res.end(oid);
});

app.listen(80,"192.168.1.102");

