exports.showIndex = showIndex;
exports.showStudent = showStudent;
exports.show404 = show404;

// 这样定义函数 才会有变量提升
function showIndex (req,res){
    res.writeHead(200,{"Content-type":"text/html;charset=utf8"});
    res.end("<h1>我是首页</h1>");
};

function showStudent (req,res){
    res.writeHead(200,{"Content-type":"text/html;charset=utf8"});
    res.end("<h2>我是学生</h2>");
};

function show404(req,res){
    res.writeHead(200,{"Content-type":"text/html;charset=utf8"});
    res.end("<h3>404，对不起找不到这个页面</h3>");
};

