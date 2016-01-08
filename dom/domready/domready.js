/**
 * Created by Wind on 2016/1/7.
 */
function myReady(fn) {
    //对于现在浏览器，对DOMContentLoaded事件的处理采用标准的事件绑定方式
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", fn, false);
    } else {
        IEContentLoaded(fn);
    }
    //IE模拟DOMContentLoaded
    function IEContentLoaded(fn) {
        var done = false;
        var d = window.document;
        //只执行一次用户的回调函数init（）
        var init = function () {
            if (!done) {
                done = true;
                fn();
            }
        }
        (function () {
            try {
                //DOM树未创建完成之前调用doScroll会抛出错误
                //IE独有方法，模拟用户滚动条点击；jQuery使用此方法在IE6中检测DOM树是否可用。
                //如果滚动条可以用，就证明该html的dom树已经加载完毕
                d.documentElement.doScroll("left");
            } catch (e) {
                //延迟再试一次
                setTimeout(arguments.callee, 50);
                return;
            }
        })();
        //监听document的加载状态
        d.onreadystatechange = function () {
            //如果用户是在domReady之后绑定的函数，就立马执行
            //文件已完全加载，代表加载成功，然后执行fn函数，就是前面的渲染dom节点
            if (d.readyState == "complete") {
                d.onreadystatechange = null;
                init();
            }

        }
    }

}
