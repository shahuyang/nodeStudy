var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var express = require("express");
var app = express();
app.get("/",function(req,res){
   console.log(req.query);
    res.send();
});
app.listen(80,"127.0.0.1")

