 // 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
  var $ = require("jQuery"); 
    $(function(){
        new topNav();//顶部导航栏
        new wrapNav();//内容区导航
        new returnTop();//回到顶部
        new menu();//三级菜单
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
    
    /*三级菜单*/
    
    function menu(){
        /*点击选中菜单*/
        $(".product-list-nav .sort-child-list li").on("click",function(){
            $(".product-list-nav .sort-child-list li").removeClass("active");
            $(this).addClass("active");
        });
        $(".product-list-nav h3").on("click",function(){
            $(this).siblings().slideToggle();
            //$(this).find("span").css({"transition":"all .5s","transform":"rotate(90deg)"});
            $(this).find("span").toggleClass("rotate");
        })
    }
    /*夹克筛选*/
    new section();
    function section(){
        /*正则判断输入价格是否合适*/
        var storage=window.sessionStorage;
        
        
        
        var sessionNum = storage.getItem("number") == null?0:parseInt(storage.getItem("number"));
       console.log(sessionNum)
        
        
        $(".ud-price-range .limit").on("keyup",function(){
            var reg = /^\d{1,5}$/;
            var val = $(this).val();
            if(!reg.test(val)){
                $(".ud-price-range .limit").val("");
                $(".price-sure").hide();
            }else{
                $(".price-sure").show();
            }
        });
        $(".sort-pager .checks").on("click",function(){
            $(".sort-pager .checks").removeClass("checked");
            $(".sort-pager .checks span").html("&#xe646;");
            $(this).addClass("checked");
            $(this).find("span").html("&#xe653;");
        })
        /*选择商品排序方式*/
        var arr = [];
        var arrNum = [];
        
        
        for(var i=0;i<storage.length;i++){
            var key=storage.key(i);//使用key()方法，向其中出入索引即可获取对应的键
            var value=storage.getItem(key);
            var arr2 = value.split("|");
            arr.push(key);
            arr.push(arr2);
            arrNum.push(arr2[1]);
        } 
        
        //console.log(arrNum)
        
        $(".sort-type").on("click",function(){
            storage.setItem("number",sessionNum);
            sessionNum++;
            $(".sort-type").removeClass("active");
            $(this).addClass("active");
            if(!window.localStorage){
                alert("浏览器不支持SessionStorage");            
            }else{
                var storage=window.sessionStorage;
                var spanHtml = $(this).find("span").html();
                var spanId = $(this).find("span").attr('id');
                var Index = $(this).index();
                console.log(Index);
               
                /*改变元素的id*/
                if(spanHtml != ""){/*排除掉第一个span元素*/
                    if(spanId == ""){
                        $(this).find("span").attr('id','xia');
                        $(".sort-type span").html("&#xe610;");
                        $(this).find("span").html("&#xe6e5;");
                        $(".sort-type span").eq(0).html("");
                        
                    }else if(spanId == "xia"){
                        $(this).find("span").attr('id','shang');
                        $(".sort-type span").html("&#xe610;");
                        $(this).find("span").html("&#xe609;");
                        $(".sort-type span").eq(0).html("");
                        
                    }else if(spanId == "shang"){
                        $(this).find("span").attr('id','xia');
                        $(".sort-type span").html("&#xe610;");
                        $(this).find("span").html("&#xe6e5;");
                        $(".sort-type span").eq(0).html("");
                       
                    }   
                }else{
                    $(".sort-type span").attr('id',"");
                    $(".sort-type span").html("&#xe610;");
                    $(".sort-type span").eq(0).html("");
                    
                }
                 /*写入storage*/
                var id = $(this).find("span").attr('id');
                storage.setItem(Index,id+"|"+sessionNum);
            }
        })
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});







