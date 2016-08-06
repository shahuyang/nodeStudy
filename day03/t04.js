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

app.listen(80,"192.168.1.102");
