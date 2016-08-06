var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};

var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

http.createServer(function(req,res){
    if(req.url == "/favicon.ico") return;

    //得到文件路径
    var pathname = url.parse(req.url).pathname;
    if(pathname == "/") pathname = "index.html";
    var extname = path.extname(pathname);
    //    真的去读这个文件
    // 直接读所有文件
    fs.readFile("./static/" + pathname,function(err,data){
        if(err){
            //throw err 当找不到相关路径下的文件时，用 404 返回
            fs.readFile("./static/404.html",function(err,data){
                if(err) throw err;
                res.writeHead(404,{"Content-type":"text/html;charset=UTF8"});
                res.end(data);
            });
            return;
        };
        getMime(extname,function(mime){
            res.writeHead(200,{"Content-Type":mime})
            res.end(data);
        });
    });
}).listen(3000,"192.168.1.103");

function getMime(extname,callback){
    //读取mime.json文件，得到JSON，根据extname key ，返回对应的value
    //读取文件
    fs.readFile("./mime.json",function(err,data){
        if(err){
            throw Error("找不到mime.json文件！");
            return;
        }
        //转成JSON
        var mimeJSON = JSON.parse(data);
        var mime =  mimeJSON[extname]  || "text/plain";
        //执行回调函数，mime类型字符串，就是它的参数
        callback(mime);
    });
}