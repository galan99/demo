/** 
@author:anlan
@date:2019-10-14
h5游戏支付
线上：http://dl.gamdream.com/activity/galan/gamesdk/js/game.js
*/
if (location.href.indexOf('vconsole') != -1) {
    document.write('<script src="//dl.gamdream.com/activity/lib/vconsole.js"></script>')
}
var PageSdK = function (window, document) {
    var nav = navigator.userAgent.toLowerCase(),
        gameInfo = {},
        mainlink = '',
        _stop = true;

    return {
        isIos: /iphone|ipad/i.test(nav),
        isAndroid: /android/i.test(nav),
        isWx: /micromessenger/i.test(nav),
        isPc: !/phone|pad|ipod|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone/i.test(nav),
        gameUrl: '',
        loginUrl: '',
        payUrl: './data/pay.json',
        dataUrl: './data/index.json',
        getShopUrl: './data/pay.json',
        onMsg: function (msg) {
            if ($("#cmTips").length) {
                clearTimeout(_timer);
                $("#cmTips").remove();
            };
            var oHtml = [];
            oHtml.push('<section id="cmTips" class="cmTips">');
            oHtml.push('    <p class="msg-tx">' + msg + '</p>');
            oHtml.push('</section>');

            $("body").append(oHtml.join("")).find("#cmTips").addClass('show');
            _timer = setTimeout(function () {
                $("#cmTips").remove();
            }, 4000);
        },
        $ajax: function (type, url, oData, callback, async) {
            var _this = this;
            if (!_stop) {
                return false;
            }
            _stop = false;
            $.ajax({
                type: (type == '' ? 'POST' : type),
                url: mainlink + url,
                dataType: 'json',
                data: oData,
                async: async || true,
                success: function (data) {
                    _stop = true;
                    if (data.error_code == 1000) {
                        window.location.href = data.data.login_url
                    } else {
                        callback && callback(data)
                    }
                },
                error: function (argument) {
                    $('#loading').hide();
                    _stop = true;
                    _this.onMsg("请求出错，请稍后再试");
                }
            });
        },
        getUrlString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        },
        init: function () {
            var _this = this;
            sessionStorage.setItem('payUrl', '')
            window.onpageshow = function (event) {
                var saveUrl = sessionStorage.getItem('payUrl')
                if (saveUrl && event.persisted) {
                    window.location.reload()
                }
            };
            window.addEventListener("message", function (e) {
                var res = e.data
                if (res.type === 'login') {
                    window.location.reload()
                } else if (res.type === 'pay') {
                    gameInfo = res.data
                    _this.popHtml()
                }
            });
            if (_this.isWx && _this.isIos == 2000) {
                pushHistory();
                window.addEventListener("popstate", function(e) {
                    WeixinJSBridge.invoke('closeWindow',{},function(res){ });
                }, false);  
                function pushHistory() {  
                    var state = {  
                        title: "title",  
                        url: "#"  
                    };  
                    window.history.pushState(state, "title", "#");  
                }
            }
            if (_this.isWx && _this.isIos) {
                setTimeout(function(){
                    $('iframe').css({
                        'width': document.body.clientWidth,
                        'height': document.body.clientHeight
                    })
                }, 2000)
            }
            setTimeout(function(){
                _this.popHtml()
            }, 4e3)             
            this.load()
            this.events()
            this.getData()
        },
        load: function () {
            $('body').append('<div class="loading-splash"><img src="//dl.gamdream.com/activity/galan/gamesdk/images/loading.png"/></div>')
        },
        getData: function () {
            var _this = this;
            _this.$ajax("get", _this.dataUrl, {gid: _this.getUrlString('gid')}, function (data) {
                $('#loading').hide();
                if (data.error_code == 0) {
                    _this.loginUrl = data.data.login_url
                    if (data.data.is_login == 1){
                        _this.gameUrl = data.data.game_url
                        _this.creatIframe(_this.gameUrl);
                        setTimeout(function(){
                            $('.loading-splash').hide()
                        }, 1800)
                    } else {
                        window.location.href = data.data.login_url
                    }
                } else {
                    _this.onMsg(data.msg);
                }
            });
        },
        popHtml: function () {
            var $pop = $('.pop')
            var _this = this;
            _this.$ajax("get", _this.getShopUrl, {gid: _this.getUrlString('gid'), product_id: gameInfo['product_id']}, function (data) {
                $('#loading').hide();
                if (data.error_code == 0) {
                    $pop.find('.name').text(data.data.product_info.name)
                    $pop.find('.price').text('￥' + data.data.product_info.price)

                    $pop.find('.way').hide().removeClass('check')
                    $pop.find('.way_wx').attr('pay_method_code', data.data.payment_method.wx)
                    $pop.find('.way_alipay').attr('pay_method_code', data.data.payment_method.ali)
                    if (!_this.isPc && !_this.isWx) {
                        $pop.find('.way').show()
                        $('.pop').fadeIn()
                    } else if (_this.isPc) {
                        $pop.find('.way_alipay').show().addClass('check')
                        $('.pop').fadeIn()
                    } else if (_this.isWx) {
                        $pop.find('.way_wx').show().addClass('check')
                        _this.payWay()
                        _this.goPay('wx')
                    }
                } else {
                    _this.onMsg(data.msg);
                }
            });
        },
        resize: function () {
            var evt = "onorientationchange" in window ? "orientationchange" : "resize";
            window.addEventListener(evt, resize, false);
            function resize() {
                setTimeout(function () {
                    $('iframe').css({
                        'width': document.body.clientWidth,
                        'height': document.body.clientHeight
                    })
                }, 100)
            }
            resize();
        },
        creatIframe: function (src) {
            if (!$('#gsd-iframe').length && src) {
                var gsdIiframe = document.createElement('iframe');
                var Height = $(window).height();
                gsdIiframe.id = 'gsd-iframe';
                gsdIiframe.frameBorder = 'no',
                gsdIiframe.marginwidth = 0,
                gsdIiframe.marginheight = 0,
                gsdIiframe.scrolling = 'no',
                gsdIiframe.width = '100%',
                gsdIiframe.height = Height + 'px'
                document.body.appendChild(gsdIiframe);
                gsdIiframe.src = src;
                $(gsdIiframe).attr('style', 'width:' + $(window).width() + 'px;height:' + Height + 'px;position:fixed;top:0;left:0;bottom:0;border:none;')
            }
        },
        goPay: function (type) {
            var _this = this;
            var parms = {  
                trade_type: type === 'wx' ? 1 : 2,
                gid: _this.getUrlString('gid'),
                product_id: gameInfo['product_id'],
                open_id: gameInfo['open_id'],
                payment_method_code: gameInfo['payment_method_code']
            };
            if( gameInfo['extend_info'] ) {
                parms['extend_info'] = gameInfo['extend_info']
            }
            $('#loading').show();
            _this.$ajax("post", _this.payUrl, parms, function (data) {
                $('#loading').hide();
                if (data.error_code == 0) {
                    if (type === 'wx') {
                        if (window.__wxjs_environment !== 'miniprogram') {
                            startJsApiCall(data.data.payment_info)
                        } else {
                            miniwxpay(data.data.payment_info)
                        }
                    } else {
                        sessionStorage.setItem('payUrl', data.data.payment_info.payment_url);
                        window.location.href = data.data.payment_info.payment_url;
                    }
                } else {
                    _this.onMsg(data.msg);
                }
            });

            function miniwxpay(parms){
                console.log('微信小程序支付')
                var url = '/pages/pay/pay?timeStamp='+ parms.timeStamp + '&nonceStr=' + parms.nonceStr + '&package=' + encodeURIComponent(parms.package) + '&paySign=' + parms.paySign
                console.log(url)
                wx.miniProgram.navigateTo({url: url})
            }

            function jsApiCall(parms) {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    parms,
                    function (res) {
                        WeixinJSBridge.log(res.err_msg);
                        var iFrame = document.getElementById('gsd-iframe');
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            iFrame.contentWindow.postMessage({
                                event: 'onPay',
                                data: {
                                    payState: 1
                                }
                            }, '*');
                            $('.pop').hide();
                            // window.location.reload()
                        } else {
                            iFrame.contentWindow.postMessage({
                                event: 'onPay',
                                data: {
                                    payState: 0
                                }
                            }, '*');
                        }
                    }
                );
            }

            function startJsApiCall(parms) {
                wx.config({
                    debug: false,
                    appId: parms.appId,
                    timestamp: parms.timestamp,
                    nonceStr: parms.nonceStr,
                    signature: parms.signature,
                });
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                    }
                } else {
                    jsApiCall(parms);
                }
            }
        },
        payWay: function () {
            gameInfo['payment_method_code'] = $('.pop .check').attr('pay_method_code')
        },
        events: function () {
            var _this = this;
            $('.pop .close').on('click', function () {
                $('.pop').hide()
            })
            $('.pop .way').on('click', function () {
                $('.way').removeClass('check')
                $(this).addClass('check')
            })
            $('.pop .btn').on('click', function () {
                if (!$('.pop .check').length) {
                    _this.onMsg('请选择支付方式')
                    return false
                }
                _this.payWay()
                _this.goPay('other')
            })
        }
    };
}(window, document, undefined);

window.onload = function () {
    PageSdK.init();
};