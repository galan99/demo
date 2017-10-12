window.onload=function(){
    var WxtSdK = (function() {
        function onTouchMove(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        //document.body.removeEventListener('touchmove',onTouchMove,false);
        //document.body.addEventListener('touchmove',onTouchMove,false);

        
        return {
            isIos: /iphone os/i.test(navigator.userAgent.toLowerCase()) || /ipad/i.test(navigator.userAgent.toLowerCase()),
            isAndroid: /android/i.test(navigator.userAgent.toLowerCase()),
            isPc:function(){
                if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                    //window.location.href=window.location.href.split('?mobile')[0];
                    return false;
                }else{
                    return true;
                }
            },
            isWx: function() {
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            },
            isQq:function(){
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/QQ/i) == 'qq') {
                    return true;
                } else {
                    return false;
                }
            },
            onMsg:function(msg){
                if($("#cmTips").length){
                    clearTimeout(_timer);
                    $("#cmTips").remove();
                };
                var oHtml = [];
                oHtml.push('<section id="cmTips" class="cmTips">');
                oHtml.push('    <p class="msg-tx">'+msg+'</p>');
                oHtml.push('</section>');

                $("body").append(oHtml.join("")).find("#cmTips").addClass('show');
                _timer = setTimeout(function(){
                    $("#cmTips").remove();
                },4000);
            },
            $ajax:function(type, url, oData, callback, ignore, async) {
                window._stop = true;
                var _this=this;
                if (!_stop && prevUrl == url) { //用于重复提交
                    return false;
                }
                prevUrl = url;
                _stop = false;
                $.ajax({
                    type: (type == '' ? 'POST' : type),
                    url: url,
                    dataType: 'json',
                    data: oData,
                    async: async || true,
                    success: function (data) {
                        _stop = true;
                        callback && callback(data);

                    }, error: function (argument) {
                        $('#loading').hide();
                        if (!ignore) {
                            _stop = true;
                            _this.onMsg("请求出错，请稍后再试");
                        }
                    }
                });
            }, 
            init: function() {
                var _this=this;
                this.events();                                  
            },
            getUrlString: function(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
            events: function() {
                var _this = this;

                if(_this.isIos){
                    $('.dlog_sub .ios').addClass('active').siblings().removeClass('active');
                }

                var swiper2 = new Swiper('#gameList', {
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    loop: !0,
                    coverflow: {
                            rotate: 0,
                            stretch: ($(window).width()<375)?110:135,
                            depth: 300,
                            modifier: 1,
                            slideShadows : false

                    },
                    nextButton: '.banner_left',
                    prevButton: '.banner_right',
                });

                //移动端视频播放
                $('.play_btn').on('click',function() {
                    $('.play_btn').removeClass('active');
                    playVideo($(this));
                });

                function playVideo(obj){
                    var src = obj.attr('data-src');
                    //src ="http://dl.uu.cc/static/download/wxt/shouyouchuangzuoshoujiHD.mp4";
                    $('.video-hide').html('<video src="' + src + '" controls="controls" id="tsvideo"></video>');
                    $('.video-hide').show();
                    $('.main').css("pointer-events", "none");
                    $('.video-hide').find('video').get(0).play();
                    document.body.addEventListener('touchmove', onTouchMove, false);
                }

                $('.video-hide').on('click', function(e) {
                    if (e.target.tagName != 'VIDEO') {
                        $('.video-hide').hide().empty();
                        $('.play_btn').addClass('active');
                        document.body.removeEventListener('touchmove', onTouchMove, false);
                        setTimeout(function() {
                            $('.main').css("pointer-events", "auto");
                        }, 500);
                    }
                });

                $('.yuyue').on('click', function(e) {
                    $('.dlog_sub').show();
                });

                $('.dlog_sub .close').on('click', function(e) {
                    $('.dlog_sub').hide();
                });

                $('.dlog_sub .sys_btn').on('click', function(e) {
                    $(this).addClass('active').siblings().removeClass('active');
                });

                function checkPhoneNum(phoneNum) {
                    return /^(13|14|15|17|18)\d{9}$/.test(phoneNum) ? !0 : !1
                }

                //预约
                $('.sub_btn').on('click', function(e) {
                    var phone = $("#phoneNum").val();
                    var systemType=$('.dlog_sub .sys .active').attr("type");

                    if (phone == "" || phone == undefined) {
                        _this.onMsg("请输入手机号码！");
                    } else if (!checkPhoneNum(phone)) {
                        _this.onMsg("请输入正确的手机号码！");
                    } else {
                        $('#loading').show();
                        _this.$ajax('post', '/collect_phone', {
                            "phone": phone,
                            "type": systemType,
                            "collect_name": 117,
                        }, function (data) {
                            $('#loading').hide();
                            if (data.ret == 2) {
                                _this.onMsg("您已经参加过预约！");
                            } else if (data.ret == 0) {
                                $('.dlog_sub').hide();
                                $("#phoneNum").val("")
                                _this.onMsg("预约成功！");
                                getNum()                                
                            } else {
                                _this.onMsg("预约失败！");
                            }
                        });
                    }
                });

                //进度条
                var allHeight=$('.mpage .floor2 .full_all').height();
                //$(".full").css("height", 383*allHeight/926+'px');
                getNum()
                function getNum() {                                        
                    _this.$ajax('GET', '/get_collect_phone_num',{},function (data) {                                              
                        $('#loading').hide();
                        if (data.ret == 0) {
                            var total = parseInt(data.total);
                            var width = (107+48)/2;

                            if (total <= 400000) {
                                width = (total / 400000) * 155;
                                if ( width <= 100 ) {
                                    width = 100;
                                }
                            } else if (total > 400000 && total <= 800000) {
                                width = (total / 800000) * 383;
                                $(".ico_list .p1").addClass("pass");
                            } else if (total > 800000 && total <= 1000000) {
                                width = (total / 1000000) * 610;
                                $(".ico_list .p1,.ico_list .p2").addClass("pass");
                            } else if (total > 1000000 && total < 2000000) {
                                width = (total / 2000000) * 833;
                                $(".ico_list .p1,.ico_list .p2,.ico_list .p3").addClass("pass");
                            } else {
                                width = 926;
                                $(".ico_list .p1,.ico_list .p2,.ico_list .p3,.ico_list .p4").addClass("pass");
                            }
                            $(".full").css("height", width*allHeight/926+'px');
                        }
                    });
                }

               
                //下载提示
                $('.down_btn').click(function() {                  
                    if (_this.isWx() || _this.isQq()) {
                        $('.dlog-share').show();
                        return false;
                    }
                    if(_this.isPc()){
                        $('.down_bg').show(); 
                    }
                });

                $('.down_btn,.down_bg').mouseout(function(event) {
                    if(_this.isPc()){
                        $('.down_bg').hide(); 
                    }
                });
                $('.down_bg').mouseover(function(event) {
                    $('.down_bg').show();
                });

                $('.dlog-share').click(function(event) {
                    $('.dlog-share').hide();
                });

            },
            noscroll:function(obj){
                function preventDefault(e) {
                    e = e || window.event;
                    e.preventDefault && e.preventDefault();
                    e.returnValue = false;
                }

                function enableScroll(){
                    $(document).off('mousewheel', preventDefault);
                    $(document).off('touchmove', preventDefault);
                    $(document.body).css({ "overflow-y": "auto", 'position': 'static', 'top': 'auto' });
                }

                $('.dlog_text .close').on('click',function(){            
                    enableScroll()       
                });

                showScroll(obj)
                function showScroll(obj){
                    $('body').addClass('noscroll');

                    //针对弹窗内文本的滚动
                    var _alertBodyObj;

                    _alertBodyObj= $('.dlog_text .text');

                    // 外部禁用
                    $(document).on('touchmove', preventDefault);

                    // 移动端touch重写
                    var startX, startY;
                    $(_alertBodyObj)[0].addEventListener('touchstart', function (e) {
                        startX = e.changedTouches[0].pageX;
                        startY = e.changedTouches[0].pageY;
                    }, false);

                    // 仿innerScroll方法
                    $(_alertBodyObj)[0].addEventListener('touchmove', function (e) {
                        e.stopPropagation();
                        //$(document.body).css({ "overflow-y": "hidden", 'position': 'fixed', 'top': 0 });

                        var deltaX = e.changedTouches[0].pageX - startX;
                        var deltaY = e.changedTouches[0].pageY - startY;

                        // 只能纵向滚
                        if (Math.abs(deltaY) < Math.abs(deltaX)) {
                            e.preventDefault();
                            return false;
                        }

                        var box = $(this).get(0);
                        if ($(box).height() + box.scrollTop >= box.scrollHeight) {
                            if (deltaY < 0) {
                                e.preventDefault();
                                return false;
                            }
                        }
                        if (box.scrollTop === 0) {
                            if (deltaY > 0) {
                                e.preventDefault();
                                return false;
                            }
                        }
                    }, false);
                }
            },
            wxShare:function(){
                //微信分享
                var _this=this;
                wxfn();  
                function wxfn(){
                    var wxConfig={};
                    var odata={app_name: 'gh_9cb8986990a8', url: window.location.href};
                    $.ajax({
                        url:"//ld.uu.cc/w_share",
                        type: 'post',
                        dataType: 'json',
                        data: odata,
                        success:function(data){                
                            if(data.ret==0){                                    
                                for(var i in data.data){
                                    wxConfig[i]=data.data[i];
                                }
                                wxShare(wxConfig.appId,wxConfig.timestamp,wxConfig.nonceStr,wxConfig.signature)
                            }
                        }
                    })       
                }

                function wxShare(gappid,gtimestamp,gnonceStr,gsignature){
                    var gshareurl = window.location.href,
                        gshareConfig={};
                        gshareConfig.share_title = "祝福贺周岁";
                        gshareConfig.share_content = "晒《圣斗士星矢·集结》一周年祝福，赢万钻豪礼！";
                        gshareConfig.share_icon = "https://sds.uu.cc/activity/sds/jp/shareIcon.png";

                    wx.config({
                        debug: false,
                        appId: gappid,
                        timestamp:gtimestamp,
                        nonceStr: gnonceStr,
                        signature: gsignature,
                        jsApiList: [
                            'checkJsApi',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo'
                        ]
                    });

                    window.shareData = {
                        "imgUrl": gshareConfig.share_icon || "",
                        "timeLineLink": gshareurl,
                        "sendFriendLink": gshareurl,
                        "weiboLink": gshareurl,
                        "tTitle": gshareConfig.share_title || "",
                        "tContent": gshareConfig.share_content || "",
                        "fTitle": gshareConfig.share_title || "",
                        "fContent": gshareConfig.share_content || "",
                        "wTitle": gshareConfig.share_title || "",
                        "wContent": gshareConfig.share_content || "",
                    };

                    wx.ready(function() {
                        var shareDataLine = {
                            title: window.shareData.tTitle,
                            link: window.shareData.timeLineLink,
                            imgUrl: window.shareData.imgUrl,
                            success:function(res){
                                //alert("恭喜你，分享成功！");                                               
                            }
                        }
                        var shareData = {
                            title: window.shareData.fTitle,
                            desc: window.shareData.fContent,
                            link: window.shareData.sendFriendLink,
                            imgUrl: window.shareData.imgUrl,
                            success:function(res){
                                //alert("恭喜你，分享成功！");
                            }
                        }

                        wx.onMenuShareAppMessage(shareData);
                        wx.onMenuShareTimeline(shareDataLine);
                        wx.onMenuShareQQ(shareData);
                        wx.onMenuShareWeibo(shareData);
                    });

                }
            },

        };
    })();

    WxtSdK.init();

};

