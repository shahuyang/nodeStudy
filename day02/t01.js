var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

http.createServer(function(req,res){
    if(req.url == "/favicon.ico") return ;
//    获取文件路径，然后读取文件
    var pathname = url.parse(req.url).pathname;
    //if(pathname == "/") pathname = "/index.html";
    if(pathname.indexOf(".") == -1) pathname = "/index.html";

    var extname = path.extname(pathname);
    //  读文件
    if(extname == '.html'){
        var route = "./static/templates";
    }else{
        var route = "./static";
    }
    fs.readFile( route + pathname,function(err,data){
        if(err){
            res.writeHead(404,{"Content-type":"text/html;charset=utf8"});
            res.end("404,页面没有找到")
        }
        getMime(extname,function(mime){
            res.writeHead(200,{"Content-type":mime});
            res.end(data)
        })
    });
}).listen(80,"192.168.1.102");

// 回调函数 ！！！
var getMime = function(extname,callBack){
    fs.readFile("./mime.json",function(err,data){
        if(err) throw err;
        var mime = (JSON.parse(data))[extname] || "text/plain";
        callBack(mime);
    });
};
