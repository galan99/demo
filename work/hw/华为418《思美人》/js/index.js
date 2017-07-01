$(function(){
	var gp = $(".game-info>p");
	var arrow = gp.next();
	if (gp.height() > 48) {
		gp.css({
			"height" : "48px",
			"-webkit-line-clamp" : "2"
		});
		arrow.show();
	}
	var flag = true;
	arrow.click(function(){
		if (flag) {
			gp.attr("style","height: auto;")	
			arrow.addClass("active");
		}else{
			gp.attr("style","height: 48px;-webkit-line-clamp:2");
			arrow.removeClass("active");
		}
		flag = !flag;
	});
    $(".img-content").width(($(".img-container img").width()+4)*$(".img-container img").length);
	$(".img-wrap img").click(function(e){
		$(".swiper").show();
		var mySwiper = new Swiper('.swiper-container', {
		//autoplay:3000,//可选选项，自动滑动
		pagination : '.swiper-pagination',
		loop : true,
		autoplayDisableOnInteraction: false,
	    });
        mySwiper.slideTo(e.target._zid-1);
	});
	
	$(".swiper").click(function(){
		$(this).hide();
	});
	$(".swiper-container").click(function(e){
		e.stopPropagation();
	});
	$(".info-expand a").on("click",function(){$(".bg-s").hide(),$(".bg-all").show()}),$(".info-fold a").on("click",function(){$(".bg-all").hide(),$(".bg-s").show()})
});
