/**
 * Created by Wind on 2016/1/7.
 */
window.onload = displayData();
//�����ݷ����仯ʱ���ͻ����dispalydata����������ʾ
window.addEventListener("storage", displayData, false)
//clear the localStorage data
function clear() {
    if (confirm("Are you sure to clear all lists?")) {
        localStorage.clear();
    }
    displayData();
}
function loadData() {
    var data = localStorage.getItem("list");
    if (data != null) {
        return JSON.parse(data);
    } else
        return [];
}
function saveData(list) {
    localStorage.setItem("list", JSON.stringify(list));
    return true;
}
//add a new list data when you confirm in the form
function addDoingList() {
    var nList = document.getElementById("enterlist");
    if (nList.value == null || nList.value == "") {
        alert("���ݲ���Ϊ�գ�");
    }
    else {
        var data = loadData();
        var todo = {"text" : nList.value, "doing" : true};
        data.push(todo);
        saveData(data);
        document.getElementById("form").reset();
        displayData();
    }
}
//display the data newly
function displayData() {
    var data = loadData();
    var doingList = document.getElementById("doinglist");
    var doneList = document.getElementById("donelist");
    var doingString = "";
    var doneString = "";
    var doingCount = 0;
    var doneCount = 0;
    var doingol = document.getElementById("doinglist");
    var doingcount = document.getElementById("doingcount");
    var doneul = document.getElementById("donelist");
    var donecount = document.getElementById("donecount");
    if (data != null) {
        //display the doinglist in the order that you added desc
        for (var i = data.length - 1; i >= 0; i--) {
            if (data[i].doing == true) {
                //add the li innerhtml in the ol
                doingString += "<li draggable='true'><input type='checkbox' onclick='toChangeDo(" + i + ")'/>" +
                    "<p id='p-" + i + "' onclick='editDoing(" + i + ")'>" + data[i].text + "</p>" +
                    "<a href='javascript:remove(" + i + ")'>-</a></li>";
                doingCount++;
            } else {
                doneString += "<li draggable='false'><input type='checkbox' onclick='toChangeDo(" + i + ")' checked='checked'/>" +
                    "<p id='p-" + i + "' onclick='editDoing(" + i + ")'>" + data[i].text + "</p>" +
                    "<a href='javascript:remove(" + i + ")'>-</a></li>";
                doneCount++;
            }
        }
    }
    doingol.innerHTML = doingString;
    doingcount.innerHTML = doingCount;
    doneul.innerHTML = doneString;
    donecount.innerHTML = doneCount;

    //add the listener to the li
    var list = doingList.querySelectorAll("ol li");
    [].forEach.call(list, function (lis) {
        lis.addEventListener("dragstart", handleDragStart, false);
        lis.addEventListener("dragover", handleDragOver, false);
        lis.addEventListener("drop", handleDrop, false);
    })
}
//change the status of the list
function toChangeDo(i) {
    var data = loadData();
    //ɾ�����һ�ñ�����ĵ�i��Ԫ��
    var todo = data.splice(i, 1)[0];
    todo.doing = (todo.doing == true ) ? false : true;
    //���ﻹҪ����Ƴ��������ķ���
    //����������������������������������������
    data.splice(i, 0, todo);
    saveData(data);
    displayData();
}
//edit the content of the list
function editDoing(i) {
    var p = document.getElementById("p-" + i);
    var title = p.innerHTML;
    p.innerHTML = "<input type='text' id='input-" + i + "' value='" + title + "' />";
    var input = document.getElementById("input-" + i);
    input.setSelectionRange(0, input.value.length);
    input.focus();
    input.onblur = function () {
        if (input.value.length == 0) {
            p.innerHTML = title;
            alert("���ݲ���Ϊ�գ�");
        } else {
            update(i, input.value);
        }
    }
}
//update the data in the localStorage for the method "editDoing"
function update(i, value) {
    var data = loadData();
    data[i].text = value;
    saveData(data);
    displayData();
}
//remove the selected data in the localStorage
function remove(i) {
    var data = loadData();
    var todo = data.splice(i, 1)[0];
    saveData(data);
    displayData();
}
var dragSrcEl = null;
//�ڸտ�ʼ��קʱ������ʼ��ק�����ͻ�ȡ���е�����
function handleDragStart(event) {
    dragSrcEl = this;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", this.innerHTML);
}
//����һ������������һ�����ʱ���������ᴥ�����¼�;
//��������˸������Ͳ��ᱻ����
function handleDragOver(e) {
    if (e.preventDefault())
        e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
}
//����קһ�������Ŀ������������ɿ�ʱĿ�������������¼�
function handleDrop(e) {
    if (e.stopPropagation())
        e.stopPropagation();
    if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData("text/html");
        saveSort();
    }
    return false;
}
//����ק�󣬶�localStorage�����ݽ�������
function saveSort() {
    var data = [];
    var doingList = document.getElementById("doinglist");
    var doneList = document.getElementById("donelist");
    var pDoing = doingList.querySelectorAll("li>p");
    var pDone = doneList.querySelectorAll("li>p");
    console.log(pDoing);
    console.log(pDone);
    for (var i = 0; i < pDoing.length; i++) {
        data.unshift({"text" : pDoing[i].innerText, "doing" : true});
    }
    for (var i = 0; i < pDone.length; i++) {
        data.unshift({"text" : pDone[i].innerText, "doing" : false});
    }
    saveData(data);
    displayData();
}
