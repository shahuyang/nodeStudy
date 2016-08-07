var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var express = require('express');
var app = express();


app.use("/",function(req,res){
    C(new Date())
});

app.use("/admin",function(req,res){
    res.write(req.originalUrl + "\n"); // '/admin/new'
    res.write(req.baseUrl + "\n"); // '/admin'
    res.write(req.path + "\n"); // '/new'
    res.end("nihao");
});



app.listen(80,"192.168.1.102");

