var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
/////////// 以下是正式代码

var http = require('http');
var formidable = require('formidable')
var util = require('util');
//创建服务器
var server = http.createServer(function(req,res){
    // 当访问是 dopost 且 访问方式 是 post
    if(req.url == "/dopost/" && req.method.toLowerCase() == "post"){
        var form = new formidable.IncomingForm();
        form.uploadDir = "./test";

        form.parse(req, function(err, fields, files) {
            if(err) throw err;

            res.writeHead(200, {'content-type': 'text/plain'});
            C(fields,files)
            C(util.inspect({fields: fields, files: files}))
            res.end("success");
        });

    }
});
server.listen(80,"127.0.0.1");















