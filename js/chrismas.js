 // 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
    var $ = require("jQuery"); 
    var cookie = require("cookie");
    cookie($);
    $(function(){
        new topNav();//顶部导航栏
        new wrapNav();//内容区导航
        new returnTop();//回到顶部
        new navShow();//悬浮窗显示
        new login();
        new miniCart();//mini购物车
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
    /*检测是否为登录状态*/
    function login(){
        var _this = this;
        var cookie = $.cookie("user");
        if(cookie){
             $("#topNavRight li").eq(0).html("Hi~ "+cookie+'<span class="tuichu">[退出]</span>')
        }
       $("#topNavRight li").eq(0).on("click",".tuichu",_this.loginyes)
    }
    //退出
    login.prototype.loginyes = function(){
        $.cookie("user", null,{path:"/",expries:1});
        $("#topNavRight li").eq(0).html('Hi~[<a href="login.html" class="login">请登录</a>][<a href="register.html" class="register">免费注册</a>]')
    }
    
    var arr=[];
    var arr2=[];
    var goodsNum = 0;
    function miniCart(){
       var _this = this;
       var cookies = $.cookie("goodsDetails");
       if(cookies!=""&&cookies!=null){
           $(".goods-num-tip").show(); 
           arr = cookies.split("#");
           arr.pop();
           //获取每段商品的全部信息；
           for(var j = 0;j<arr.length;j++){
               var a = arr[j].split("|");
               arr2.push(a);
           }
          var html = "";
           for(var i=0;i<arr2.length;i++){
               goodsNum+=parseInt(arr2[i][3]);
                html+='<div class="goods-item">'
                html+='<div class="goods-img">'
                html+='<a href="javascript:;">'
                html+='<img src="'+arr2[i][1]+'" alt="">'
                html+='</a>'
                html+='</div>'
                html+='<div class="goods-info">'
                html+='<p class="title">'+arr2[i][0]+'</p>'
                html+='<p>尺码：<span class="size">'+arr2[i][2]+'</span></p>'
                html+='</div>'
                html+='<div class="goods-price">'
                html+='<p>'
                html+='<span class="price">'+arr2[i][4]+'</span> x <span class="num">'+arr2[i][3]+'</span>'
                html+='</p>'
                html+='<p>'
                html+='<span id="delete"><a href="javascript:;" style="color:#000;padding:2px 4px;background:#eee;">删除</a></span>'
                html+='</p>'
                html+='</div>'
                html+='</div>' 
           }
           $(".goods-num-tip").html(goodsNum);
           $("#goods-item").html(html);
            console.log(arr2);
           
           $(".go-cart").on("click","#delete",_this.delete);  
       }else{
           $(".goods-num-tip").hide();
           $(".rich-cart").hide();
           $(".cart-null").show(); 
       }
        $(".go-cart").on("mouseenter",function(){
            $(".mini-cart-wrapper").show();
        }).on("mouseleave",function(){
             $(".mini-cart-wrapper").hide();
        })   
    }  
    miniCart.prototype.delete = function(){
        $(this).parent().parent().parent().remove();
        miniCart.prototype.TestingCartNull();
        var Index = $(this).parent().parent().parent().index();
        arr2.splice(Index,1);
        miniCart.prototype.changeCookie();
        goodsNum = 0;
         for(var i=0;i<arr2.length;i++){
             goodsNum+=parseInt(arr2[i][3]);
         }
       $(".goods-num-tip").html(goodsNum);
    }
    miniCart.prototype.TestingCartNull = function(){
        console.log($(".go-cart").find(".goods-item").length)
        if($(".go-cart").find(".goods-item").length == 0){
            $(".rich-cart").hide();
            $(".cart-null").show();
            $(".goods-num-tip").hide();
        } 
    }
    miniCart.prototype.changeCookie = function(){
        var strCookie = "";
        for(var i = 0;i<arr2.length;i++){
          strCookie+=arr2[i].join("|");
            strCookie+="#";
        }
        $.cookie("goodsDetails",strCookie,{path:"/",expries:1});
    }
    
    
    
    
});







