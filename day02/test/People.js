var C = function(){
    for(var i=0;i<arguments.length;i++){
        console.log(arguments[i]);
    }
};
//
function People(name,sex,age){
    this.name = name;
    this.sex = sex;
    this.age = age;
}
People.prototype.sayHello = function(){
    C(this.name + this.sex +this.age);
};

module.exports = People;