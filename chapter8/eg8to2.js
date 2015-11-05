function add(x,y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, num1, num2) {
    return operator(num1, num2);
}
var i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5));
console.log(i);

var operators = {
    add: function add(x,y) {
        return x + y;
    },
    subtract: function subtract(x, y) {
        return x - y;
    },
    multiply: function multiply(x, y) {
        return x * y;
    },
    divide: function divide(x, y) {
        return x / y;
    },
    pow: Math.pow
};

function operate2(operation, num1, num2) {
    if (typeof operators[operation] === "function")
        return operators[operation](num1, num2);
    else throw "unknown operator";
}

var j = operate2("add", "hello", operate2("add", " ", "world"));
var k = operate2("pow", 10, 2);
console.log(j);
console.log(k);

console.log("闭包");
var scope = "global scope";

function checkscope() {
    var scope = "local scope";

    function f() {
        return scope;
    };
    return f();
}

console.log(checkscope());

function checkscope2() {
    var scope = "local scope";

    function f() {
        return scope
    };
    return f;
}

console.log(checkscope2()());
