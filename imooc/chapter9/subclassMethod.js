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
//�����������������ø��෽��
Student.prototype.init = function () {
    Person.prototype.init.apply(this, arguments);
}


//����Ϊչʾ��ʽ���õĻ���ԭ��
function ClassManager(){}
ClassManager.prototype.addClass=function(str){
    console.log("class:"+str+"adder");
    return this;//ͨ������this��Ϊ��ʽ���õĸ���
}
var manager=new ClassManager();
manager.addClass('class').addClass('class2');
//class:classadder
//class:class2adder