/**
 * Created by Wind on 2016/1/5.
 */
//ԭʼ��ʽ
var oCar = new Object();
oCar.color = "blue";
oCar.doors = 4;
oCar.mpg = 25;
oCar.showColor = function () {
    alert(this.color);
}

//������ʽ:ÿ�ε��ú��� createCar()����Ҫ�����º��� showColor()��
//��ζ��ÿ���������Լ��� showColor() �汾������ʵ�ϣ�ÿ�����󶼹���ͬһ��������
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

//�ڹ��������ⶨ�����ķ���:���������ⶨ�����ķ�����Ȼ��ͨ������ָ��÷������Ӷ�����������⣺
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

var oCar1 = createCar2("red", 4, 23);//�������һ��ָ���Ѿ����ڵ�showColor����������ָ�룬���÷�����̫���Ƕ���ķ���
var oCar2 = createCar2("blue", 3, 35);

oCar1.showColor();
oCar2.showColor();

//���캯����ʽ:�빤����ʽ�Ĳ�������ڹ��캯����û�д�������,����ʹ�� this �ؼ��֡�
//ʹ�� new ��������캯��ʱ����ִ�е�һ�д���ǰ�ȴ���һ������ֻ���� this ���ܷ��ʸö���
//Ȼ�����ֱ�Ӹ��� this ���ԣ�Ĭ��������ǹ��캯���ķ���ֵ��������ȷʹ�� return ���������
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

//ԭ�ͷ�ʽ:�����˶���� prototype ���ԣ����԰������ɴ����¶�����������ԭ��
//���� new Car() ʱ��ԭ�͵��������Զ�����������Ҫ�����Ķ�����ζ������ Car ʵ����ŵĶ���ָ�� showColor() ������ָ�롣
//�������Ͻ����������Կ�����������һ��������˽����ǰ�����ַ�ʽ���ڵ����⡣

//ȱ�㣺���ȣ�������캯��û�в�����ʹ��ԭ�ͷ�ʽ������ͨ�������캯�����ݲ�������ʼ�����Ե�ֵ����Ϊ Car1 �� Car2 �� color ���Զ����� "blue"��
//doors ���Զ����� 4��mpg ���Զ����� 25������ζ�ű����ڶ��󴴽�����ܸı����Ե�Ĭ��ֵ�������������ᣬ����û�ꡣ�������������������ָ����Ƕ���
//�����Ǻ���ʱ������������������⣬������ȴ���ٱ����ʵ������
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

//��ϵĹ��캯��&ԭ�ͷ�ʽ
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

alert(oCar1.drivers);	//��� "MikeBill"
alert(oCar2.drivers);	//��� "Mike"

//��̬ԭ�ͷ���