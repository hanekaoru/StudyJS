

var d=new Date();
console.log(Date.prototype);

//通过原形继承创建一个新对象
//inherit()返回一个继承自原型对象p的属性的新对象
//这里使用ECMAScript5中的Object.create()函数（如果存在的话）
//如果不存在Object.create()，则退化使用其他方法
function inherit(p){
	if(p==null)throw TypeError();
	if(Object.create)
		return Object.create(p);
	var t=typeof p;
	if(t!=="object"&t!=="function") throw TypeError();
	function f(){};
	f.prototype=p;
	return new f();
}
var o={};
o.x=1;
var p=inherit(o);
p.y=2;
var q=inherit(p);
q.z=3;
var s=q.toString();
console.log(q.x+q.y);
Object.prototype=0;
// console.log(p.prototype.x);

console.log("delete");
var x=1;
delete this.x;
function f(){
}
delete this.f;
console.log(x);