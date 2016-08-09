var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var express = require('express');
var app = express();

//设置 模板文件夹 为 a
app.set('views','a');
// 设置了 ejs 模板
//  相当于 requrie('ejs'),express 帮我们引入的
app.set('view engine','ejs');

app.get("/",function(req,res){
    res.render('haha',{
        "news":["我是小哈哈","我也是小哈哈","我还是小哈哈"]
    })
});

app.get("/check",function(req,res){
    res.send({
        "user":"ok"
    })
})


app.listen(80,"192.168.1.103");


