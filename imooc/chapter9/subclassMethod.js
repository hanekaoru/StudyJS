/**
 * Created by Wind on 2016/1/6.
 */
function Person(name) {
    this.name = name;
}
function Student(name, className) {
    this.className = className;
    Person.call(this, name);
}
var bosn = new Student("bosn", "Network064");
Person.prototype.init = function () {
};
//以下情况属于子类调用父类方法
Student.prototype.init = function () {
    Person.prototype.init.apply(this, arguments);
}


//以下为展示链式调用的基本原理
function ClassManager(){}
ClassManager.prototype.addClass=function(str){
    console.log("class:"+str+"adder");
    return this;//通过返回this作为链式调用的根本
}
var manager=new ClassManager();
manager.addClass('class').addClass('class2');
//class:classadder
//class:class2adder