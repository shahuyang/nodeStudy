var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req,res){
    if(req.url == "/favicon.ico"){
        return;
    };
    var wenjianjia =[];
    fs.readdir("./album/",function(err,files){
        // iterator 是一个迭代器，  (function iterator(i){  ... })(0)
        // 类似于匿名函数，首次执行 传入参数 i 的值为 0
        // 在其内部，通过  iterator(i+1) 调用，形成递归
        // iterator 把 fs.readdir 改成一个 同步调用，先执行 1，再执行 2
       (function iterator(i){
           //  当 i == files.length 时，通过递归 验证了所有文件
           //  打印结果， return 出来
           if( i == files.length ){
               C(wenjianjia);
               return;
           }
           fs.stat("./album/"+files[i],function(err,stats){
                if(stats.isDirectory()){
                    wenjianjia.push(files[i]);
                };
               // iterator() 回调一定要在 fs.stat 里面才有效
               // 因为 fs.stat 是异步的，i 符合就 push 不符合就 执行 i+1
               // 把 iterator 放在外面，就 抓取不到了
               iterator(i+1);
           });
       })(0);
       // C(wenjianjia) 这个地方打印不到，因为内部 fs.iterator  是异步的，不会等有了结果在执行 它
    });
    res.end();
});

server.listen(3000,"127.0.0.1");

