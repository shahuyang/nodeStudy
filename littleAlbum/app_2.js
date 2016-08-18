var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
var express = require("express");
var app = express();
var router = require("./controller")

//设置模板引擎
app.set("view engine","ejs");

//静态服务
// http://127.0.0.1/public/1.txt 这样才可以输出 1.txt 内容
app.use("static",express.static("./public"));

// 并不需要 req res ，不需要传参，只需要一个函数的引用，回调的时候自然就有了 ???
app.get("/",router.showIndex);
app.get("/admin",function(req,res){
    res.send("admin")  //   /admin 这个路由永远不会执行，静态服务 已经占用了 80 端口所有路由
});

app.listen(80);


