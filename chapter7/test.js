var a = [1, 2, 3];
a.join();
console.log(a);
console.log(a.join("-"));

var a1 = new Array();
a1[-1.23] = true;
console.log(a1);
a1[2] = 3;
console.log(a1);
// console.log(a1[3]["-1.23"])

var a11 = [, , , ];
var a12 = new Array(3);
console.log(0 in a11);
console.log(0 in a12);

for (var i in a) {
    // if(a.hasOwnProperty(i))
    console.log(i);
}

var fruits = ["Apple", "Banana",,{"s":"s1"}];
fruits.forEach(function(item, index, array) {
	console.log(item+""+index+""+array);
});


var ar=[1,2,3];
ar.reverse();
console.log(ar);

console.log("map:")
var amap=[1,2,3];
var bmap=amap.map(function(item,index){return item+index});
console.log(amap);
console.log(bmap);

//数组的元素不会变，只是抽取元素
console.log("filter");
var afilter=[1,2,3,4,5];
var bfilter=afilter.filter(function(item,index){return index%2==0});
console.log(afilter);
console.log(bfilter);

