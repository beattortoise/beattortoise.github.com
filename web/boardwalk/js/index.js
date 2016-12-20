$(function() {
	//banenr
	this.$wrap = $('body');
	var  $win = $(window);
	var self = this;
	var $slider = self.$wrap.find('.lab_slider');
	var $slider_show = $slider.find('.slider_show');
	var $show_moving= $slider_show.find('.show_moving');
	var $box_img= $show_moving.find('li');
	var $img = $box_img.find('.big_img');
	var box_length = $box_img.length;
	//lab_main
	var $lab_main = self.$wrap.find('.lab_main');
	//arrow
	var $oleft = self.$wrap.find('.arrow_left');
	var $oright = self.$wrap.find('.arrow_right');
	var $opoint = self.$wrap.find('.slider_point li');
	var onow = 0;//当前显示的图片下标
	var timer = null;
	var change_time = 6000;//轮播图间隔时间
	var animate_time = 1700;
	var img_onload = false;
	//icon_tip
	var $slider_tip = self.$wrap.find('.slider_tip'); 
	$win.scroll(function(e){ 
		$slider_tip.fadeOut(600);
		if($(document).scrollTop() > $win.height()-61) {
			$('.navbar').css('background-color', '#000');
		}else {
			$('.navbar').css('background-color', 'transparent');
		}
	});

	var i = 0;
	$.each( $img, function(index){
		
		//IE中若图片有缓存时执行
		if( $img.eq(index).get(0).complete ){
			i++;
			if( i >= box_length ){
				startBanner();
			}
		}
		//用于第一次加载网站执行，IE中若果有缓存则不会执行onload事件
		else{ 
			$img.eq(index).get(0).onload = function(){
				i++;
				if( i >= box_length ){
					startBanner();
				}
			};
		}
	});

	function startBanner(){
		setSize();
		bannerMove($slider_show, '.show_moving', $oleft, $oright, $opoint);
		$win.resize(function(){
			setSize();
		});
	}
	//参数：oparent：包围ul标签的父级；moving_class：ul的类名；
	//		oleft：左箭头；oright：右箭头；$opoint：底部小点的集合	
	function bannerMove(oparent, moving_class, oleft, oright, $opoint){
		var $moving = oparent.find(moving_class).eq(0);
		var $oli = $moving.find('li')	
		var owidth = parseInt($oli.width());
		var img_num = $oli.length;
		var oindex = $oli.length-1;//最后一张图片的index
		setWidth();
		if( onow > oindex ){ 
			onow = 0;
		}
		else if( onow < 0 ){
			onow = oindex;
		}
		changePoint();
		pointClick();

		//自动播放和点击左键效果一样
		timer = setInterval(function(){ 
			//autoPlay();
		}, change_time);

		oright.click(function(){ 
			$moving.stop(true, true);
			clearInterval(timer);
			autoPlay();
			timer = setInterval(function(){ 
				autoPlay();
			}, change_time);
		});

		oleft.click(function(){ 
			$moving.stop(true, true);
			clearInterval(timer);
			if( onow == 0 ){ //将最后一张复制并放到最前面
				$oli.eq($oli.length-1).clone().insertBefore($oli.eq(0));
				setWidth();
				$moving.css('left', -owidth);
				onow = 0;
				$moving.animate({'left':-onow*owidth}, animate_time, 'easeOutQuint', function(){ 
					onow = oindex;
					$moving.css('left', -onow*owidth);
					if( $moving.find('li').length > img_num ){
						$moving.find('li').first().remove();
					}
					setWidth();
					changePoint();
					timer = setInterval(function(){ 
						autoPlay();
					}, change_time);
				});
			}
			else{ 
				onow--;
				$moving.animate({'left':-onow*owidth}, animate_time, 'easeOutQuint', function(){ 
					changePoint();
					timer = setInterval(function(){ 
						autoPlay();
					}, change_time);
				});
				
			}
		});

		function autoPlay(){ 
			$moving.stop(true, true);
			owidth = parseInt($moving.find('li').width());
			$moving.css({'left':-onow*owidth});
			if( onow == oindex ){ 
				$moving.append($oli.eq(0).clone());
				setWidth();
			}
			onow++;
			$moving.animate({'left':-(onow*owidth)}, animate_time, 'easeOutQuint', function(){
				if( onow == img_num ){ 
					onow = 0;
					$moving.css({'left':'0'});
					//由于重新添加了li，所以要重新获取li的数量
					if( $moving.find('li').length > img_num ){
						$moving.find('li').last().remove();
					}
					setWidth();
				}
				changePoint();
			});
		}
		//设定包围图片的ul的宽度
		function setWidth(){ 
			$moving.css('width', ($moving.find('li').length) * parseInt($oli.width()));
		}
		//给point点加上变化的class
		function changePoint(){ 
			$opoint.removeClass('active');
			$opoint.eq(onow).addClass('active');
		}
		function pointClick(){ 
			$opoint.click(function(){ 
				$moving.stop(true, true);
				clearInterval(timer);
				onow = $(this).index();
				$moving.animate({'left':-onow*owidth}, animate_time, 'easeOutQuint');
				changePoint();
				timer = setInterval(function(){ 
					autoPlay();
				}, change_time);
			});
		}
	}	
	
	//全屏并随窗口改变大小
	function setSize(){
		$show_moving.stop(true, true);
		var now_width = document.documentElement.clientWidth || document.body.clientWidth;
		var now_height = document.documentElement.clientHeight|| document.body.clientHeight;
		console.log(now_width+'now');
		var min_width = 300;
		var min_height = 568;

		if( now_width > min_width ){ 
			$slider.css({'width':now_width, 'height':now_height, 'margin-left':-(now_width)/2});
			//由于$slider的宽该表导致出现横向滚动条，需重新获取now_height
			//now_height = document.documentElement.clientHeight|| document.body.clientHeight;
			now_height = $(window).height() 

			$slider.css({'width':now_width, 'height':now_height, 'margin-left':-(now_width)/2});
			$box_img.css({'width':now_width});
			$show_moving.css({'left':-onow*parseInt($box_img.width()), 'width':now_width * box_length});
			$img.css({'height':now_height, 'width':'auto',  'left':'50%', 'margin-left':-$img.width()/2});
			if(now_width < $img.width() && now_height > $img.height() ){ 
				$img.css({'height':now_height, 'width':'auto',  'left':'50%', 'margin-left':-$img.width()/2});
			}
			if(now_height <= $img.height()  &&  now_width >= $img.width() ){
				$img.css({'width':now_width, 'height':'auto', 'margin-left':-now_width/2});
			}
		}
		else{
			$slider.css({'width':min_width, 'height':now_height, 'margin-left':-(min_width)/2});
			now_height = document.documentElement.clientHeight|| document.body.clientHeight;

			$slider.css({'width':min_width, 'height':now_height, 'margin-left':-(min_width)/2});
			$box_img.css({'width':min_width});
			$show_moving.css({'left':-onow*parseInt($box_img.width()), 'width':min_width* box_length});
			if( now_height <= min_height ){
				$img.css({'height':min_height, 'width':'auto', 'margin-left':-960});
			}
			else{
				$img.css({'height':now_height, 'width':'auto', 'left':'50%', 'margin-left':-$img.width()/2});
			}
		}
		
		$lab_main.css({'padding-top':now_height + 7});	
	}



	//六幅小图
	var  $pic = $('.bigPic').find('.pic');
	$pic.hover(function() {
		$(this).children('.mask').show();
		$(this).find('p').show();
		},function() {
		$(this).children('.mask').hide();
		$(this).find('p').hide();
	})

})
