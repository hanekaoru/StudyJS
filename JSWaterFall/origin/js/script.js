/**
 * Created by Wind on 2016/1/6.
 */
window.onload = function () {
    var data = [{src : "0.jpg"}, {src : "1.jpg"}, {src : "2.jpg"}, {src : "3.jpg"}];
    waterfall("main", "box");
    window.onscroll = function () {
        if (loadData()) {
            //�����ݿ���Ⱦ��ҳ���β��
            var parentNode = document.getElementById("main");
            for (var i = 0; i < data.length; i++) {
                var box = document.createElement("div");
                box.className = "box";
                parentNode.appendChild(box);
                var pic = document.createElement("div");
                pic.className = "pic";
                box.appendChild(pic);
                var img = document.createElement("img");
                img.src = "images/" + data[i].src;
                pic.appendChild(img);
            }
            waterfall("main", "box");
        }
    };
};
function waterfall(parentId, subClassName) {
    //��ø��ڵ�main
    var eleParent = document.getElementById(parentId);
    var oBoxs = getSubClass(eleParent, subClassName);
    var oBoxW = oBoxs[0].offsetWidth;
    //����ҳ��Ŀ��������һҳ�ж�����
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
    //����div��idΪmain�Ŀ��
    eleParent.style.cssText = "width:" + oBoxW * cols + "px;margin:0 auto";
    //�½�һ��������������ÿһ��Ŀǰ�ĸ߶ȣ�����ͼƬʱ����ͼƬ�����ڸ߶���͵�����
    var heiArr = [];
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < cols) {
            heiArr.push(oBoxs[i].offsetHeight);
        } else {
            var index = getMinHeiIndex(heiArr);
            oBoxs[i].style.position = "absolute";
            oBoxs[i].style.top = heiArr[index] + "px";
            oBoxs[i].style.left = oBoxs[index].offsetLeft + "px";
            heiArr[index] += oBoxs[i].offsetHeight;
        }
    }
}

//���ݸ��ڵ�����ȡ����class�Ľڵ�
function getSubClass(parentNode, subClassName) {
    var subClassArr = [];
    var oElement = parentNode.getElementsByClassName(subClassName);
    for (var i = 0; i < oElement.length; i++) {
        if (oElement[i].className == subClassName) {
            subClassArr.push(oElement[i]);
        }
    }
    return subClassArr;
}

function getMinHeiIndex(heiArr) {
    var minHei = Math.min.apply(null, heiArr);
    for (var i = 0; i < heiArr.length; i++) {
        if (minHei == heiArr[i])return i;
    }
}

function loadData() {
    var oParent = document.getElementById("main");
    var eBoxArr = getSubClass(oParent, "box");
    var lastHeight = eBoxArr[eBoxArr.length - 1].offsetTop + Math.floor(eBoxArr[eBoxArr.length - 1].offsetHeight / 2);
    var winHeight = document.body.clientWidth || document.documentElement.clientWidth;
    var scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
    return (winHeight + scrollHeight) > lastHeight;
}