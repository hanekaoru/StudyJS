/**
 * Created by Wind on 2015/12/21 20:14.<br>
 * Project_Name StudyJS.
 */
/**
 * Created by Wind on 2015/12/21 19:58.<br>
 * Project_Name StudyJS.
 */
    //function People(name)
    //{
    //    this.name=name;
    //    //对象方法
    //    this.Introduce=function(){
    //        alert("My name is "+this.name);
    //    }
    //}
    ////类方法
    //People.Run=function(){
    //    alert("I can run");
    //}
    ////原型方法
    //People.prototype.IntroduceChinese=function(){
    //    alert("我的名字是"+this.name);
    //}
    ////测试
    //var p1=new People("Windking");
    //
    //p1.Introduce();
    //
    //People.Run();
    //
    //p1.IntroduceChinese();

(function () {
    var a = (function () {
        function A() {
            console.log(this)
            this.b = "s";
            console.log(this)
        }

        return A;
    })();
    var test = $(".test");
    console.log(test);
    test.each(function () {
        console.log(this);
        var b = new a();
        console.log(b);
        console.log(this.innerHTML);
    })
})();

