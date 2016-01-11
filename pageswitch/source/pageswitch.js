(function ($) {
    var _prefix = (function (temp) {
        var aPrefix = ["webkit", "Moz", "o", "ms"],
            props = "";
        for (var i in aPrefix) {
            props = aPrefix[i] + "Transition";
            if (temp.style[props] !== undefined) {
                return "-" + aPrefix[i].toLowerCase() + "-";
            }
        }
        return false;
        //这里是随意创造一个节点，然后尝试判断该节点是否可以拥有该属性
    })(document.createElement(PageSwitch));

    var PageSwitch = (function () {
        function PageSwitch(element, options) {

            console.log(this);
            this.settings = $.extend(true, $.fn.PageSwitch.default, options || {});//true参数代表有重复的就替换
            this.element = element;
            this.init();
            console.log(this);//输出的就是前面的instance对象
        }

        PageSwitch.prototype = {
            init : function () {
                console.log(this);//这里的this指代的是当前引用对象的变量，就是前面的instance
                var me = this;
                me.selectors = me.settings.selectors;
                //下面两个代表的是jquery对象
                me.sections = me.element.find(me.selectors.sections);//获得当前元素集合中每个元素的后代,这里指代的就是class为sections的div
                me.section = me.sections.find(me.selectors.section);//这里返回的是一个class为section的四个div的数组

                me.direction = me.settings.direction == "vertical" ? true : false;
                me.pagesCount = me.pagesCount();
                me.canScroll = true;
                me.index = (me.settings.index >= 0 && me.settings.index < me.pagesCount) ? me.settings.index : 0;
                if (!me.direction) {
                    me._initLayout();
                }
                //是否显示分页条栏
                if (me.settings.pagination) {
                    me._initPaging();
                }
                me._initEvent();
            },
            pagesCount : function () {
                return this.section.length;
            },
            switchLength : function () {
                return this.direction ? this.element.height() : this.element.width();
            },
            prev : function () {
                var me = this;
                if (me.index > 0) {
                    me.index--;
                } else if (me.settings.loop) {
                    me.index = me.pagesCount - 1;
                }
                me._scrollPage();
            },
            next : function () {
                var me = this;
                if (me.index < me.pagesCount) {
                    me.index++;
                } else if (me.settings.loop) {
                    me.index = 0;
                }
                me._scrollPage();
            },
            //用来更改布局的，当且仅当布局为horizontal时才用到，当为vertical时则不用，因为高度已经默认设置为100%了，所以转页时进行的是高度的偏差
            _initLayout : function () {
                var me = this;
                var width = (me.pagesCount * 100 ) + '%',
                    cellWidth = (100 / me.pagesCount).toFixed(2) + '%';
                me.sections.width(width);
                me.section.width(cellWidth).css("float", "left");
            },
            _initPaging : function () {
                var me = this,
                    pagesClass = me.selectors.page.substring(1);//就是pages
                me.activeClass = me.selectors.active.substring(1);//这里就是activeclass
                var pageHtml = "<ul class=" + pagesClass + ">";
                for (var i = 0; i < me.pagesCount; i += 1) {
                    pageHtml += "<li></li>";
                }
                pageHtml += "</ul>";
                me.element.append(pageHtml);//直接在container的div上添加一个滚动条
                var pages = me.element.find(me.selectors.page);
                me.pageItem = pages.find("li");
                me.pageItem.eq(0).addClass('active');
                //这里的class暂时没用到
                if (me.direction) {
                    pages.addClass("vertical");
                } else {
                    pages.addClass("horizontal");
                }
            },
            _initEvent : function () {
                //指代前面的instance对象
                var me = this;
                //点击事件
                me.element.on("click", me.selectors.pages + " li", function () {
                    console.log("click");
                    me.index = $(this).index();
                    me._scrollPage();
                });
                //鼠标滚轮事件
                me.element.on("mousewheel DOMMouseScroll", function (e) {
                    if (me.canScroll) {
                        //如果delta为正，就是向上滚动
                        var delta = e.originalEvent.wheelDelta || -e.originalEvent.wheelDelta;
                        if (delta > 0 && (me.index && !me.settings.loop || me.settings.loop)) {
                            me.prev();
                        } else if (delta < 0 && (me.index < (me.pagesCount - 1) && !me.settings.loop || me.settings.loop)) {
                            me.next();
                        }
                    }
                });
                if (me.settings.keyword) {
                    $(window).on("keydown", function (e) {
                        var keyCode = e.keyCode;
                        if (keyCode == 37 || keyCode == 38) {
                            me.prev();
                        } else if (keyCode == 39 || keyCode == 40) {
                            me.next();
                        }
                    });
                }
                //这里的作用暂时不懂
                $(window).resize(function () {
                    //表示当前id为container的div的大小
                    var currentLength = me.switchLength(),
                        offset = me.settings.direction ? me.section.eq(me.index).offset().top : me.section.eq(me.index).offset().left;
                    console.log(currentLength)
                    console.log(me.section.eq(me.index).offset().top);
                    if (Math.abs(offset) > currentLength / 2 && me.index < (me.pagesCount - 1)) {
                        me.index++;
                    }
                    if (me.index) {
                        me._scrollPage();
                    }
                });

                //在css动画执行完毕之后，设置canScroll为true，允许再次滚动
                me.sections.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend", function () {
                    me.canScroll = true;
                    if (me.settings.callback && $.type(me.settings.callback) == "function") {
                        me.settings.callback();
                    }
                })
            },
            _scrollPage : function () {
                var me = this,
                    dest = me.section.eq(me.index).position();
                console.log( me.section.eq(me.index));
                if (!dest) return;
                me.canScroll = false;
                console.log(_prefix);
                if (_prefix) {
                    me.sections.css(_prefix + "transition", "all " + me.settings.duration + "ms " + me.settings.easing);
                    var translate = me.direction ? "translateY(-" + dest.top + "px)" : "translateX(-" + dest.left + "px)";
                    me.sections.css(_prefix + "transform", translate);
                } else {
                    var animateCss = me.direction ? {top : -dest.top} : {left : -dest.left};
                    me.sections.animate(animateCss, me.settings.duration, function () {
                        me.canScroll = true;
                        if (me.settings.callback && $.type(me.settings.callback) == "function") {
                            me.settings.callback();
                        }
                    })
                }
                if (me.settings.pagination) {
                    //获取同胞元素时不包括自身
                    me.pageItem.eq(me.index).addClass(me.activeClass).siblings("li").removeClass(me.activeClass);
                }
            }
        };
        return PageSwitch;
    })();
    /**
     * 通过dom元素获取一个dom节点，然后把这些生成的单例模式的对象放在这个节点中
     * @param options
     * @returns {*}
     * @constructor
     */
    $.fn.PageSwitch = function (options) {
        console.log('start')
        console.log(this);//这里的this代表的是含有属性data-PageSwitch的id为container的jquery对象的数组，这里只有一个
        return this.each(function () {
            console.log(this);//这里的this代表的是符合上面的id为container的jquery对象数组的每一个元素，只有一个元素container
            var me = $(this),//所以me指代的对象就是id为container的jquery对象
            //理解这里的instance所指代的对象，与立即执行函数中的构造函数中的this指代的对象相同
                instance = me.data("PageSwitch");//data()属于jquery对象的方法，可以通过键值对为这个对象存储数据
            if (!instance) {
                instance = new PageSwitch(me, options);
                me.data("PageSwitch", instance);
                console.log(this);
            }
            if ($.type(options) === "string") return instance[options]();
        });
    }
    $.fn.PageSwitch.default = {
        selectors : {
            sections : ".sections",
            section : ".section",
            page : ".page",
            active : ".active"
        },
        index : 0,//起始页面
        easing : "ease", //动画曲线
        duration : 500,//动画延迟
        loop : false,
        pagination : true,//是否支持分页
        keyword : true,//是否支持键盘控制
        direction : "vertical",//控制方向横：horizontal 竖：vertical
        callback : ''//回调函数
    };
    $(function () {
        $("[data-PageSwitch]").PageSwitch({
            loop : true,
            direction : "vertical",
            callback : function () {
            }
        });
    });
})(jQuery);