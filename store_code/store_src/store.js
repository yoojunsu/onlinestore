$(function(){
	/****************************
	 *** IE 접속 불가 코드
	 ****************************/ 
	var agent = navigator.userAgent.toLowerCase();
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	 location.href = "./noie.html";
	}
	else {
	  console.log("it's not IE");
    }
        
	/****************************
	 *** 네비게이션 처리
	 ****************************/
	var subNav = $(this).children().eq(1);
	var sub2Nav = $(this).children().eq(1);
	$(".header-nav > li").on("mouseover",function(){
		$(this).children().eq(1).stop().fadeIn(300);
	}).on("mouseleave",function(){
		$(this).children().eq(1).stop().fadeOut(300);
	});
	
	$(".sub-nav").on("mouseleave",function(){
		$(this).stop().fadeOut(300);
	});
	
	$(".sub-nav > li").on("mouseover",function(){
		$(this).children().eq(1).stop().fadeIn(300);
	}).on("mouseleave",function(){
		$(this).children().eq(1).stop().fadeOut(300);
    });
    
    /** 모바일 네비게이션 **/
    $(".mobile-hamburger-wrap").on("click",function(){
        $(".mobile-nav-wrap").addClass("mobile-nav-wrap-active");
		$(".mobile-nav-overlay").show();
		$("body").css("overflow-y","hidden");
    });

    $(".mobile-nav-overlay").on("click",function(){
        $(".mobile-nav-wrap").removeClass("mobile-nav-wrap-active");
		$(this).hide();
		$("body").css("overflow-y","auto");
    });

    $(".mobile-nav > li > a").on("click",function(){
        $(this).next().stop().slideToggle(300);
    });

    $(".mobile-sub-nav > li").on("click",function(){
        $(this).children().eq(1).stop().slideToggle(300);
    });

	/****************************
	 *** 슬라이드
	 ****************************/ 
	var slideClass = "slide-apply";
	var firstSlide = document.querySelector(".slider-item:first-child");
	var slideTimer = setInterval(slide, 6000);
	function slide() {
		var curSlide = document.querySelector(`.${slideClass}`);
		if(curSlide) {
			curSlide.classList.remove(slideClass);
			var nextSlide = curSlide.nextElementSibling;
			if(nextSlide) {
				nextSlide.classList.add(slideClass);
			} else {
				firstSlide.classList.add(slideClass);
			}
		} else {
			firstSlide.classList.add(slideClass);
		}
	}
	
	//슬라이드 버튼 처리 
	$(".img-btn-wrap").on("mouseover",function(){
		clearInterval(slideTimer);
	}).on("mouseout",function(){
		slideTimer = setInterval(slide, 6000);
	});
	
	$(".img-btn-wrap > li").on("click",function(){
		switch($(this).index()) {
			case 0 :
				$(".slider-item").eq(0).addClass("slide-apply");
				$(".slider-item").eq(1).removeClass("slide-apply");
				break;
			case 1 :
				$(".slider-item").eq(1).addClass("slide-apply");
				$(".slider-item").eq(0).removeClass("slide-apply");
		}			
	});
	
	var $sliderImg = $(".slider-img-wrap > img");
	var x = 0;
	var y = 0;
	var moveX = 0;
	var moveY = 0;
	var friction = 1/7;
	
	function sliderImgMove() {
		x += (moveX - x) * friction;
		y += (moveY - y) * friction;
		
		$sliderImg.css({
			'transform':'perspective(500px) translateX('+ -x +'px) translateY('+ y +'px)' 
		});
		
		window.requestAnimationFrame(sliderImgMove);
	}
		
	$(".main-slide-wrap").on("mouseover",function(e){
		var mouseX = Math.max(-350, Math.min(100, $(window).width()/2 - e.clientX));
		var mouseY = Math.max(-350, Math.min(100, innerHeight / 2 - e.clientY));
		moveX = (6 * mouseX) / 100;
		moveY = (8 * mouseY) / 100;
	});
		
	sliderImgMove()
	
	/****************************
	 *** PRODUCT 제품 INFO
	 ****************************/	
	$(".product-items").on("mouseover",function(){
		$(this).addClass("product-info-fade");
	}).on("mouseleave",function(){
		$(this).removeClass("product-info-fade");
	});

	/****************************
	 *** Home Collection 파노라마 
	 ****************************/	
    var panoramaTimer = setInterval(panorama, 100);
    function panorama() {
        var operator = "-=";
        var  contentWidth = $(".home-collection-items").width() + 10;
        $(".home-collection-slide").animate({
            left: operator + contentWidth
        },4000,"linear",function(){
            $(this).append($(this).children(":first")).css({
                left: 0
            });
        })
    }
});
