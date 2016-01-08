/**
 * Created by Wind on 2016/1/7.
 */
function myReady(fn) {
    //�����������������DOMContentLoaded�¼��Ĵ�����ñ�׼���¼��󶨷�ʽ
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", fn, false);
    } else {
        IEContentLoaded(fn);
    }
    //IEģ��DOMContentLoaded
    function IEContentLoaded(fn) {
        var done = false;
        var d = window.document;
        //ִֻ��һ���û��Ļص�����init����
        var init = function () {
            if (!done) {
                done = true;
                fn();
            }
        }
        (function () {
            try {
                //DOM��δ�������֮ǰ����doScroll���׳�����
                //IE���з�����ģ���û������������jQueryʹ�ô˷�����IE6�м��DOM���Ƿ���á�
                //��������������ã���֤����html��dom���Ѿ��������
                d.documentElement.doScroll("left");
            } catch (e) {
                //�ӳ�����һ��
                setTimeout(arguments.callee, 50);
                return;
            }
        })();
        //����document�ļ���״̬
        d.onreadystatechange = function () {
            //����û�����domReady֮��󶨵ĺ�����������ִ��
            //�ļ�����ȫ���أ�������سɹ���Ȼ��ִ��fn����������ǰ�����Ⱦdom�ڵ�
            if (d.readyState == "complete") {
                d.onreadystatechange = null;
                init();
            }

        }
    }

}
