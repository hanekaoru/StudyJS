/**
 * Created by Wind on 2015/12/21 21:02.<br>
 * Project_Name StudyJS.
 */
//对象字面量方法定义对象
var man = {
    weibo: "test",
    $age: null,
    get age() {
        if (this.$age == undefined) {
            return new Date().getFullYear() - 1998;
        } else {
            return this.$age;
        }
    },
    set age(val) {
        val = +val;
        if (!isNaN(val) && val > 0 && val < 150) {
            this.$age = +val;
        } else {
            throw new Error("Incorrect val=" + val);
        }
    }
};
console.log(man.age);
man.age=100;
console.log(man.age);
//man.age="abe";
