var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var express = require('express');
var fs = require('fs');
var app = express();

app.get("/",function(req,res){
    res.send("管理员首页")
});

app.use("/jingtai/",express.static("./public"));

app.use(function(req,res){
    res.status(404).send("对不起，找不到这个页面")
});


app.listen(80,"192.168.1.103");
//静态包


