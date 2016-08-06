var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var http = require("http");
var fs = require("fs");  //提供文件操作

var server = http.createServer(function(req,res){
    // 不处理小图标
    if(req.url == "/favicon.ico") return;
    res.writeHead(200,{"Content-type":"text/plain;charset=UTF-8"});

    var userid = parseInt(Math.random() * 8999) + 10000;
    C("欢迎"+ userid);  ///////////////测试

    // 两个参数，第一个 是完整路径，当前目录写 ./
    //第二个参数，就是回调函数，表示当前文件读取成功后的事情
    fs.readFile("./test/1.txt",{"charset":"utf-8"},function(err,data){
        if(err) throw err;
        setTimeout(function(){
            C(userid + "文件读取完毕");   ///////////////测试
            for(var i=0;i>-1;i++){
                C(i)
            }
            res.end(data)
        },1000)
    })
});

server.listen(3000,"127.0.0.1");