// require 表示引包，引用自己的一个特殊功能
var http = require("http");
var fs = require("fs");

// 创建一个服务器，参数是 回调函数，
var server = http.createServer(function(req,res){
        if(req.url=="/fang"){
            // req 表示请求 （request）， res 表示 请求（response）
            // 设置 http 头， 状态码  是 200 ，文件类型 html ，编码格式  utf-8
            fs.readFile("./test.html",function(err,data){
                res.writeHead(200,{"content-type":"text/html;charset=UTF-8"});
            res.end(data);
            });
        }else if(req.url=="/yuan"){
            fs.readFile("./test2.html",function(err,data){
                res.writeHead(200,{"content-type":"text/html;charset=UTF-8"});
                res.end(data);
            });
        }else if(req.url=="/0.jpg"){
            fs.readFile("./0.jpg",function(err,data){
                res.writeHead(200,{"content-type":"image/jpg;"});
                res.end(data);
            });
        }else if(req.url=="/css.css"){
            fs.readFile("./css.css",function(err,data){
                res.writeHead(200,{"content-type":"text/css;"});
                res.end(data);
            });
        }else {
            res.writeHead(404,{"content-type":"text/html;charset=UTF-8"});
            res.end("这个页面不存在");
        }
});

// 运行服务器,监听3000 端口（端口号可以任意指定）
server.listen(3000,"127.0.0.1");