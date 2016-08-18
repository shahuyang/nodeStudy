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
app.use("/static",express.static("./public"));

// 首页
app.get("/",router.showIndex);
app.get("/:albumName",router.showAlbum);

app.listen(80);


