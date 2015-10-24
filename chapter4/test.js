var rectangle1 = {
    upperleft: {
        x: 2,
        y: 2
    },
    lowerright: {
        x: 4,
        y: 5
    }
};
var rectangle2 = {
    "upperleft": {
        x: 2,
        y: 2
    },
    "lowerright": {
        x: 4,
        y: 5
    }
};
console.log("rectangle1")
console.log(rectangle1.upperleft);
// console.log(rectangle1[0]);
console.log(rectangle1.lowerright);
console.log(rectangle1.upperleft.x);
console.log(rectangle1.upperleft.y);
console.log(rectangle1.lowerright.x);
console.log(rectangle1.lowerright.y);
console.log("rectangle2")
console.log(rectangle2.upperleft);
console.log(rectangle2.lowerright);
console.log(rectangle2.upperleft.x);
console.log(rectangle2.upperleft.y);
console.log(rectangle2.lowerright.x);
console.log(rectangle2.lowerright.y);

console.log("property");
var o={x:1,y:{z:3}};
var a=[o,4,[5,6]];
console.log(o.x);
console.log(o.y.z);
console.log(o["x"]);
console.log(a[1]);
console.log(a[2]["1"]);
console.log(a[0].x);

console.log("side effect")
var d={"a":1};
console.log(d["a"]);
console.log(d.a);
delete d["a"];
console.log(d.a);
console.log(d.d);

console.log("calculate");
console.log(1/0);
console.log(-1/0);
console.log(0/0);

console.log("in operator");
var data=[5,6,7];
// console.log(data."1");
//以下判断的都是索引是否存在
console.log("0" in data);
console.log(1 in data);
console.log(3 in data);

console.log("instanceof");
var d1=new Date();
console.log(d1 instanceof Date);
var a1=1;
console.log(a1 instanceof Object);
// console.log(a1 instanceof a1);
console.log(d1.prototype);

console.log("delete");
var oo={x:1,y:2};
delete oo.x;
console.log(oo);
console.log("x" in oo);

var aa=[5,6,7];
delete aa[1];
console.log(aa);
console.log(aa.length);
console.log(5 in aa);
console.log(1 in aa);


console.log("try catch finally");
var foo=function(){
	try{
		throw new Error("错误");
	}finally{
		return 1;
	}
};

console.log(foo());