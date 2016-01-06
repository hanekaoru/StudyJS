$(window).on("load", function () {
    waterfall("main", "box");
    var data = [{src : "0.jpg"}, {src : "1.jpg"}, {src : "2.jpg"}, {src : "3.jpg"}];
    $(window).on("scroll", function () {
        if (loadData("main", "box")) {
            $.each(data, function (index, value) {
                var box = $("<div>").addClass("box").appendTo($("#main"));
                var pic = $("<div>").addClass("pic").appendTo($(box));
                var img = $("<img>").attr("src", "images/" + $(value).attr("src")).appendTo($(pic));
            })
            waterfall("main", "box");
        }
    })
})
function waterfall(parentId, subClass) {
    var $box = $("#" + parentId + ">." + subClass);
    var weight = $box.eq(0).outerWidth();
    var cols = Math.floor($(window).width() / weight);
    $("#" + parentId).width(weight * cols).css("margin", "0 auto");
    var hArr = [];
    //index表示序号，value表示传进来的数组元素，现在在这里是DOM元素
    $box.each(function (index, value) {
        var h = $box.eq(index).outerHeight();
        if (index < cols) {
            hArr[index] = h;
        } else {
            var minH = Math.min.apply(null, hArr);
            var minIndex = $.inArray(minH, hArr);
            $(value).css({
                position : 'absolute',
                top : minH + "px",
                left : weight * minIndex + "px",
            });
            hArr[minIndex] += $(value).outerHeight();
        }
    })
}
function loadData(parentId, subClass) {
    var $lastBox = $("#" + parentId + ">." + subClass).last();
    var $lastHeight = Math.floor($lastBox.outerHeight()/ 2) + $lastBox.offset().top;
    var $winHeight = $(window).height();
    var $scrollHeight = $(window).scrollTop();
    return $lastHeight > ($winHeight + $scrollHeight);
}

