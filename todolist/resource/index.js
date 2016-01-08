function clear() {
    localStorage.clear();
    load();
}

function postaction() {
    var title = document.getElementById("title");
    if (title.value == "") {
        alert("内容不能为空");
    } else {
        var data = loadData();
        var todo = {"title" : title.value, "done" : false};
        data.push(todo);
        saveData(data);
        var form = document.getElementById("form");
        form.reset();
        load();
    }
}
//读取本地数据
function loadData() {
    var collection = localStorage.getItem("todo");
    if (collection != null) {
        return JSON.parse(collection);
    }
    else return [];
}

function saveSort() {
    var todolist = document.getElementById("todolist");
    var donelist = document.getElementById("donelist");
    var ts = todolist.getElementsByTagName("p");
    var ds = donelist.getElementsByTagName("p");
    var data = [];
    for (i = 0; i < ts.length; i++) {
        var todo = {"title" : ts[i].innerHTML, "done" : false};
        data.unshift(todo);
    }
    for (i = 0; i < ds.length; i++) {
        var todo = {"title" : ds[i].innerHTML, "done" : true};
        data.unshift(todo);
    }
    saveData(data);
}

function saveData(data) {
    localStorage.setItem("todo", JSON.stringify(data));
}

function remove(i) {
    var data = loadData();
    var todo = data.splice(i, 1)[0];
    saveData(data);
    load();
}

function update(i, field, value) {
    var data = loadData();
    var todo = data.splice(i, 1)[0];
    todo[field] = value;
    data.splice(i, 0, todo);
    saveData(data);
    load();
}

function edit(i) {
    load();
    var p = document.getElementById("p-" + i);
    title = p.innerHTML;
    p.innerHTML = "<input id='input-" + i + "' value='" + title + "' />";
    var input = document.getElementById("input-" + i);
    input.setSelectionRange(0, input.value.length);
    input.focus();
    //失去焦点时的事件
    input.onblur = function () {
        if (input.value.length == 0) {
            p.innerHTML = title;
            alert("内容不能为空");
        }
        else {
            update(i, "title", input.value);
        }
    };
}

function load() {
    var todolist = document.getElementById("todolist");
    var donelist = document.getElementById("donelist");
    var collection = localStorage.getItem("todo");
    if (collection != null) {
        var data = JSON.parse(collection);
        var todoCount = 0;
        var doneCount = 0;
        var todoString = "";
        var doneString = "";
        for (var i = data.length - 1; i >= 0; i--) {
            if (data[i].done) {
                doneString += "<li draggable='true'><input type='checkbox' onchange='update(" + i + ",\"done\",false)' checked='checked' />"
                    + "<p id='p-" + i + "' onclick='edit(" + i + ")'>" + data[i].title + "</p>"
                    + "<a href='javascript:remove(" + i + ")'>-</a></li>";
                doneCount++;
            }
            else {
                todoString += "<li draggable='true'><input type='checkbox' onchange='update(" + i + ",\"done\",true)' />"
                    + "<p id='p-" + i + "' onclick='edit(" + i + ")'>" + data[i].title + "</p>"
                    + "<a href='javascript:remove(" + i + ")'>-</a></li>";
                todoCount++;
            }
        }
        ;
        todocount.innerHTML = todoCount;
        todolist.innerHTML = todoString;
        donecount.innerHTML = doneCount;
        donelist.innerHTML = doneString;
    }
    else {
        todocount.innerHTML = 0;
        todolist.innerHTML = "";
        donecount.innerHTML = 0;
        donelist.innerHTML = "";
    }

    var lis = todolist.querySelectorAll('ol li');
    [].forEach.call(lis, function (li) {
        //在拖动目标上触发事件 (源元素):dragstart用户开始拖动元素时触发
        li.addEventListener('dragstart', handleDragStart, false);
        //释放目标时触发的事件:
        // dragenter :当被鼠标拖动的对象进入其容器范围内时触发此事件
        // dragover当某被拖动的对象在另一对象容器范围内拖动时触发此事件
        // ondrop:在一个拖动过程中，释放鼠标键时触发此事件，形容一个容器，多用于一个对象被拖进来后置于容器后，鼠标放开时该容器发生的事情
        li.addEventListener('dragover', handleDragOver, false);
        li.addEventListener('drop', handleDrop, false);

        //这个函数用的莫名其妙
        onmouseout = function (event) {
            saveSort();
        };
    });
}

window.onload = load;
//它说得很清晰，当存储的storage数据发生变化时都会触发它，但是它不同于click类的事件会冒泡和能取消，同时最后这句才是重点，storage改变的时候，触发这个事件会调用所有同域下其他窗口的storage事件，
window.addEventListener("storage", load, false);

var dragSrcEl = null;
//然后，规定当元素被拖动时，会发生什么。
//在上面的例子中，ondragstart 属性调用了一个函数，drag(event)，它规定了被拖动的数据。
//dataTransfer对象是事件对象的一个属性，用于从被拖拽元素相放置目标传递字符串格式的数据。
//保存在dataTransfer对象中的数据只能在drop事件处理程序中读取。
//dataTransfer.setData() 方法设置被拖数据的数据类型和值：
function handleDragStart(e) {
    dragSrcEl = this;
    //effectAllowed属性
    //光有dropEffect属性是不咋管用的。只有结合effectAllowed属性一起使用才能发挥功效。effectAllowed属性表示允许拖动元素的哪种行为(dropEffect)。effectAllowed属性也有很多值，其值如下：
    e.dataTransfer.effectAllowed = 'move';
    console.log(this.innerHTML)
    e.dataTransfer.setData('text/html', this.innerHTML);
}
//ondragover 事件规定在何处放置被拖动的数据。
//默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。
//这要通过调用 ondragover 事件的 event.preventDefault() 方法：
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    //    运用dataTransfer对象，不仅仅能传输数据，还能通过dataTransfer对象确定被拖拽的元素以及作为放置目标的元素能够接收什么操作。要实现这样的功能就用到了dropEffect属性和effectAllowed属性。
    //　　dropEffect属性
    //    其中，通过dropEffect属性可以知道被拖动的元素能够执行哪种行为。这个属性的四个值如下：被设置为一个不属于effectAllowed限定的值时，整个事件链将被中止，即后续事件都将不会被触发，但不会发生任何错误提示。
    e.dataTransfer.dropEffect = 'move';
    return false;
}
//代码解释：
//调用 preventDefault() 来避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）
//通过 dataTransfer.getData("Text") 方法获得被拖的数据。该方法将返回在 setData() 方法中设置为相同类型的任何数据。
//被拖数据是被拖元素的 id
//把被拖元素追加到放置元素（目标元素）中
//当鼠标松开时，交换两者的位置和数据
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    //这个时候交换数据，dragSrcE1是指一开始点击按钮时的li，
    //这里的this是指要交换的li
    if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}
