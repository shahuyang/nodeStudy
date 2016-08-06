// require 表示引包，引用自己的一个特殊功能
var http = require("http");
// 创建一个服务器，参数是 回调函数，
var server = http.createServer(function(req,res){
    // req 表示请求 （request）， res 表示 请求（response）
    // 设置 http 头， 状态码  是 200 ，文件类型 html ，编码格式  utf-8
    res.writeHead(200,{"content-type":"text/html;charset=UTF-8"});
    res.end("我买了一个 Iphone"+(1+2+3)+"S");
});

// 运行服务器,监听3000 端口（端口号可以任意指定）
server.listen(3000,"127.0.0.1")