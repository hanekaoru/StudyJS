var o = {
    "o1": 1,
    "o2": 2
};

function getPropertyNames(o, a) {
    if (a === undefined) a = [];
    // a=a||[];
    for (var property in o) a.push(property);
    return a;
}
var a = getPropertyNames(o);
console.log(a);
var p;
console.log(getPropertyNames(p, a));

console.log("function arguments length");

function f(x, y, z) {
    if (arguments.length != 3) {
        throw new Error("function length is" + arguments.length);
    }
    console.log("length: " + arguments.length);
}

f("", "", "");
try {
    f("", "", "", "");
} catch (e) {
    console.log(e);
}

console.log("varargs function");

function max() {
    var max = Number.NEGATIVE_INFINITY;
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) max = arguments[i];
    }

    return max;
}

var largest = max(1, 2, 3, 4, 5, 6, 43, 435, 321, 3214, 44, 45);
console.log(largest);
var largest2 = max();
console.log(largest2);


function f1(x){
	console.log(x);
	arguments[0]=null;
	console.log(x);
}

f1("s");

console.log("callee");

var factorial=function(x){
	if(x<=1)return 1;
	return x*arguments.callee(x-1);
}

console.log(factorial(4));


console.log("value function");
var a=[function(x){return x*x},5];
console.log(a[0](a[1]));