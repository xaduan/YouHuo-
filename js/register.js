 // 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
    var $ = require("jq");
    var cookie = require("cookie");
    cookie($);
    
    $(function(){
        new returnTop();//回到顶部
        new form();//表单验证
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
    /*表单验证*/
    var positionNum1 = 0
    var positionNum2 = 0
    var positionNum3 = 0
    var positionNum4 = 0
    var random = 0;
    var telType = 0;
    var yzmType = 0;
    var passType = 0;
    var checkType = 0;
    var allTYPE = 0;
    function form(){
        /*选择国家*/
        var _this = this;
        $("#region").on("change",_this.country);
        /*电话号码判断*/
        $("#phone-num").on("keyup",_this.tel);
        /*旋转图片验证*/
        this.picture();
        //获取短信验证码
        $(".send-captcha").on("click",_this.send);
        $(".msg-captcha").on("blur",_this.yanzhengma);
        $(".pwd").on("keyup",_this.password);
        $(".pwd").focus(_this.changeCss).blur(function(){
            $(".pwd-tips").hide();
        });
        $('#agree-terms').on("click",_this.checked);
        $("#register-btn").on("click",_this.push);
    }
    //旋转图片验证
     form.prototype.picture = function(){
         var _this = this;
         $(".img-check-pics li").eq(0).on("click",function(){
            positionNum1 = positionNum1 == -180?0:positionNum1-=60;
            $(this).css("background-positionY",positionNum1+"px");
            _this.choicePic();
        })
        $(".img-check-pics li").eq(1).on("click",function(){
            positionNum2 = positionNum2 == -180?0:positionNum2-=60;
            $(this).css("background-positionY",positionNum2+"px");
            _this.choicePic();
        })
        $(".img-check-pics li").eq(2).on("click",function(){
            positionNum3 = positionNum3 == -180?0:positionNum3-=60;
            $(this).css("background-positionY",positionNum3+"px");
            _this.choicePic();
        })
        $(".img-check-pics li").eq(3).on("click",function(){
            positionNum4 = positionNum4 == -180?0:positionNum4-=60;
            $(this).css("background-positionY",positionNum4+"px");
            _this.choicePic();
        });
     }
    //短信验证码
    form.prototype.send = function(){
        if($(".send-captcha").css("background-color") == "rgb(255, 25, 1)"){
            random = Math.floor(Math.random()*9001+1000);
            alert('您的验证码"alert"出来了：'+random);
            $(".send-captcha").css("background-color","#9a9a9a");
            var num = 60;
            this.timer = setInterval(function(){
                $(".send-captcha").val(num+"秒后可重新发送");
                if(num == 0){
                    num = 60;
                    $(".send-captcha").css("background-color","rgb(255, 25, 1)");
                    $(".send-captcha").css("cursor","pointer")
                    $(".send-captcha").val("重新获取");
                }else{
                    num--;
                    $(".send-captcha").css("cursor","default")
                }
            },1000)   
        }
    }
    //属性复位
    form.prototype.changeCss = function(){
        /*属性复位*/
        var passval = $(this).val();
        if($(this).val() == ""){
            $(".pwd-tips i").eq(0).html("&#xe65f;");
            $(".pwd-tips i").eq(0).css("color","#0080ff");
            $(".pwd-tips span").eq(0).html("密码只支持6-20位字符");
            $(".pwd-tips span").eq(0).css("color","#b9b9b9")
        }
        $(".pwd-tips").show();
    }
    //选择国家
    form.prototype.country = function(){
        var optionValue = $("#region").find("option:selected").val();
        $("#country-code").html(optionValue);
    }
    //电话验证
    form.prototype.tel = function(){
        var tel = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        var value = $(this).val();
        if(tel.test(value) == true){
             $(this).css("border-color","#dbdbdb");
             $(this).parent().find("#error").hide();
             telType = 1;
        }else{
            $(this).css("border-color","red");
            $(this).parent().find("#error").show();
            $(this).parent().find("#error span").html("号码格式不正确,请重新输入");
            telType = 0;
        } 
        if(positionNum1 == -60&&positionNum2 == 0&&positionNum3 == -180&&positionNum4 == -60){
            if($("#phone-num").css("border-color") != "red"&& telType == 1){
                $(".send-captcha").css("background","#ff1901");
                $(".send-captcha").css("cursor","pointer");
            } 
        }else{
            $(".send-captcha").css("background","#9a9a9a");
            $(".send-captcha").css("cursor","default");
        }
        /*点击判断是否可以注册*/
        form.prototype.registerBtn();
        
        
    }
    form.prototype.choicePic = function(){
        //console.log(positionNum1,positionNum2,positionNum3,positionNum4)
        if(positionNum1 == -60&&positionNum2 == 0&&positionNum3 == -180&&positionNum4 == -60){
            $(".img-check-tip").hide();
            if($("#phone-num").css("border-color") != "red"&&$("#phone-num").val()!=""){
                $(".send-captcha").css("background","#ff1901");
                $(".send-captcha").css("cursor","pointer");
            } 
        }else{
            $(".img-check-tip").show();
            $(".send-captcha").css("background","#9a9a9a");
            $(".send-captcha").css("cursor","default");
        }
    }
    //验证码
    form.prototype.yanzhengma = function(){
        var yzm = $(this).val();
        if(random != 0){
            if(yzm != random){
                $(this).css("border-color","red");
                $(this).parent().find("#error").show();
                $(this).parent().find("#error span").html("请输入正确的验证码");
                 yzmType = 0;
            }else{
                 $(this).parent().find("#error").hide();
                 $(this).css("border-color","#dbdbdb");
                 yzmType = 1;
            }
        }
        /*点击判断是否可以注册*/
       form.prototype.registerBtn();
    }
    // 判断密码输入
    form.prototype.password = function(){
        var pword = /^.{6,20}$/;
        var passValue = $(this).val();
        if(pword.test(passValue) == true){
            $(".pwd-tips i").eq(0).html("&#xe600;");
            $(".pwd-tips i").eq(0).css("color","#16dd16")
            $(".pwd-tips span").eq(0).html("密码输入正确");
            $(".pwd-tips span").eq(0).css("color","#b9b9b9");
            passType = 1;
        }else{
            $(".pwd-tips i").eq(0).html("&#xe615;");
            $(".pwd-tips i").eq(0).css("color","red");
            $(".pwd-tips span").eq(0).html("密码只支持6-20位字符");
            $(".pwd-tips span").eq(0).css("color","red");
            passType = 0;
        }
        var regNum = /\d+/;  //验证是否包含数字规则
        var regWord = /[a-zA-Z]+/;  //验证是否包含字母规则
        var regOter = /[^a-zA-Z\d]+/; //其他
        /*密码强度检测*/
        var leval = 0;
        if(regNum.test(passValue)){
            leval++;
        }
        if(regWord.test(passValue)){
            leval++;
        }
        if(regOter.test(passValue)){
            leval++;
        }
        switch(leval){
            case 0:
                $(".low ").css({"color":"#b9b9b9","background":"#e8e8e8"})
                $(".mid ").css({"color":"#b9b9b9","background":"#e8e8e8"})
                $(".high ").css({"color":"#b9b9b9","background":"#e8e8e8"})
            break;   
            case 1:
                $(".low ").css({"color":"#fff","background":"red"})
                $(".mid ").css({"color":"red","background":"#e8e8e8"})
                $(".high ").css({"color":"red","background":"#e8e8e8"})
            break;
            case 2:
                $(".low ").css({"color":"#fff","background":"yellow"})
                $(".mid ").css({"color":"#fff","background":"yellow"})
                $(".high ").css({"color":"yellow","background":"#e8e8e8"})
            break;
            case 3:
                $(".low ").css({"color":"#fff","background":"#10d910"})
                $(".mid ").css({"color":"#fff","background":"#10d910"})
                $(".high ").css({"color":"#fff","background":"#10d910"})
            break;
        }
        /*点击判断是否可以注册*/
        form.prototype.registerBtn();
    }
    form.prototype.checked = function(){
        if ($('#agree-terms').prop('checked')) {
            checkType = 1;
        }else{
            checkType = 0;
        }
         /*点击判断是否可以注册*/
        form.prototype.registerBtn();
    }
    form.prototype.registerBtn = function(){
        console.log(telType,yzmType,passType,checkType)
        if(telType == 1&&yzmType == 1&&passType == 1&&checkType == 1){
            $("#register-btn").css({"background":"#ff1901","cursor":"pointer"});
            allTYPE = 1;
        }else{
            $("#register-btn").css({"background":"#555","cursor":"default"});
            allTYPE = 0;
        }
    }
    /*提交注册信息*/
    form.prototype.push = function(){
        if(allTYPE == 1){
            /*注册成功后页面跳转*/
            
            /*存取你的账号密码*/
            var user = $('#phone-num').val();
            var password = $('.pwd').val();
            $.ajax({
                url:'http://datainfo.duapp.com/shopdata/userinfo.php',
                type:'post',
                data:{
                    status:"register",
                    userID:user,
                    password:password
                },
                success:function(res){
                    switch(res){
                        case '0':
                            $(".tel-error").show();
                            $(".tel-error span").html("该用户已被注册");
                            $(".phone-num").css("border-color","red");
                            break;
                        case '1':
                            $.cookie('user',user,{path: "/", expires: 1});
                            $(".register-page ul").hide();
                            $(".Congratulations").show();
                            var num = 4;
                            this.timer = setInterval(function(){
                                $(".Congratulations .time").html(num);
                                if(num == 0){
                                    window.location.href = "index.html";
                                }else{
                                    num--;
                                }
                            },1000);
                            break;
                        case '2':
                            alert("数据库出错")
                            break;
                    }
                }
            }) 
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});







