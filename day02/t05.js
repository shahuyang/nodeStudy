var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
var People = require("./test/People.js");
var yfc = new People('yfc','男','25');
yfc.sayHello();

