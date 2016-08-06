var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
/////////// 以下是正式代码
var http = require('http');
var ejs = require('ejs');
var fs = require('fs');

var server = http.createServer(function(req,res){
    fs.readFile("./views/index.ejs",function(err,data){
        //模板
        var template = data.toString();
        //  数据
        var data = { a:2016 };

        // ejs 模板数据绑定
        var html = ejs.render(template,data);
        res.writeHead(200,{"Content-type":"text/html;charset=utf8"});
        res.end(html);
    })

});
server.listen('80',"192.168.1.102");







