var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
/////////// 以下是正式代码

var http = require('http');
var querystring = require("querystring");

//创建服务器
var server = http.createServer(function(req,res){
    // 当访问是 dopost 且 访问方式 是 post
    if(req.url == "/dopost/" && req.method.toLowerCase() == "post"){
        var alldata = "";
        req.addListener("data",function(chunk){
            alldata += chunk;
            C(chunk);
        });
        req.addListener("end",function(){
            var dataString = alldata.toString();
            C(dataString)
            res.end("success");
            // 利用 querystring.parse 将 dataString 转换为 一个 js 对象
            var dataObj =  querystring.parse(dataString);
            C(dataObj)
            C("姓名："+dataObj.name,"年龄："+dataObj.age,"性别："+dataObj.sex,"爱好："+dataObj.hobby)

        })
    }
});
server.listen(80,"127.0.0.1");















