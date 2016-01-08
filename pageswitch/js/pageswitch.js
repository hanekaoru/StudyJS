/**
 * Created by Wind on 2016/1/8.
 */
$.fn.MyPlugin = function () {
    var me = $(this), instance = me.data("myPlugin");
    if (!instance) {
        me.data("myPlugin", (instance = new myPlugin()));
    }
}