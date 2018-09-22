 // 所有模块都通过 define 来定义
 define(function (require, exports, module) {

     // 通过 require 引入依赖
     var $ = require("jq");
     var page = require("page");
     //console.log(require("page"))
     page($);
     var cookie = require("cookie");
     cookie($);

     $(function () {
             new topNav(); //顶部导航栏
             new wrapNav(); //内容区导航
             new returnTop(); //回到顶部
             new menu(); //三级菜单
             new section(); //商品筛选
             new goodsTap(); //图片详情显示以及切换功能
             new goodsListAjax(40); //列表页的ajax
             new login();
             new miniCart(); //mini购物车
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

     /*三级菜单*/

     function menu() {
         /*点击选中菜单*/
         $(".product-list-nav .sort-child-list li").on("click", function () {
             $(".product-list-nav .sort-child-list li").removeClass("active");
             $(this).addClass("active");
         });
         $(".product-list-nav h3").on("click", function () {
             $(this).siblings().slideToggle();
             //$(this).find("span").css({"transition":"all .5s","transform":"rotate(90deg)"});
             $(this).find("span").toggleClass("rotate");
         })
     }
     /*夹克筛选*/
     var storage = window.sessionStorage;
     var sessionNum = storage.getItem("number") == null ? 0 : parseInt(storage.getItem("number"));

     function section() {
         var _this = this;
         $(".ud-price-range .limit").on("keyup", _this.choicePrice);
         $(".sort-pager .checks").on("click", _this.choiceType);
         /*选择商品排序方式*/
         this.selectMaxIndex();
         $(".sort-type").on("click", _this.typeClick);
         $("#count-per-page").click(function () {
             $(this).siblings().slideToggle(200);
             //$(".page-count ul").show();
         });
         $(".page-count ul li").hover(function () {
             $(this).css("background", "#1580fd");
         }, function () {
             $(this).css("background", "#fff");
         });
         $(".page-count ul li").click(_this.choicePage)

     }
     /*选择每页要显示的商品数*/
     section.prototype.choicePage = function () {
         $(".page-count ul").hide();
         //此处将页数改为分页/每页显示的数字
         var num = parseInt($(this).find("a").html());
         //console.log(num)
         $("#count-per-page").html(num + '<i class="iconfont">&#xe6e5;</i>')
         goodsListAjax(num);
     }

     /*正则判断输入价格是否合适*/
     section.prototype.choicePrice = function () {
             var reg = /^\d{1,5}$/;
             var val = $(this).val();
             if (!reg.test(val)) {
                 $(".ud-price-range .limit").val("");
                 $(".price-sure").hide();
             } else {
                 $(".price-sure").show();
             }
         }
         /*选择商品排列类型*/
     section.prototype.choiceType = function () {
             $(".sort-pager .checks").removeClass("checked");
             $(".sort-pager .checks span").html("&#xe646;");
             $(this).addClass("checked");
             $(this).find("span").html("&#xe653;");
         }
         /*选择要显示的当前选择*/
     section.prototype.selectMaxIndex = function () {
             var storage = window.sessionStorage;
             var arr = [];
             var arrNum = [];
             var arrShow = [];

             for (var i = 0; i < storage.length; i++) {
                 var key = storage.key(i); //使用key()方法，向其中出入索引即可获取对应的键
                 var value = storage.getItem(key);
                 var arr2 = value.split("|");
                 arr.push(key);
                 arr.push(arr2);
                 arrNum.push(parseInt(arr2[1]));
                 arrShow.push(arr2[0])
             }
             arrNum.pop(); //把最后一个undefinde删掉

             arrNum.sort(function (a, b) {
                 return b - a;
             });
             //var showIndex = arr.indexOf(arrNum[0]);//得到要显示的下标
             //console.log(arr);
             var showIndex = 0;
             for (var j = 0; j < arr.length; j++) {
                 if (j % 2 != 0) {
                     if (arr[j].indexOf(arrNum[0] + "") != -1) {
                         showIndex = j
                             //console.log(showIndex,arr[showIndex-1]);//上次最后点的是下标为3的span
                         break;
                     }
                 }
             }
             var thisIndex = isNaN(parseInt(arr[showIndex - 1])) ? 0 : parseInt(arr[showIndex - 1]);

             //console.log(thisIndex);//得到要显示的位置
             if (thisIndex != 0) {
                 $(".sort-type span").eq(thisIndex).attr("id", arr[showIndex][0]);
                 $(".sort-type").removeClass("active");
                 $(".sort-type").eq(thisIndex).addClass("active")
                 var spanId = $(".sort-type span").eq(thisIndex).attr('id');
                 //console.log(spanId)
                 if (spanId == "") {
                     $(".sort-type span").eq(thisIndex).html("");
                 } else if (spanId == "xia") {
                     $(".sort-type span").eq(thisIndex).html("&#xe6e5;");
                 } else if (spanId == "shang") {
                     $(".sort-type span").eq(thisIndex).html("&#xe609;");
                 }
             }
         }
         /*切换选择*/
     section.prototype.typeClick = function () {
             window.location.reload();
             sessionNum++;
             storage.setItem("number", sessionNum);
             $(".sort-type").removeClass("active");
             $(this).addClass("active");
             var spanHtml = $(this).find("span").html();
             var spanId = $(this).find("span").attr('id');
             var Index = $(this).index();
             /*改变元素的id*/
             if (spanHtml != "") { /*排除掉第一个span元素*/
                 if (spanId == "") {
                     $(this).find("span").attr('id', 'xia');
                     $(".sort-type span").html("&#xe610;");
                     $(this).find("span").html("&#xe6e5;");
                     $(".sort-type span").eq(0).html("");
                 } else if (spanId == "xia") {
                     $(this).find("span").attr('id', 'shang');
                     $(".sort-type span").html("&#xe610;");
                     $(this).find("span").html("&#xe609;");
                     $(".sort-type span").eq(0).html("");
                 } else if (spanId == "shang") {
                     $(this).find("span").attr('id', 'xia');
                     $(".sort-type span").html("&#xe610;");
                     $(this).find("span").html("&#xe6e5;");
                     $(".sort-type span").eq(0).html("");
                 }
             } else {
                 $(".sort-type span").attr('id', "");
                 $(".sort-type span").html("&#xe610;");
                 $(".sort-type span").eq(0).html("");
             }
             /*写入storage*/
             var id = $(this).find("span").attr('id');
             storage.setItem(Index, id + "|" + sessionNum);
         }
         /*商品划伤去会有详情切换*/
         //top:6px;left:-21px;
     var goodsIndex = 0;

     function goodsTap() {
         var _this = this;
         $(".goods-container").on("mouseenter", ".good-info", _this.itemShow)
             //$(".good-info").mouseenter()
         $(".goods-container").on("mouseleave", ".good-item-wrapper", function () {
             $(this).hide();
         })

         /*切换图片*/
         $(".goods-container").on("mouseenter", ".good-item-wrapper .right li", function () {
             var src = $(this).find("img").attr("src");
             $(".good-item-wrapper .good-thumb img").attr("src", src);
         });
         /*保存cookie*/
         $(".good-item-wrapper").on("click", ".good-detail-img", function () {
             //var index = 
             $.cookie("imgIndex", goodsIndex, {
                 path: "/",
                 expires: 1
             });
         })
     }
     goodsTap.prototype.itemShow = function () {
         goodsIndex = $(this).index();
         var top = $(this).offset().top;
         var left = $(this).offset().left;
         var src = $(this).find(".good-thumb img").attr("src");
         var text = $(this).find("#t").html();
         var brand = $(this).find(".brand a").html();
         var price = $(this).find(".price").html();
         var src1 = (goodsIndex + 1) + "-" + 1;
         //console.log(index)
         if (goodsIndex % 3 == 0 && goodsIndex != 0) {
             $(".good-item-wrapper").css("left", left - 320);
         } else {
             $(".good-item-wrapper").css("left", left - 257.5);
         }
         /*内容填充*/
         $(".good-item-wrapper").css("top", top - 1068);
         $(".good-item-wrapper").css("z-index", 100);
         $(".good-item-wrapper .good-thumb img").attr("src", "images-jacket/" + src1 + ".jpg");
         $(".good-item-wrapper .right img").eq(0).attr("src", "images-jacket/" + src1 + ".jpg");
         $(".good-item-wrapper .right img").eq(1).attr("src", src);
         $(".good-item-wrapper #t").html(text);
         $(".good-item-wrapper .brand a").html(brand);
         $(".good-item-wrapper .price").html(price);
         //$(".good-item-wrapper .good-detail-img img").attr("src",)
         $(".good-item-wrapper").show();
     }


     /*列表页的ajax切入*/


     function goodsListAjax(num) {
         $.ajax({
             url: 'json/goods-list.json',
             type: 'get',
             dataType: 'json',
             success: function (data) {
                 console.log("请求成功")
                     //1.计算分页数量 
                 var showNum = num;
                 var dataL = data.length;
                 var pageNum = Math.ceil(dataL / showNum);


                 $('#Pagination').pagination(pageNum, {
                     num_edge_entries: 3, //边缘页数
                     num_display_entries: 4, //主体页数(当前显示主题的页数)
                     items_per_page: 0, //每页显示1项
                     prev_text: "上一页",
                     next_text: "下一页",
                     callback: function (index) {
                         var Ihtml = $('#Pagination').find(".current").html();
                         if (Ihtml == "上一页") Ihtml = 1;
                         //console.log(Ihtml)

                         $(".page-orient .span").html('<i>' + Ihtml + '</i>/' + pageNum)
                         var html = "";
                         for (var i = showNum * index; i < showNum * index + showNum; i++) {
                             //console.log(dataL)
                             if (i < dataL) {
                                 html += '<div class="good-info">'
                                 html += '<div class="tag-container clearfix">'
                                 html += '<span class="good-tag new-tag">NEW</span>'
                                 html += '</div>'
                                 html += '<div class="good-detail-img">'
                                 html += '<a href="details.html" class="good-thumb">'
                                 html += '<img src="' + data[i].src + '">'
                                 html += '</a>'
                                 html += '</div>'
                                 html += '<div class="good-detail-text">'
                                 html += '<a href="details.html" id="t">' + data[i].text + '</a>'
                                 html += '<p class="brand">'
                                 html += '<a href="details.html">' + data[i].brand + '</a>'
                                 html += '</p>'
                                 html += '<p class="price">' + data[i].price + '</p>'
                                 html += '</div>'
                                 html += '</div>'
                             }
                         }

                         $(".goods-container #goodsBox").html(html);
                     }
                 })
             },
             error: function () {
                 alert("请求失败")
             }
         });

     }




     //检测是否存在登录
     function login() {
         var _this = this;
         var cookie = $.cookie("user");
         if (cookie) {
             $("#topNavRight li").eq(0).html("Hi~ " + cookie + '<span class="tuichu">[退出]</span>')
         }
         $("#topNavRight li").eq(0).on("click", ".tuichu", _this.loginyes)
     }
     login.prototype.loginyes = function () {
         $.cookie("user", null,{path:"/",expries:1});
         $("#topNavRight li").eq(0).html('Hi~[<a href="login.html" class="login">请登录</a>][<a href="register.html" class="register">免费注册</a>]')
     }
     //mini购物车
     var arr = [];
     var arr2 = [];
     var goodsNum = 0;

     function miniCart() {
         var _this = this;
         var cookies = $.cookie("goodsDetails");
         if (cookies != ""&&cookies!=null) {
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
                 html += '<span id="delete"><a href="javascript:;" style="color:#000;padding:2px 4px;background:#eee;">删除</a></span>'
                 html += '</p>'
                 html += '</div>'
                 html += '</div>'
             }
             $(".goods-num-tip").html(goodsNum);
             $("#goods-item").html(html);
             console.log(arr2);

             $(".go-cart").on("click", "#delete", _this.delete);
         } else {
             $(".goods-num-tip").hide();
             $(".rich-cart").hide();
             $(".cart-null").show();
         }
         $(".go-cart").on("mouseenter", function () {
             $(".mini-cart-wrapper").show();
         }).on("mouseleave", function () {
             $(".mini-cart-wrapper").hide();
         })
     }
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
     }
     miniCart.prototype.TestingCartNull = function () {
         console.log($(".go-cart").find(".goods-item").length)
         if ($(".go-cart").find(".goods-item").length == 0) {
             $(".rich-cart").hide();
             $(".cart-null").show();
             $(".goods-num-tip").hide();
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