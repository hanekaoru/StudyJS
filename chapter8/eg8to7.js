// function check(args){
// 	var actual=args.length;
// 	var expected=args.callee.length;
// 	if(actual!==expected){
// 		console.log("两者不相等");
// 	}
// }

// check("s","s");


function isFunction(x){
	return Object.prototype.toString.call(x)==="[object Function]";
}
function f(){

}
var i=1;
console.log(isFunction(f));
console.log(isFunction(i));
console.log(isFunction(f()));
