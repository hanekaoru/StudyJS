/**
 * Created by Wind on 2016/1/5.
 */
//原始方式
var oCar = new Object();
oCar.color = "blue";
oCar.doors = 4;
oCar.mpg = 25;
oCar.showColor = function () {
    alert(this.color);
}

//工厂方式:每次调用函数 createCar()，都要创建新函数 showColor()，
//意味着每个对象都有自己的 showColor() 版本。而事实上，每个对象都共享同一个函数。
function createCar1() {
    var oTempCar = new Object;
    oTempCar.color = "blue";
    oTempCar.doors = 4;
    oTempCar.mpg = 25;
    oTempCar.showColor = function () {
        alert(this.color);
    }
    return oTempCar;
}
var c1 = createCar1();
var c2 = createCar1();

//在工厂函数外定义对象的方法:工厂函数外定义对象的方法，然后通过属性指向该方法，从而避免这个问题：
function showColor() {
    alert(this.color);
}
function createCar2(sColor, iDoors, iMpg) {
    var oTempCar = new Object;
    oTempCar.color = sColor;
    oTempCar.doors = iDoors;
    oTempCar.mpg = iMpg;
    oTempCar.showColor = showColor;
    return oTempCar;
}

var oCar1 = createCar2("red", 4, 23);//赋予对象一个指向已经存在的showColor（）函数的指针，但该方法不太像是对象的方法
var oCar2 = createCar2("blue", 3, 35);

oCar1.showColor();
oCar2.showColor();

//构造函数方式:与工厂方式的差别。首先在构造函数内没有创建对象,而是使用 this 关键字。
//使用 new 运算符构造函数时，在执行第一行代码前先创建一个对象，只有用 this 才能访问该对象。
//然后可以直接赋予 this 属性，默认情况下是构造函数的返回值（不必明确使用 return 运算符）。
function Car(sColor, iDoors, iMpg) {
    this.color = sColor;
    this.doors = iDoors;
    this.mpg = iMpg;
    this.showColor = function () {
        alert(this.color);
    }
}
var oCar11 = new Car("red", 4, 23);
var oCar12 = new Car("blue", 4, 23);

//原型方式:利用了对象的 prototype 属性，可以把它看成创建新对象所依赖的原型
//调用 new Car() 时，原型的所有属性都被立即赋予要创建的对象，意味着所有 Car 实例存放的都是指向 showColor() 函数的指针。
//从语义上讲，所有属性看起来都属于一个对象，因此解决了前面两种方式存在的问题。

//缺点：首先，这个构造函数没有参数。使用原型方式，不能通过给构造函数传递参数来初始化属性的值，因为 Car1 和 Car2 的 color 属性都等于 "blue"，
//doors 属性都等于 4，mpg 属性都等于 25。这意味着必须在对象创建后才能改变属性的默认值，这点很令人讨厌，但还没完。真正的问题出现在属性指向的是对象，
//而不是函数时。函数共享不会造成问题，但对象却很少被多个实例共享。
function CCar() {
}
CCar.prototype.color = "blue";
CCar.prototype.doors = 4;
CCar.prototype.mpg = 25;
CCar.prototype.showColor = function () {
    alert(this.color);
}
var ccar1 = new CCar();
var ccar2 = new CCar();

//混合的构造函数&原型方式
function MCar(sColor, iDoors, iMpg) {
    this.color = sColor;
    this.doors = iDoors;
    this.mpg = iMpg;
    this.drivers = new Array("MIKE");
}
MCar.prototype.showColor = function () {
    alert(this.color);
}
var mcar1 = new MCar("red", 2, 34);
var mcar2 = new MCar("blue", 32, 3);
mcar1.drivers.push("Bill");

alert(oCar1.drivers);	//输出 "MikeBill"
alert(oCar2.drivers);	//输出 "Mike"

//动态原型方法