/**
 * Created by Wind on 2016/1/11.
 */
(function ($) {
    //�ж������������������
    var _prefix = (function (temp) {
        var prefix = ["webkit", "Moz", "o", "ms"];
        var props = "";
        for (var i = 0; i < prefix.length; i++) {
            props = prefix[i] + "Transition";
            if (temp.style[props] !== undefined) {
                return "-" + prefix[i].toLowerCase() + "-";
            }
        }
        return false;
        //�²����������ⴴ��һ���ڵ㣬Ȼ�����жϸýڵ��Ƿ����ӵ�и�����
    })(document.createElement(PageSwitch));

    //����������ඨ��PageSwitch�����
    var PageSwitch = (function () {
        //�����ﴫ�ݽ�����element�������һ��jquery�������������idΪcontainer��jquery����
        //thisָ���ľ��������ǰ���ô�����PageSwitch�Ķ���ʵ����ָ���ľ���ǰ���instance����
        function PageSwitch(element, options) {
            this.settings = $.extend(true, $.fn.PageSwitch.defaults, options || {});
            this.element = element;
            this.init();
        }

        //����Ϊ����PageSwitch�ķ���
        PageSwitch.prototype = {
            init : function () {
                //���������thisָ����һ���������������е�jqueryDOMԪ����idΪcontainer��div
                var me = this;
                //��λ��Ĭ�ϵ�selectors�ı���
                me.containers = me.settings.containers;
                //���ҵ����������jqueryԪ��
                me.sections = me.element.find(me.containers.sections);
                me.section = me.sections.find(me.containers.section);

                me.vertical = me.settings.vertical;
                me.pagesCounts = me.pageCount();
                me.activeIndex = (me.settings.activeIndex >= 0 && me.settings.activeIndex < me.pagesCounts) ? me.settings.activeIndex : 0;
                //����¼�
                me.canScroll = true;

                if (!me.vertical) {
                    me._initLayout();
                }
                if (me.settings.pagination) {
                    me._initPage();
                }

                me._initEvent();
            },
            //��ȡ�ж���ҳ
            pageCount : function () {
                return this.section.length;
            },
            //��ȡһ�����ĳ��Ȼ��߸߶�
            switchLength : function () {
                return this.direction ? this.element.height() : this.element.width();
            },
            //ҳ������ʼ��
            _initPage : function () {
                var me = this;
                var pageClass = me.containers.page.substring(1);
                me.activeClass = me.containers.activeClass.substring(1);
                var pageHTML = "<ul class='" + pageClass + "'>";
                for (var i = 0; i < me.pagesCounts; i++) {
                    pageHTML += "<li></li>";
                }
                pageHTML += "</ul>";
                me.element.append(pageHTML);
                var pages = me.element.find("ul" + me.containers.page);
                me.pageItem = pages.find("li");
                me.pageItem.eq(0).addClass(me.activeClass);
            },
            _initLayout : function () {
                var me = this;
                var width = (me.pagesCounts * 100) + "%";
                var cellWidth = (100 / me.pagesCounts).toFixed(2) + "%";
                //�������sections����Ϊʹ��transition��ʱ�򣬾���ʹ��sections��div�������λ�Ƶ�
                me.sections.width(width);
                me.section.width(cellWidth).addClass("left");
            },
            //�����¼�������
            _initEvent : function () {
                var me = this;
                //����ҳ����������
                if (me.pagination) {
                    me.element.find(me.containers.page + " li").on("click", function () {
                        me.activeIndex = $(this).index();
                        me._scrollPage();
                    });
                }
                //ҳ��������:���ҳ�������һҳ
                me.sections.on("click", function () {
                    me._nextPage();
                });

                //�����������¼�
                me.element.on("mousewheel DOMMouseScroll", function (e) {
                        var delta = e.originalEvent.wheelDelta || -e.originalEvent.wheelDelta;
                        if (delta > 0 && (me.activeIndex && !me.settings.loop || me.settings.loop)) {
                            me._prevPage();
                        } else if (delta < 0 && (me.activeIndex < (me.pagesCount - 1) && !me.settings.loop || me.settings.loop)) {
                            me._nextPage();
                        }
                    }
                );
                //���ü��̷�����¼�
                if (me.settings.keyboard) {
                    $(window).on("keypress", function (e) {
                        var keyCode = e.keyCode;
                        if (keyCode == 37 || keyCode == 38) {
                            me._prevPage();
                        } else if (keyCode == 39 || keyCode == 40) {
                            me._nextPage();
                        }
                    });
                }
                //��������ڴ�С�ı䴥�����¼�
                $(window).resize(function () {
                        var currentLength = me.switchLength();
                        var offset = me.settings.vertical ? me.section.eq(me.activeIndex).offset().top : me.section.eq(me.activeIndex).offset().left;
                        if (Math.abs(offset) > currentLength / 2 && me.activeIndex < (me.pagesCounts - 1)) {
                            me.activeIndex++;
                        }
                        if (me.activeIndex) {
                            me._scrollPage();
                        }
                    }
                );
                //������Transition��css����ִ����Ϻ󣬵��ø��¼�����
                me.sections.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend", function () {
                    me.canScroll = true;
                    if (me.settings.onPageSwitch && $.type(me.settings.onPageSwitch) == "function") {
                        me.settings.onPageSwitch();
                    }
                })
            },
            //��һҳ
            _prevPage : function () {
                var me = this;
                //�������ж��Ƿ������һҳ�������Ƿ񲥷���ϣ�,�������ԭ���ǣ�������ܽ�����һҳ�������ı䣬activeIndex����ı䣬
                //�������_scrollPage()���������жϣ���ʱactiveIndex�Ѿ��ı�,�����scrollPanelΪfalse������һ�ι�������ҳ
                if (me.canScroll) {
                    if (me.activeIndex > 0) {
                        me.activeIndex--;
                    } else if (me.settings.loop) {
                        me.activeIndex = me.pagesCounts - 1;
                    }
                    me._scrollPage();
                }
            },
            //��һҳ
            _nextPage : function () {
                var me = this;
                if (me.canScroll) {
                    if (me.activeIndex < me.pagesCounts - 1) {
                        me.activeIndex++;
                    } else if (me.settings.loop) {
                        me.activeIndex = 0;
                    }
                    me._scrollPage();
                }
            }
            ,
            //��ʵ���ʾ���activeIndex�������ˣ�Ȼ���������޸���ӡ����ʽ
            _scrollPage : function () {
                var me = this;
                var activeFace = me.section.eq(me.activeIndex).position();
                if (!activeFace)return;
                me.canScroll = false;
                //ӵ�и���ʽ
                if (_prefix) {
                    me.sections.css(_prefix + "transition", "all " + me.settings.duration + "ms " + me.settings.easing);
                    var translate = me.vertical ? "translateY(-" + activeFace.top + "px)" : "translateX(-" + activeFace.left + "px)";
                    me.sections.css(_prefix + "transform", translate);
                } else {
                    var animateCss = me.direction ? {top : -activeFace.top} : {left : -activeFace.left};
                    me.sections.animate(animateCss, me.settings.duration, function () {
                        me.canScroll = true;
                        if (me.settings.onPageSwitch && $.type(me.settings.onPageSwitch) == "function") {
                            me.settings.onPageSwitch();
                        }
                    })
                }
                if (me.settings.pagination) {
                    me.pageItem.eq(me.activeIndex).addClass(me.activeClass).siblings("li").removeClass(me.activeClass);
                }
            }
        };
        return PageSwitch;
    })();
    //���������Ϊһ�������հ����������ӵ�jQuery��
    $.fn.PageSwitch = function (options) {
        console.log("start");
        //��ѡ�е�jquery������һ��ѭ�������ε��������Ԫ��
        return this.each(function () {
            var me = $(this);
            var instance = me.data("PageSwitch");
            if (!instance) {
                instance = new PageSwitch(me, options);
                me.data("PageSwitch", instance);
            }
            //����������Ĳ��Ƕ�������ַ�����������������
            if ($.type(options) === "string")return instance[options]();
        })
    };
    //����һ��Ĭ������
    $.fn.PageSwitch.defaults = {
        containers : {
            container : "#container",//����
            sections : ".sections",//�ڶ���
            section : ".section",//�ӽڵ��
            intro : ".intro",//װ��ҳ�������
            page : ".pages",//ҳ����ul
            activeClass : ".active"//�������ҳ����
        },
        activeIndex : 0,//Ĭ����ʼҳ��
        easing : "ease-in-out",//��Ч��ʽ��ease-in,ease-out,linear
        duration : 1000,//ÿ�ζ���ִ�е�ʱ��
        pagination : true,//�Ƿ���ʾ��ҳ���ұ��м�ķ�ҳ��
        loop : true,//�Ƿ�ѭ��
        keyboard : true,//�Ƿ�֧�ּ���
        vertical : true,//��������Ĭ��Ϊtrue������false(horizontal)
        onPageSwitch : ""//��ҳ�ص�����
    };
    $("#container").PageSwitch({
        loop : true,
        vertical : false

    });

})
(jQuery);

