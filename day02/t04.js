var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var fs = require('fs');
fs.rename('./test/d.txt','./e.txt');