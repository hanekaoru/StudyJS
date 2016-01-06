/**
 * Created by Wind on 2016/1/6.
 */
function Person() {
    var args = arguments;
    if (typeof args[0] === "object" && args[0]) {
        if (args[0].name) {
            this.name = args[0].name;
        }
        if (args[0].age) {
            this.age = args[0].age;
        }
    } else {
        if (args[0]) {
            this.name = args[0];
        }
        if (args[1]) {
            this.age = args[1];
        }
    }
}
Person.prototype.toString = function () {
    return "name:" + this.name + ",age:" + this.age;
}
var bosn = new Person("bosn", 26);
bosn.toString();//name:bosn,age:26

var numm = new Person("numm", 46);
numm.toString();//name:numm,age:46

