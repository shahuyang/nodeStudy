var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var express = require('express');

var app = express();

// 引入express ejs 都不用显示声明
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("haha.ejs",{
        "news":["我是小新闻","我也是小新闻","我还是小新闻"]
    });
});

app.listen(80,"192.168.1.102");
