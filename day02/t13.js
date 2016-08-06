var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
/////////// 以下是正式代码

var http = require('http');
var formidable = require('formidable')
var util = require('util');
var fs = require('fs');
var sd = require('silly-datetime');  //第三方 时间戳
var path = require('path');

//创建服务器
var server = http.createServer(function(req,res){
    // 当访问是 dopost 且 访问方式 是 post
    if(req.url == "/dopost/" && req.method.toLowerCase() == "post"){
        var form = new formidable.IncomingForm();
        //设置 文件上传 路径
        form.uploadDir = "./test";

        form.parse(req, function(err, fields, files) {
            if(err) throw err;
            //时间使用了 第三方模块，silly-datetime
            var tt = sd.format(new Date(),"YYYYMMDDHHmmss")
            var ran = parseInt(Math.random()*89999+10000);
            var extname = path.extname(files.img.name);

            C(fields,files)
            // 原来路径
            var oldPath = __dirname + '/'+ files.img.path;
            // 新的文件名  时间戳 + 随机数 + 扩展名
            var newPath = __dirname + '/test/'+ tt + ran +extname;
            //var newPath = __dirname + '/test/'+ files.img.name;  // 以原文件名命名
            // 执行改名
            fs.rename(oldPath,newPath,function(err){
                if(err) throw Error("改名失败")
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end("success");
            });
        });
    //    路由的作用
    }else if(req.url == '/'){
        fs.readFile('./test.html',function(err,data){
            res.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
            res.end(data);
        })
    }
});
server.listen(80,"192.168.1.102");















