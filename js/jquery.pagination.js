/*!
 * jQuery pagination
 * @name jquery.pagination.js
 * @version 1.0.0
 * @date 2019-11-13
 * @author yangerle
 * @email yxl311306@foxmail.com
 * @site https://github.com/yangerle/jquery.pagination
 * @license Released under the MIT license
 */

(function(factory) {
    if(typeof exports === 'object'){
        require("jsdom").env("", function(err, window) {
            if (err) {
                console.error(err);
                return;
            }
            global.$ = require("jquery")(window);
            factory($)
        });
    } else if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(window.jQuery || window.Zepto || window.$);
    };
}(function ($) {
    function _isNumber(value) {
        var patrn = /^(-)?\d+(\.\d+)?$/;
        if (patrn.exec(value) == null || value == "") {
            return false
        } else {
            return true
        }
    }
    //弹出提示窗

    function _showToast(msg,errCode){

        if(msg==""){
            return;
        }
        try{
            var divDom = $("<div></div>")
            divDom.css({
                "position":"fixed",
                "top":"7.5em",
                "left":"50%",
                "background":"rgba(0,0,0,0.5)",
                "padding":"0.5em 1em",
                "color":"#ffffff",
                "border-radius":"1em",
                "transform":"translate(-50%,0)",
                "-webkit-transform":"translate(-50%,0)",
                "z-index":"9999999",
                "font-size":"16px"
            })
            divDom.addClass("_myToast")
            var code = ""
            if(errCode!==undefined&&errCode!==null&&errCode!=="undefined"){
                code = "</br>错误代码:"+errCode
            }
            // divDom.html(msg+code)
            divDom.html(msg)
            $("body").append(divDom)
            setTimeout(function(){
                divDom.remove()
            },3000)
        }catch(e){

        }

    }

    $.pagination=function pagination(opts) {
        var options = $.extend({
            totalPage:100,
            selector:'#pageSwitch',
            showNum:8,
            callback:function () {
                console.log('nihao')
            }
        }, $.pagination.defaults, opts);
        var $pageswitch=$(options.selector);
        var totalPage=options.totalPage;
        var callback=options.callback;
        var showNum=options.showNum;
        var halfShowNum=showNum/2;
        var currentTagPage=1;
        var html='<div class="switch-first"><img src="./img/page_switch_first.png" alt=""></div><div class="switch-pre"><img src="./img/page_switch_pre.png" alt=""></div><div><ul></ul></div><div class="switch-next"><img src="./img/page_switch_next.png" alt=""></div><div class="switch-last"><img src="./img/page_switch_last.png" alt=""></div><div class="switch-skip">跳转到 <input type="text" value="1" class="switch-skip-input">页&nbsp;&nbsp;&nbsp;&nbsp;共&nbsp;&nbsp;<span>0</span>&nbsp;&nbsp;页</div>'
        $pageswitch.html(html)
        $pageswitch.find(".switch-first img").unbind();
        $pageswitch.find(".switch-last img").unbind();
        $pageswitch.find(".switch-next img").unbind();
        $pageswitch.find(".switch-pre img").unbind();
        $pageswitch.find(".switch-skip input").unbind();

        $pageswitch.find(".switch-skip input").removeAttr("disabled");

        $pageswitch.find("ul").html("");
        $pageswitch.find(".switch-skip input").val(1);
        $pageswitch.find(".switch-skip span").text(totalPage)
        if(totalPage>0&&totalPage<=showNum){
            html='';
            for(var i=totalPage-1;i>=0;i--){
                html+="<li>"+(totalPage-i)+"</li>"
            }
            $pageswitch.find("ul").html(html);
            $pageswitch.find("li").click(function (e,pageindex) {
                var $li,text
                if(pageindex){
                    $li=$pageswitch.find("li").eq(pageindex*1-1);
                    text=pageindex
                }else{
                    $li=$(this);
                    text=$(this).text();
                }
                $pageswitch.find(".switch-skip input").val(text);
                $li.addClass("page-current");
                $li.siblings().removeClass();
                currentTagPage=text*1;
                callback();

            })



        }else if(totalPage>showNum){
            html='';
            for(var i=showNum-1;i>=0;i--){
                html+="<li>"+(showNum-i)+"</li>"
            }
            // var html="<li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li>"
            $pageswitch.find("ul").html(html);
            $liarr=$pageswitch.find("li");
            $pageswitch.find("ul").click(function (e,pageindex) {
                var $li,text
                if(pageindex){
                    $li=$pageswitch.find("li").eq(pageindex*1-1);
                    text=pageindex
                }else{
                    $li=$(e.target);
                    text=$(e.target).text();
                }

                if((text*1)<=halfShowNum){
                    $liarr.each(function (index) {
                        $liarr.eq(index).text(index+1);
                        if(index+1==text){
                            $li=$liarr.eq(index);
                        }

                    })
                }
                if((text*1)>=(totalPage-halfShowNum)){
                    $liarr.each(function (index) {
                        $liarr.eq($liarr.length-index-1).text(totalPage-index);
                        if((totalPage-index)==text){
                            $li=$liarr.eq($liarr.length-index-1);
                        }

                    })
                }


                if((text*1)<(totalPage-halfShowNum)&&(text*1)>halfShowNum){
                    var newBegin=text*1-halfShowNum+1;
                    for(var j=0;j<$liarr.length;j++){
                        $liarr.eq(j).text(newBegin);
                        if(newBegin==text*1){
                            $li=$liarr.eq(j);

                        }
                        newBegin=newBegin+1;


                    }



                }
                $pageswitch.find(".switch-skip input").val(text);
                $li.addClass("page-current");
                $li.siblings().removeClass();
                currentTagPage=text*1;
                callback();
            })

        }



        if(totalPage==0){
            $pageswitch.find(".switch-skip input").val(0);
            $pageswitch.find(".switch-skip input").attr("disabled","disabled");
            $pageswitch.find("ul").html("")
        }else{
            $pageswitch.find(".switch-first img").click(function (e) {
                $pageswitch.find("li").eq(0).trigger("click",'1')
            })

            $pageswitch.find(".switch-last img").click(function (e) {
                $pageswitch.find("li").eq(0).trigger("click",totalPage)
            })

            $pageswitch.find(".switch-next img").click(function (e) {
                if(currentTagPage<totalPage){
                    $pageswitch.find("li").eq(0).trigger("click",currentTagPage+1)
                }
            })

            $pageswitch.find(".switch-pre img").click(function (e) {
                if(currentTagPage>1){
                    $pageswitch.find("li").eq(0).trigger("click",currentTagPage-1)
                }
            })
            $pageswitch.find(".switch-skip input").keyup(function (e) {
                if(e.keyCode==13){
                    var value=$(this).val();
                    if(_isNumber(value)&&value<=totalPage&&value>0){
                        $pageswitch.find("li").eq(0).trigger("click",value)

                    }else{
                        _showToast("请输入正确的页码：1到"+totalPage+"的数字")
                    }
                }
            })


            $pageswitch.find("li:first").addClass("page-current")
        }








    }


}));
