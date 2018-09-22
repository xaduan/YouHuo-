 // 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
  var $ = require("jQuery"); 
    $(function(){
        new topNav();//顶部导航栏
        new wrapNav();//内容区导航
        new banner();//轮播图
        new preferance();//商标滚动
        new goodsWrap();//ajax请求
        new feedback();//小调查
        new returnTop();//回到顶部 
    })
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
    }
    
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
        $(".headNav li").click(function(){
            $(".headNav li").removeClass("cure");
            $(this).addClass("cure");
        }) 
    }
    var num = 0,number = $(".slideWrapper li").length;
    function banner(){
        var _this = this;
        $(".slideWrapper li").eq(0).show();
        $(".fixWrapper li a").eq(0).hide();
        number = $(".slideWrapper li").length;
        this.timer = setInterval(_this.Interval,3000);
        $(".fixWrapper li a").on("mouseenter",this.aEnter);
        $("#banner").mouseover(function(){
            clearInterval(_this.timer)
        }).mouseout(function(){
            _this.timer = setInterval(_this.Interval,3000);
        });
        $(".slideSwitch .prev").click(function(){
            if(num == 0){
                num = 7;
            }else{
                num--;    
            }
            _this.tab();
        }).mouseenter(function(){
            $(this).animate({"opacity":1},300)
        }).mouseleave(function(){
            $(this).animate({"opacity":0.55},300);
        })
        $(".slideSwitch .next").click(function(){
            _this.Interval();
        }).mouseenter(function(){
            $(this).animate({"opacity":1},300)
        }).mouseleave(function(){
            $(this).animate({"opacity":0.55},300);
        })
    }
    banner.prototype.aEnter = function(){
        var index = $(this).parent().index();
        $(".fixWrapper li a").show();
        $(".fixWrapper li a").eq(index).hide();
        num = index-1;
        banner.prototype.Interval();
    }
    banner.prototype.Interval = function(){
        if(num == number-1){
            num = 0;
        }else{
            num++;
        }
        banner.prototype.tab();
    }
    banner.prototype.tab = function(){
        $(".fixWrapper li a").show();
        $(".slideWrapper li").eq(num).stop().fadeIn(600).siblings().stop().fadeOut(600);
        $(".fixWrapper li a").eq(num).hide();
    }
    
    function preferance(){
        var _this = this;
        this.timer = setInterval(_this.Interval,3000);
        $(".img-brand").mousemove(function(){
            clearInterval(_this.timer);
            $(".img-switch a").show();
        }).mouseout(function(){
            _this.timer = setInterval(_this.Interval,3000);
             $(".img-switch a").hide();
        })
        $(".img-switch").children().hover(function(){
            $(this).animate({"opacity":1});
        },function(){
            $(this).animate({"opacity":0.55})
        });
        $(".img-switch .next").click(function(){
            _this.rightClick();
        })
        $(".img-switch .prev").click(function(){
            _this.Interval();
        })
        
        
        this.switchLogo();//第一次渲染
        $(".logo-switch a").on("click",function(){
            $(".logo-brand .logo").css("opacity",0); 
            $(".logo-brand .logo").stop().animate({"opacity":1},800);
            _this.switchLogo();//第二次渲染
        })
    }
    var timeNum = 0;
    preferance.prototype.rightClick = function(){/*此处有bug*/
        //console.log($(".img-brand ul").css("left"))
        if(timeNum >= 0){
            timeNum = -2316;
            $(".img-brand ul").css("left","-3474px");
            $(".img-brand ul").stop().animate({"left":timeNum+"px"},300);
        }else{
            timeNum+=1158;
            $(".img-brand ul").stop().animate({"left":timeNum+"px"},300);
        }
    }
   
    preferance.prototype.Interval = function(){
        if(timeNum <= -3474){
            timeNum = -1158;
            $(".img-brand ul").css("left",0);
            $(".img-brand ul").stop().animate({"left":timeNum+"px"},300);
        }else{
            timeNum-=1158;
            $(".img-brand ul").stop().animate({"left":timeNum+"px"},300);
        }
    }
    var num1 = 16;
    var index = 0;
    preferance.prototype.switchLogo = function(){
        $.ajax({
            url:"json/logo.json",
            type:"get",
            success:function(data){ 
                if(index == 16){
                    index = 0;
                    num1 = 16;
                }else{
                    index+=16;
                    num1+=16;
                }
                for(var i = index;i<num1;i++){
                    if(num1 == 16)
                    $(".logo-brand .logo a img").eq(i).attr("src",data[i].src);
                    if(num1 == 32)
                    $(".logo-brand .logo a img").eq(i-16).attr("src",data[i].src);
                } 
               
            }
        })
    }
    
    function goodsWrap(){
        $.ajax({
            url:"json/goods-wrap.json",
            type:"get",
            success:function(data){
                var html = "";
                for(var i = 0;i<data.length;i++){
                    html+='<div class="good-info">'
                    html+='<div class="tag-container clearfix"></div>'
                    html+='<div class="good-detail-img">'
                    html+='<a href="javascript:;" class="good-thumb"><img src='+data[i].src+' alt=""></a>'
                    html+='</div>'
                    html+='<div class="good-detail-text">'
                    html+='<a href="javascript:;">'+data[i].text+'</a>'
                    html+='<p class="price">'
                    html+='<span>'+data[i].price+'</span>'
                    html+='</p>'
                    html+='</div>'
                    html+='</div>'
                }
                $(".goods-container").html(html);
            },
            error:function(){
                alert("请求失败")
            }    
        })
    };
    //意见反馈卡
    var NMU = 0,NUM2 = 0,NUM3 = false;
    function feedback(){
        NMU = 0;
        NUM2 = 0;
        NUM3 = false;
        var _this = this;
        $(".center-content dd .item-nav span").on("click",_this.dotClick)
        $(".center-content dd .button").on("click",_this.btnClick)
        $(".select li").eq(2).find(".button").click(function(){
           if(NUM3 == true&&$(".select li textarea").val() != ""){
               alert("感谢你的参与！");
           }
        })    
    }
   feedback.prototype.dotClick = function(){
       //console.log(NMU)
       NMU = $(this).index();
        NUM2 = $(this).index();
        $(".center-content .page-center .item-nav span").eq(NMU).addClass("black").siblings().removeClass("black");
        $(".center-content .page-center li").eq(NMU).show().siblings().hide();
   }
   feedback.prototype.btnClick = function(){
       //console.log(this)
       var _this = this;
       if(NUM2 == 2){
                NUM2 = 2;
            }else{
                if(NUM2 == 0){
                    //console.log($(".select input").length)
                    $(".select input").each(function(i){
                        //console.log(i)
                        if(i<5){
                            if($(".select input").eq(i).is(':checked') == true){
                                //console.log($(this).parent().parent().parent().parent())
                                $(this).parent().parent().parent().parent().hide();
                                $(this).parent().parent().parent().parent().next().show();
                               NUM2++;
                            }   
                        }
                    })
                }
                if(NUM2 == 1){
                    //console.log($(".select input").length)
                    $(".select input").each(function(i){
                        //console.log(i)
                        if(i>=5){
                            if($(".select input").eq(i).is(':checked') == true){
                                //console.log($(this).parent().parent().parent().parent())
                                $(this).parent().parent().parent().parent().hide();
                                $(this).parent().parent().parent().parent().next().show();
                                NUM2++;
                                 NUM3 = true;
                            }   
                        }
                    })
                }    
            }
            $(".center-content .page-center .item-nav span").eq(NUM2).addClass("black").siblings().removeClass("black");
   }        
    
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
    
    
    
    
    
    
    
    
    
    
    
    
    
});







