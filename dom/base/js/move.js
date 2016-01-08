/**
 * Created by Wind on 2016/1/6.
 */
window.onload = function () {
    var container = document.getElementById("container");
    var imgs = container.getElementsByTagName("img");
    //单张图片的长度
    var imgLength = imgs[0].offsetWidth;
    //设置掩体们露出的长度:就是后面图片展示的宽度
    var exposeLen = 160;
    //设置每道门打开时要移动的距离
    var translate = imgLength - exposeLen;
    //设置总容器长度
    var imgTolLen = imgLength + (imgs.length - 1) * exposeLen;
    container.style.width = imgTolLen + "px";
    //设置每道门的初始位置
    function setDoor() {
        for (var i = 1; i < imgs.length; i++) {
            imgs[i].style.left = imgLength + exposeLen * (i - 1) + "px";
        }
    }

    setDoor();
    //为每道门绑定事件
    for (var i = 0; i < imgs.length; i++) {
        //使用立即调用的函数表达式，为了获得不同的i值
        (function (i) {
            imgs[i].onmouseover = function () {
                //先将每道门复位
                setDoor();
                //打开门,移动前门的门
                for (var j = 1; j <= i; j++) {
                    imgs[j].style.left = parseInt(imgs[j].style.left, 10) - translate + "px";
                }
            }
        })(i);
    }
};