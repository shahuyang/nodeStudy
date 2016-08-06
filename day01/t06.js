var http = require("http");
var url = require("url");

var server = http.createServer(function(req,res){
   var quertyObj = url.parse(req.url,true).query;
    var name = quertyObj.name;
    var age = quertyObj.age;
    var sex = quertyObj.sex;

    res.writeHead(200,{"Content-type":"text/plain;charset=UTF-8"})
    res.end("服务器收到了表单请求"+ name + age + sex);
});

server.listen(3000,"127.0.0.1");