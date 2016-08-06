var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//


C("我是B")

var c = require("./c.js");
var fs = require('fs');


fs.readFile(__dirname + "/c.txt",function(err,data){
   if(err) throw err;
    C(data.toString())
});