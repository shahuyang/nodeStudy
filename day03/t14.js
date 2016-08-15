var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};

var express = require("express");
var app = express();

app.engine('jade', require('jade').__express);
app.set("view engine","jade");

app.get("/",function(req,res){
    C(req.ip);
    res.render("nihao");

});
app.listen(80);



