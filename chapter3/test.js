console.log("\xA9");
console.log("\o");
var s="test";
s.len=4;
var t=s.len;
console.log(t);

console.log("7"*"4");
var n=1-"x";
console.log(n);
console.log(n+"object");

var scope="global";
function f(){
	console.log("test");
	console.log(scope);
	var scope="local";
	console.log(scope);
}
f();