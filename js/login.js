 // 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
    var $ = require("jq");
    var cookie = require("cookie");
    cookie($);
    
    $(function(){
        //回到顶部
        new returnTop();
        //切换验证部分
        var checkC = new checkCountry();
        checkC.showEWM();
        checkC.country();
        checkC.loginType();
        //登录部分
        new loginIn();
       
    })
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
   
    function checkCountry(){
        var _this=this;
        $("#country-code").on("click",_this.checkCountry)
        $("#account2").on("keyup",_this.daxie)  
    }
    //显示二维码
    checkCountry.prototype.showEWM = function(){
        $(".content-ul .li1 .ma1").hover(function(){
            $(".content-ul .li1 .saoma").show().stop().animate({"right":40})
        },function(){
            $(".content-ul .li1 .saoma").stop().animate({"right":-80})
        });
    }
    //切换国家
     checkCountry.prototype.checkCountry = function(event){
          var e = event || window.event
             if ( e && e.stopPropagation ) {
                e.stopPropagation();
            } else {
                window.event.cancelBubble = true;
            }
          $("#country-list").stop().slideToggle();
     }
     checkCountry.prototype.country = function(){
          $("#country-code").on("click","li",function(){
              $("#country-code em").html($(this).html())
         })
         $(document).click(function(){
             $("#country-list").stop().slideUp();
         });
     }
     //切换登录方式
    checkCountry.prototype.loginType = function(){
        $(".login-type p").click(function(){
            $(this).addClass("action").siblings().removeClass("action")
        });
        $(".password-login").on("keyup","#account1",function(){
            $(this).siblings().hide();
        })
    }
    //检测大写输入
    checkCountry.prototype.daxie = function(){
        $(".password-login .error").eq(1).hide();
        var val = $(this).val();
        var reg = /[A-Z]/;
        if(reg.test(val)){
            $(".daxie").show();
        }else{
            $(".daxie").hide();
        }
    }
    var remeverNum = 1;
    function loginIn(){
        var _this = this;
        $("#login-btn").on('click',_this.btnClick);
        $(".remeber-me i").click(_this.remeber)
        
    }
    //是否七天内免登陆
    loginIn.prototype.remeber = function(){
        if(remeverNum == 1){
            $(this).html("&#xe653;");
            remeverNum = 2;
        }else{
             $(this).html("&#xe645;");
            remeverNum = 1;
        }
    }
    /*登录*/
    loginIn.prototype.btnClick = function(){
        var user = $('#account1').val();
        var password = $('#account2').val();
        $.ajax({
            url:'http://datainfo.duapp.com/shopdata/userinfo.php',
            type:'post',
            data:{
                status:"login",
                userID:user,
                password:password
            },
            success:function(res){
                switch(res){
                    case '0':$('#con').html('用户不存在');
                        $(".password-login .error").eq(0).show();
                         $(".password-login .error").eq(1).hide();
                        $(".password-login .error").eq(0).find("em").html("该用户不存在");
                  break;
                    case '2':
                        $(".password-login .error").eq(1).show();
                        if(password == ""){
                            $(".password-login .error").eq(1).find("em").html("密码不能为空");
                             $(".daxie").hide();
                        }else{
                            $(".password-login .error").eq(1).find("em").html("您输入的密码输入错误");
                             $(".daxie").hide();
                        }
                        break;
                    default:
                        if(user == ""){
                            $(".password-login .error").eq(0).show();
                            $(".password-login .error").eq(0).find("em").html("用户名不能为空");
                        }else{
                             $(".password-login .error").eq(0).hide();
                             //页面跳转，存储cookie
                             $.cookie('user',user,{path: "/", expires: 1});
                             window.location.href = "index.html";
                        }
                }
            }
        })
    }
    
    //切换二维码登录方式
    new choiceEWM();
    var ewmNum = 1;      
    function choiceEWM(){
        $(".ma1").click(function(){
            if(ewmNum == 1){
                ewmNum = 2;
                $(".content-ul li").hide();
                $(".content-ul #box").show();
                $(this).css("background","url(images-login/ma2_04.jpg)no-repeat center");
                $(this).siblings().css("background","url(images-login/ma2_03.jpg)no-repeat center");
            }else{
                ewmNum = 1;
                $(".content-ul #box").hide();
                $(".content-ul li").show();
                $(this).css("background","url(images-login/ma_04.jpg)no-repeat center");
                $(this).siblings().css("background","url(images-login/ma_03.gif)no-repeat center");
            }   
        })
        $(".show-ewm").mouseenter(function(){
            $(this).find(".left").stop().animate({"left":0},300,function(){
                 $(".show-ewm .right").show();
            });  
        }).mouseleave(function(){
             $(".show-ewm .right").hide();
             $(this).find(".left").stop().animate({"left":67},300); 
        })
    }
  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});







