var http = require("http");

var server = http.createServer(function(req,res){
  // 得到的 url
  var userUlr = req.url;
  // 设置响应头
  res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});

  // substr() 取前9位，验证是  /student/  还是  /teacher/
  if(userUlr.substr(0,9) == "/student/" ){
     // substr(start,end)  start end  是前包含，后不包含
     var  studentId = userUlr.substr(9);
     // 正则表达式  userUlr 从第 10 位开始，到最后一位， 是不是一个 10 位的数字
     //  /^\d{10}$/  表示 一个 10位的数字
     //  ^   $ 表示前后边界
     if(/^\d{10}$/.test(studentId)){
        res.end("您要查询的学生信息，id为" + studentId );
     }else{
        res.end("学生学号位数不对");
     }
  }else if(userUlr.substr(0,9) == "/teacher/"){
     var  teacherId = userUlr.substr(9);
     if(/^\d{6}$/.test(teacherId)){
         res.end("您要查询的教师信息，id为" + teacherId );
     }else{
       res.end("教师工号位数不对");
     }
  }else{
     res.end("请检查 url ");
  }
});

server.listen(3000,"127.0.0.1");