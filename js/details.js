 // 所有模块都通过 define 来定义
 define(function (require, exports, module) {

     // 通过 require 引入依赖
     var $ = require("jQuery");
     var cookie = require("cookie");
     cookie($);
     var arr = [];
     var arr2 = [];
     var goodsNum = 0;
     $(function () {
             new topNav(); //顶部导航栏
             new wrapNav(); //内容区导航
             new returnTop(); //回到顶部
             new login(); //检测登录状态
             new detailTab(); //数据切换预加载
             var ajax = new imgAjax(); //ajax加载放大镜图片
             ajax.ajaxGet();
             new selectGoods(); //筛选尺码数量
             new miniCart(); //mini购物车
             new shopCart(); //添加购物车
         })
         //顶部导航栏
     function topNav() {
         var _this = this;
         this.arr = ["集团官网", "男生潮流", "女生潮流", "物趣分享", "潮流嘉年华"];
         this.arr2 = ["YOHO!", "BOYSYOHO!", "GIRLSYOHO!", "YOHO!SHOW", "YO'HOOD"];
         $("#topNavLeft").mouseenter(function () {
             $(this).css("background", "#dcdcdc");
             $(".groupList").show();
         }).mouseleave(function () {
             $(this).css("background", "#f4f4f4");
             $(".groupList").hide();
         })

         $(".groupList li").each(function (index) {
             $(".groupList li").eq(index).mousemove(function () {
                 $(this).html(_this.arr[index])
             }).mouseout(function () {
                 $(this).html(_this.arr2[index])
             })
         })
         $("#topNavRight .bgNone").on("mousemove", function () {
             $(this).find(".appDownload").show();
         }).on("mouseout", function () {
             $(this).find(".appDownload").hide();
         })
         $(".headNav li").click(function () {
             $(".headNav li").removeClass("cure");
             $(this).addClass("cure");
         })
     }
     //内容区导航
     function wrapNav() {
         $("#wrapNavContent li").mouseenter(function () {
             $("#wrapNavContent li a").css("border-bottom", "0");
             $(this).find(".borderBottom").css("border-bottom", "2px solid #fff");
             $(this).find(".third").show();
         }).mouseleave(function () {
             $("#wrapNavContent li a").css("border-bottom", "0");
             $(this).find(".third").hide();
         });
         $(".third dd a").hover(function () {
             $(this).css("text-decoration", "underline").siblings().css("text-decoration", "none");
         }, function () {
             $(this).css("text-decoration", "none");
         })
     }
     /*回到顶部*/
     function returnTop() {
         var _this = this;
         var Height = document.body.scrollTop || document.documentElement.scrollTop;
         //console.log(Height)
         if (Height >= 100) {
             $("#return-top").fadeIn();
         } else {
             $("#return-top").fadeOut();
         }

         $(window).on("scroll", _this.windowScroll);

         $("#return-top").click(function () {
             $('body,html').animate({
                 scrollTop: 0
             }, 300);
         })
     }
     returnTop.prototype.windowScroll = function () {
             var height = document.body.scrollTop || document.documentElement.scrollTop;
             if (height >= 100) {
                 $("#return-top").fadeIn();
             } else {
                 $("#return-top").fadeOut();
             }
         }
         /*ajax请求*/
     function imgAjax() {
         var _this = this;
         $("#moveBox .wrap").mousemove(_this.boxMove)
         $("#moveBox .wrap").mouseout(function () {
             $(".move-box").hide();
             $(".show-box").hide();
         });
         $(".thumb-wrap img").mouseenter(function () {
             $("#moveBox img").attr("src", $(this).attr("src"))
         })

     }
     imgAjax.prototype.ajaxGet = function () {
         var cookieIndex = parseInt($.cookie("imgIndex"));
         $.ajax({
             url: "json/goods-list.json",
             type: "get",
             success: function (data) {
                 //console.log(data[cookieIndex]);
                 $(".path-nav .last").html(data[cookieIndex].text)
                 $(".infos .name").html(data[cookieIndex].text)
                 $(".infos .brand-name").html(data[cookieIndex].brand)
                 $(".market-price .price").html(data[cookieIndex].price)
                 $(".img .img-show").attr("src", data[cookieIndex].src)
                 $(".thumb-wrap img").eq(0).attr("src", data[cookieIndex].src)
                 $(".thumb-wrap img").eq(1).attr("src", data[cookieIndex].src2)
                 $(".colors .focus img").attr("src", data[cookieIndex].src2)
             },
             error: function () {
                 alert("请求失败");
             }
         });
     }



     /*放大镜*/
     imgAjax.prototype.boxMove = function () {
         $(".move-box").show();
         $(".show-box").show();
         $(".show-box img").attr("src", $("#moveBox img").attr("src"))
         var e = event || window.event;
         var mouX = (e.offsetX || e.layerX) - $(".move-box")[0].offsetWidth / 2;
         var mouY = (e.offsetY || e.layerY) - $(".move-box")[0].offsetHeight / 2;
         if (mouX <= 0) {
             mouX = 0;
         } else if (mouX >= $(".img")[0].clientWidth - $(".move-box")[0].offsetWidth) {
             mouX = $(".img")[0].clientWidth - $(".move-box")[0].offsetWidth
         }
         if (mouY <= 8) {
             mouY = 8;
         } else if (mouY >= $(".img")[0].clientHeight - $(".move-box")[0].offsetHeight - 8) {
             mouY = $(".img")[0].clientHeight - $(".move-box")[0].offsetHeight - 8;
         }
         var proportionX = mouX / ($(".img")[0].offsetWidth - $(".move-box")[0].offsetWidth);
         var proportionY = mouY / ($(".img")[0].offsetHeight - $(".move-box")[0].offsetHeight);
         var left = -proportionX * ($(".show-box img")[0].offsetWidth - $(".show-box")[0].offsetWidth);
         var top = -proportionY * ($(".show-box img")[0].offsetHeight - $(".show-box")[0].offsetHeight);
         //console.log(top)

         $(".show-box img").css("left", left)
         $(".show-box img").css("top", top)

         //console.log(proportionX)
         $(".move-box").css("left", mouX);
         $(".move-box").css("top", mouY);
     }


     /*检测是否存在登录状态*/
     function login() {
         var _this = this;
         var cookie = $.cookie("user");
         if (cookie) {
             $("#topNavRight li").eq(0).html("Hi~ " + cookie + '<span class="tuichu">[退出]</span>')
         }
         $("#topNavRight li").eq(0).on("click", ".tuichu", _this.loginyes)
     }
     login.prototype.loginyes = function () {
         $.cookie("user", null);
         $("#topNavRight li").eq(0).html('Hi~[<a href="login.html" class="login">请登录</a>][<a href="register.html" class="register">免费注册</a>]')
     }

     function detailTab() {
         var _this = this;
         $(".block-title span").eq(2).click(function () {
             $(".description-content").stop().slideUp();
             $(".material-content").stop().slideDown();
             $(this).addClass("cur").siblings().removeClass("cur");
         });
         $(".block-title span").eq(0).click(function () {
             $(".description-content").stop().slideDown();
             $(".material-content").stop().slideUp();
             $(this).addClass("cur").siblings().removeClass("cur");
         });
         $(document).on("scroll", function () {
             var top = document.body.scrollTop || document.documentElement.scrollTop;
             if (top >= 770) {
                 _this.loginAjax();
             }
         });
         $(".img-red").on("click", _this.youhuiShow)
         $(".coupon-big .close i").on("click", _this.youhuiHide);

     }
     detailTab.prototype.loginAjax = function () {
             $.ajax({
                 url: "json/detail.json",
                 type: "get",
                 success: function (data) {
                     var html = "";
                     for (var i = 0; i < data.length; i++) {
                         html += "<img src=" + data[i].src + ">";
                     }
                     $("#imgBox").html(html);
                 },
                 error: function () {
                     alert("请求失败");
                 }
             })
         }
    /*优惠券*/
     detailTab.prototype.youhuiHide = function () {
         $(".coupon-big").hide();
         $("#bodyWrap").hide();
     }
     detailTab.prototype.youhuiShow = function () {
             $("#bodyWrap").show();
             var height = $("body").css("height");
             var width = $("body").css("width");
             $("#bodyWrap").css({
                 "height": height,
                 "width": width,
                 "position": "absolute",
                 "top": 0,
                 "left": 0,
                 "opacity": .5
             })
             $(".coupon-big").show();
         }
         
     var selectNum = 0;
     /*数量加减*/    
     function selectGoods() {
         var _this = this;
         $(".size-wrapper .select").on("click", _this.selected)
         $(".minus-plus i").click(_this.Iclick);
         $(".minus-plus i").eq(0).click(_this.Iclick0);
         $(".minus-plus i").eq(1).click(_this.Iclick1);
     }
     selectGoods.prototype.selected = function () {
         selectNum = 1;
         $(this).css({
             "background": "#000",
             "color": "#fff"
         }).siblings().css({
             "background": "#fff",
             "color": "#000"
         });
         $(".warn-tip").css("color", "#e01")
     }
     selectGoods.prototype.Iclick = function (event) {
         if (selectNum == 0) {
             $(".warn-tip").show();
         } else {
             $(".warn-tip").hide();
         }
         var e = event || window.event;
         if (e && e.preventDefault) {
             e.preventDefault();
         } else {
             window.event.returnValue = false;
         }
         return false;
     }
     selectGoods.prototype.Iclick0 = function () {
         if (selectNum == 1) {
             var num = parseInt($("#num").html());
             if (num < 9) {
                 $(".minus-plus i").eq(1).css("color", "#333");
                 num++;
                 $("#num").html(num);
             } else {
                 $(this).css("color", "#999");
                 $("#num").html(10);
                 $(".minus-plus i").eq(1).css("color", "#333");
             }
         }
     }
     selectGoods.prototype.Iclick1 = function () {
             var num = parseInt($("#num").html());
             //console.log(num)
             if (num != 1) {
                 $(this).css("color", "#333");
                 $(".minus-plus i").eq(0).css("color", "#333");
                 num--;
                 $("#num").html(num);
             } else {
                 $(this).css("color", "#999");
                 $(".minus-plus i").eq(0).css("color", "#333");
             }
         }
         

     var sizeIndex;
     var cookies = $.cookie("goodsDetails") == null ? "" : $.cookie("goodsDetails");
     /*添加购物车*/
     function shopCart() {
         //console.log(arr2)
         $("#add-to-cart").on("click", function () {
             $(".goods-num-tip").html(goodsNum);
             if (selectNum == 0) {
                 $(".warn-tip").show();
             } else {
                 $(".trade-content").slideUp();
                 $(".shopCart").slideDown();
                 //存取cookie
                 var title = $(".infos .name").html();
                 var size = $(".size-wrapper .select").eq(sizeIndex).html();
                 var src = $(".colors .focus img").attr("src");
                 var num = $("#num").html();
                 var price = $(".market-price .price").html();
                 cookies += title + "|" + src + "|" + size + "|" + num + "|" + price + "#"
                 $.cookie("goodsDetails", cookies, {
                     path: "/",
                     expires: 1
                 })
                 //渲染mini购物车
                 var arrNew = [title,size];
                 $(".goods-num-tip").show();
                 $(".rich-cart").show();
                 $(".cart-null").hide();
                 //购物车查重
                 var newCookie = $.cookie("goodsDetails");
                 console.log(newCookie)
                 var Arr=[];
                 var Arr2=[];
                 Arr = newCookie.split("#");
                 Arr.pop();
                 //获取每段商品的全部信息；
                 for (var j = 0; j < Arr.length; j++) {
                     var a = Arr[j].split("|");
                     Arr2.push(a); 
                 }
                 var cookieIndex = [];
                 for(var n = 0;n<Arr2.length;n++){
                     if(arrNew[0]==Arr2[n][0]&&arrNew[1]==Arr2[n][2]){
                         cookieIndex.push(n)
                     }
                 }
                 if(cookieIndex.length>1){
                     console.log(cookieIndex[1])
                     //有重复添加的商品
                     Arr2.splice(cookieIndex[1],1);
                     //需要替换的值
                     var newAllNum = parseInt(Arr2[cookieIndex[0]][3])+parseInt($("#num").html());
                     Arr2[cookieIndex[0]].splice(3,1,newAllNum);
                     
                 }
                 console.log(Arr2)
                 console.log(cookieIndex)
                 var strCookies = "";
                 for(var i = 0;i<Arr2.length;i++){
                    strCookies+=Arr2[i].join("|");
                    strCookies+="#";
                 }
                 $.cookie("goodsDetails",strCookies,{path:"/",expries:1});

                 //初始化渲染
                 var html = "";
                 goodsNum=0;
                 for (var i = 0; i < Arr2.length; i++) {
                     goodsNum += parseInt(Arr2[i][3]);
                     html += '<div class="goods-item">'
                     html += '<div class="goods-img">'
                     html += '<a href="javascript:;">'
                     html += '<img src="' + Arr2[i][1] + '" alt="">'
                     html += '</a>'
                     html += '</div>'
                     html += '<div class="goods-info">'
                     html += '<p class="title">' + Arr2[i][0] + '</p>'
                     html += '<p>尺码：<span class="size">' + Arr2[i][2] + '</span></p>'
                     html += '</div>'
                     html += '<div class="goods-price">'
                     html += '<p>'
                     html += '<span class="price">' + Arr2[i][4] + '</span> x <span class="num">' + Arr2[i][3] + '</span>'
                     html += '</p>'
                     html += '<p>'
                     html += '<span class="delete-goods"><a href="javascript:;" style="color:#000;padding:2px 4px;background:#eee;">删除</a></span>'
                     html += '</p>'
                     html += '</div>'
                     html += '</div>'
                 }

                 $("#goods-item").html(html);
                 $(".goods-num-tip").html(goodsNum);
                 $(".shopCart .detail span").html(goodsNum)
                 $(".go-cart").on("click", ".delete-goods",miniCart.prototype.delete);
             }
         });
         $(".go-on").on("click", function () {
             window.location.reload();
         })
         $(".size-wrapper .select").click(function () {
             $(".size-warn").hide();
             sizeIndex = $(this).index();
         });
         $(".btns .pay").click(function () {
             window.location.href = "cart.html";
         })

     }

     //mini购物车

     function miniCart() {
         var _this = this;
         var cookies = $.cookie("goodsDetails");
         
         if (cookies != "" && cookies != null) {
             $(".goods-num-tip").show();
             arr = cookies.split("#");
             arr.pop();
             //获取每段商品的全部信息；
             for (var j = 0; j < arr.length; j++) {
                 var a = arr[j].split("|");
                 arr2.push(a);
             }
             var html = "";
             for (var i = 0; i < arr2.length; i++) {
                 goodsNum += parseInt(arr2[i][3]);
                 html += '<div class="goods-item">'
                 html += '<div class="goods-img">'
                 html += '<a href="javascript:;">'
                 html += '<img src="' + arr2[i][1] + '" alt="">'
                 html += '</a>'
                 html += '</div>'
                 html += '<div class="goods-info">'
                 html += '<p class="title">' + arr2[i][0] + '</p>'
                 html += '<p>尺码：<span class="size">' + arr2[i][2] + '</span></p>'
                 html += '</div>'
                 html += '<div class="goods-price">'
                 html += '<p>'
                 html += '<span class="price">' + arr2[i][4] + '</span> x <span class="num">' + arr2[i][3] + '</span>'
                 html += '</p>'
                 html += '<p>'
                 html += '<span class="delete-goods"><a href="javascript:;" style="color:#000;padding:2px 4px;background:#eee;">删除</a></span>'
                 html += '</p>'
                 html += '</div>'
                 html += '</div>'
             }
             $(".goods-num-tip").html(goodsNum);
             $("#goods-item").html(html);
         } else {
             $(".goods-num-tip").hide();
             $(".rich-cart").hide();
             $(".cart-null").show();
         }
         $(".go-cart").on("click", ".delete-goods", _this.delete);
         $(".go-cart").on("mouseenter", function () {
             $(".mini-cart-wrapper").show();
         }).on("mouseleave", function () {
             $(".mini-cart-wrapper").hide();
         })
     }
     //删除单个商品
     miniCart.prototype.delete = function () {
         $(this).parent().parent().parent().remove();
         miniCart.prototype.TestingCartNull();
         var Index = $(this).parent().parent().parent().index();
         arr2.splice(Index, 1);
         miniCart.prototype.changeCookie();
         goodsNum = 0;
         for (var i = 0; i < arr2.length; i++) {
             goodsNum += parseInt(arr2[i][3]);
         }
         $(".goods-num-tip").html(goodsNum);
         window.location.reload();
     }
     //检测是否为空
     miniCart.prototype.TestingCartNull = function () {
         console.log($(".go-cart").find(".goods-item").length)
         if ($(".go-cart").find(".goods-item").length == 0) {
             $(".rich-cart").hide();
             $(".cart-null").show();
             $(".goods-num-tip").hide();
             $.cookie("goodsDetails",null,{path:"/",expries:1})
         }
     }
     miniCart.prototype.changeCookie = function () {
         var strCookie = "";
         for (var i = 0; i < arr2.length; i++) {
             strCookie += arr2[i].join("|");
             strCookie += "#";
         }
         $.cookie("goodsDetails", strCookie, {
             path: "/",
             expries: 1
         });
     }









 });