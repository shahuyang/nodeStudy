var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var express = require('express');
var app = express();

app.get("/:username/:id",function(req,res,next){
    var username = req.params['username'];
    // 检索数据库，如果 username 不存在，那么 next()
    if("检索数据库"){
        C(1);
        res.send("用户信息" + req.params['username']);
    }else{
        next();
    }
});

app.get("/admin/login",function(req,res){
    C(2);
    res.send("管理员登录");
});






app.listen(80,"192.168.1.102");

