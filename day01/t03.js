var http = require("http");

http.createServer(function(req,res){
    console.log("请求中"+req.url)
    res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
    res.end('<h1>我是大标题</h1>')
}).listen(3000,"127.0.0.1");