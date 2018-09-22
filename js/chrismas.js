 // 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
  var $ = require("jQuery"); 
    $(function(){
        new topNav();//顶部导航栏
        new wrapNav();//内容区导航
        new returnTop();//回到顶部
        new navShow();//悬浮窗显示
    })
    //顶部导航栏
    function topNav(){
        var _this = this;
        this.arr = ["集团官网","男生潮流","女生潮流","物趣分享","潮流嘉年华"];
        this.arr2 = ["YOHO!","BOYSYOHO!","GIRLSYOHO!","YOHO!SHOW","YO'HOOD"];
        $("#topNavLeft").mouseenter(function(){
            $(this).css("background","#dcdcdc");
            $(".groupList").show();
        }).mouseleave(function(){
            $(this).css("background","#f4f4f4");
            $(".groupList").hide();
        })

        $(".groupList li").each(function(index){
            $(".groupList li").eq(index).mousemove(function(){
                $(this).html(_this.arr[index])
            }).mouseout(function(){
                $(this).html(_this.arr2[index])
            })    
        })
         $("#topNavRight .bgNone").on("mousemove",function(){
             $(this).find(".appDownload").show();
         }).on("mouseout",function(){
             $(this).find(".appDownload").hide();
         })
         $(".headNav li").click(function(){
            $(".headNav li").removeClass("cure");
            $(this).addClass("cure");
        })
    }
    //内容区导航
    function wrapNav(){
        $("#wrapNavContent li").mouseenter(function(){
            $("#wrapNavContent li a").css("border-bottom","0");
            $(this).find(".borderBottom").css("border-bottom","2px solid #fff");
            $(this).find(".third").show();
        }).mouseleave(function(){
            $("#wrapNavContent li a").css("border-bottom","0");
            $(this).find(".third").hide();
        });
        $(".third dd a").hover(function(){
            $(this).css("text-decoration","underline").siblings().css("text-decoration","none");
        },function(){
            $(this).css("text-decoration","none");
        }) 
    }
    /*回到顶部*/
    function returnTop(){
        var _this = this;
        var Height = document.body.scrollTop || document.documentElement.scrollTop;
        //console.log(Height)
        if(Height >= 100){
                $("#return-top").fadeIn();
            }else{
                $("#return-top").fadeOut();
            }
         
        $(window).on("scroll",_this.windowScroll);
        
        $("#return-top").click(function(){
             $('body,html').animate({ scrollTop: 0 },300);
        })
    }
    returnTop.prototype.windowScroll = function(){
        var height = document.body.scrollTop || document.documentElement.scrollTop;
        if(height >= 100){
            $("#return-top").fadeIn();
        }else{
            $("#return-top").fadeOut();
        }
    }
    function navShow(){
        var _this = this;
        var height = document.body.scrollTop || document.documentElement.scrollTop;
        var showHeight = $("#a_01").offset().top;
        var rightShowHeight = $("#banner-box").offset().top;
        if(height >= rightShowHeight){
            $(".wrap_right").show(); 
        }else{
            $(".wrap_right").hide();
        }
        if(height >= showHeight){
            $("#float_nav").show(); 
        }else{
            $("#float_nav").hide();
        }
        $(window).on("scroll",_this.windowScroll);
    }
    navShow.prototype.windowScroll = function(){
        var height = document.body.scrollTop || document.documentElement.scrollTop;
        var showHeight = $("#a_01").offset().top; 
        var rightShowHeight = $("#banner-box").offset().top;
        if(height >= rightShowHeight){
            $(".wrap_right").show(); 
        }else{
            $(".wrap_right").hide();
        }
        if(height >= showHeight){
            $("#float_nav").show(); 
        }else{
            $("#float_nav").hide();
        } 
    }
    /*取消所有的area点击后的边框*/
    $.each($("area"),function(i,val){
　　　　$(val).attr({"onfocus":"blur(this)"});
　　})
    
    
    
    
    
    
    
    
});







