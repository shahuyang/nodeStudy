var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]+" ")
    }
};

var http = require("http");
var url = require("url");

var server = http.createServer(function(req,res){
    //  url.parse() 可以将 url 拆分为 很多部分
    // host  port  path  pathname query 等
    var path = url.parse(req.url).path;
    var pathname = url.parse(req.url).pathname;
    //  true 的意思是 querty 将会解析为 对象，就可以得到这个参数
    var query = url.parse(req.url,true).query;
    var age = query.age;
    //var path = url.parse(req.url).path;
    C("path:"+path,"pathname:"+pathname,"query:"+query,"age:"+age)
    res.end();
});

server.listen(3000,"127.0.0.1");