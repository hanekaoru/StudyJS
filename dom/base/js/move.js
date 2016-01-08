/**
 * Created by Wind on 2016/1/6.
 */
window.onload = function () {
    var container = document.getElementById("container");
    var imgs = container.getElementsByTagName("img");
    //����ͼƬ�ĳ���
    var imgLength = imgs[0].offsetWidth;
    //����������¶���ĳ���:���Ǻ���ͼƬչʾ�Ŀ��
    var exposeLen = 160;
    //����ÿ���Ŵ�ʱҪ�ƶ��ľ���
    var translate = imgLength - exposeLen;
    //��������������
    var imgTolLen = imgLength + (imgs.length - 1) * exposeLen;
    container.style.width = imgTolLen + "px";
    //����ÿ���ŵĳ�ʼλ��
    function setDoor() {
        for (var i = 1; i < imgs.length; i++) {
            imgs[i].style.left = imgLength + exposeLen * (i - 1) + "px";
        }
    }

    setDoor();
    //Ϊÿ���Ű��¼�
    for (var i = 0; i < imgs.length; i++) {
        //ʹ���������õĺ������ʽ��Ϊ�˻�ò�ͬ��iֵ
        (function (i) {
            imgs[i].onmouseover = function () {
                //�Ƚ�ÿ���Ÿ�λ
                setDoor();
                //����,�ƶ�ǰ�ŵ���
                for (var j = 1; j <= i; j++) {
                    imgs[j].style.left = parseInt(imgs[j].style.left, 10) - translate + "px";
                }
            }
        })(i);
    }
};