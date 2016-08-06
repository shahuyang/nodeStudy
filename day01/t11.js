var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req,res){
//   不处理小图标
    if(req.url == "/favicon.ico"){
        return;
    };
    fs.stat("./album",function(err,stats){
        // 检测这个路径，是不是一个文件夹
       C(stats.isDirectory());
       // C(stats.isDirectory())
    })
    res.end()
});

server.listen(3000,"127.0.0.1");

