var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var http = require('http');

// 这条语句不会执行
// 所以会 输出101,102,103
var a = 100;

var server = http.createServer(function(req,res){
    a++
    res.end(a.toString());
});

server.listen(80,"192.168.1.102");

