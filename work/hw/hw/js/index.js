$(function () {

var WxtSdK=(function(){
    function onTouchMove(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    //document.body.removeEventListener('touchmove',onTouchMove,false);
    //document.body.addEventListener('touchmove',onTouchMove,false);

    return {
        isIos:/iphone os/i.test(navigator.userAgent.toLowerCase()) || /ipad/i.test(navigator.userAgent.toLowerCase()),
        isAndroid:/android/i.test(navigator.userAgent.toLowerCase()),
        init:function(){            
            this.events();
        },
        getUrlString : function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },      
        events:function(){
            $('.video').on('tap',function(){
                var src = $(this).attr('data-src');
                $('.video-box').html('<video src="'+src+'" controls="controls" id="tsvideo"></video>');
                $('.video-box').show();
                $('.content').css("pointer-events","none");
                $('.video-box').find('video').get(0).play();
                document.body.addEventListener('touchmove', onTouchMove, false);
            });
            $('.video-box').on('tap',function(e){
                if(e.target.tagName != 'VIDEO'){
                $('.video-box').hide().empty();
                document.body.removeEventListener('touchmove', onTouchMove, false);
                setTimeout(function(){
                    $('.content').css("pointer-events","auto");
                },500);
                }
            });

            var teseWrap = $("#tese-swiper");
            var showPic = $("#show-pic");
            var teseSwiper = new Swiper('#tese-swiper', {
                slidesPerView : 2.82,
                spaceBetween : 10,
                
            });
            $("#tese-prev").on('tap',function(){
                teseWrap.children('.swiper-button-prev').trigger('tap');
            });
            $("#tese-next").on('tap',function(){
                teseWrap.children('.swiper-button-next').trigger('tap');
            });
            var showFlag = true;
            teseWrap.on('click','.swiper-slide',function(){
                var index = $(this).index();
                $("#show-wrap").show();
                if (showFlag) {
                    var showSwiper = new Swiper('#show-pic', {
                        loop : true,
                        pagination : '.swiper-pagination',
                        paginationClickable :true,
                        onSlideChangeEnd: function(swiper){
                        }
                    });
                    showFlag = false;
                }       
                showPic.children('.swiper-pagination').children('.swiper-pagination-bullet').eq(index).trigger('click');
                
                
            });
            $("#show-wrap").click(function(){
                $(this).hide();
                showPic.removeClass('active');
            });
            showPic.click(function(e){
                e.stopPropagation();
            });
            
            
            var middleSwiper = new Swiper('#middle-swiper', {
                pagination : '.swiper-pagination',
                paginationClickable :true,
            });
            
        },

    };
})();

WxtSdK.init();

})