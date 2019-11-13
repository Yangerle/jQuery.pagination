/*通过使用$(document).ready()方法，
jQuery支持我们预定在DOM加载完毕后调用某个函数，
而不必等待页面中的图像加载，
尽管不使用jQuery，也可以做到这种预定（使用js嵌入html的方式），但$(document).ready()为我们提供了很好的跨浏览器解决方案
*/
$(document).ready(function () {
    $.pagination({
        totalPage:50,
        selector:'#pageSwitch',
        showNum:12,
        callback:function () {
            console.log('gogogo')
        }
    });
})


