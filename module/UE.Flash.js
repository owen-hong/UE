/*
*Date: 2013-10-06
*Email:520ued.com@gmail.com
*Visit http://www.520ued.com/UE/ for more info.
*(c) 2013-2014 owenhong, http://www.520ued.com/
*github:https://github.com/owen-hong/UE
*versions:1.0.0
*/
(function(UE,doc,win){
	UE.Flash = {
		mobile : function(options){
			'use strict';
			
			var ops = options || {};

			UE.Load.js(UE.externalPath + "swipe/swipe",function(){
				var bullets = doc.getElementById(ops.triggers).getElementsByTagName('li'),
					wrap_id = doc.getElementById(ops.id);

			    var banner = Swipe(wrap_id, {
			        auto: ops.auto,
			        continuous: true,
			        disableScroll:false,

			        callback: function(pos) {
			            var i = bullets.length;
			            while (i--) {
			              bullets[i].className = '';
			            }
			            bullets[pos].className = 'current';
			        }
			    });
			});
		},
		/*渐变切换*/
		onChange : function(options){
			'use strict';

			var ops = typeof options=="undefined" ? {} : options;

			var defaults={
				triggers: null,
				btnPrev: null,
				btnNext: null,
				thumbNowClass: "current",
				thumbOverEvent: true,
				slideTime: 1000,
				autoChange: true,
				clickFalse: true,
				overStop: true,
				autoTime: 3000,
				delayTime: 300
			},
			$obj = $.extend(defaults,ops),
			$this = $(ops.wrap),
			i,
			$size = $this.size(),
			$idx = 0,
			g,
			c,
			f;

			//初始化所有大图都隐藏只有第一贞显示
			$this.hide().eq(0).show();

			function j() {
				g = ($idx + 1) % $size;
				d();
			}

			function d() {
				if ($idx != g) {
					//切换控制器样式
					if ($obj.triggers != null) {
						$($obj.triggers).removeClass($obj.thumbNowClass).eq(g).addClass($obj.thumbNowClass)
					}

					//根据切换设置时间选择相对应的方式
					if ($obj.slideTime <= 0) {
						$this.eq($idx).hide();
						$this.eq(g).show()
					} else {
						$this.eq($idx).fadeOut($obj.slideTime);
						$this.eq(g).fadeIn($obj.slideTime)
					}
					//切换完幻灯片后将$idx更新为最新值
					$idx = g;

					if ($obj.autoChange == true) {
						clearInterval(c);
						c = setInterval(j, $obj.autoTime)
					}
				}
			}

			if ($obj.triggers != null) {
				i = $($obj.triggers);
				i.removeClass($obj.thumbNowClass).eq(0).addClass($obj.thumbNowClass);

				i.click(function() {
					g = i.index($(this));
					d();
					if ($obj.clickFalse == true) {
						return false
					}
				});
				if ($obj.thumbOverEvent == true) {
					i.mouseenter(function() {
						g = i.index($(this));
						f = setTimeout(d, $obj.delayTime)
					});
					i.mouseleave(function() {
						clearTimeout(f)
					})
				}
			}

			if ($obj.btnNext != null) {
				$($obj.btnNext).click(function() {
					if ($this.queue().length < 1) {
						j();
					}
					return false
				})
			}
			if ($obj.btnPrev != null) {
				$($obj.btnPrev).click(function() {
					if ($this.queue().length < 1) {
						g = ($idx + $size - 1) % $size;
						d();
					}
					return false
				})
			}

			if ($obj.autoChange == true) {
				c = setInterval(j, $obj.autoTime);

				if ($obj.overStop == true) {
					$this.mouseenter(function() {
						clearInterval(c)
					});
					$this.mouseleave(function() {
						c = setInterval(j, $obj.autoTime)
					})
				}
			}
		},
		slider : function(options){
			'use strict';
			
			var defaults={
				wrap:"child",
				triggers:"triggers",
				slideTime:500,
				autoChange:true,
				autoTime:3000,
				slideType:false
			};
			var ops = $.extend(defaults,options),
				$this = $(ops.id),
				$child = $(ops.wrap).children('li'),
				$triggers = $(ops.triggers),
				$len = $child.length-1,
				$autoScroll;

			//判断切换方式
			if(ops.slideType===true){
				var $size = $child.width(),
					$size2 = $size * 2,
					$size3 = $size * 3,
					$direction = "left";

				//初始化位置
				$child.css({
					left : $size,
				})
				$(ops.wrap).css({
					width:$size3+"px",
					left:-$size+"px",
				});
			}else{
				var $size = $child.height(),
					$size2 = $size * 2,
					$size3 = $size * 3,
					$direction = "top";

				//初始化定位wrap位置
				$child.css({
					top : $size,
				})
				$(ops.wrap).css({
					height:$size3+"px",
					top:-$size+"px",
				});
			}
			
			//除了第一个child都隐藏
			$child.not(":first").hide();

			$triggers.find("li").click(function(){

				var clickIndex = $(this).index(),
					nowIndex = $triggers.find("li.current").index();

				if(noMove()){
					if (clickIndex > nowIndex){
						scroll(clickIndex,$size2);
					}else if(clickIndex < nowIndex){
						scroll(clickIndex,"0");
					}else{
						return false;
					}
				};
				return false;
			});		

			//判断动画是否在运行中
			var noMove = function(){

				if(!$(ops.wrap).is(":animated")){
					return true;
				}else{
					return false;
				};
			};

			//执行动画
			var scroll = function(num,scroll_height){

				$triggers.find("li").eq(num).addClass("current").siblings('li').removeClass('current');

				if($direction==="left"){
					$child.eq(num).show().css({
						left : scroll_height + "px"
					});

					$(ops.wrap).stop(true,true).animate({
							left : - scroll_height + "px"
						},
						ops.slideTime,
						function(){
							$child.eq(num).css({left : $size+"px"}).siblings().hide();
							$(ops.wrap).css({left : -$size+"px"});
						}
					);

				}else{
					$child.eq(num).show().css({
						top : scroll_height + "px"
					});

					$(ops.wrap).stop(true,true).animate({
							top : - scroll_height + "px"
						},
						ops.slideTime,
						function(){
							$child.eq(num).css({top:$size+"px"}).siblings().hide();
							$(ops.wrap).css({top:-$size+"px"});
						}
					);
				}
				
			};
			
			var prev = function(){

				var curIndex = $triggers.find("li.current").index();

				if(noMove()){
					//滚动到第一个的时候跳到最后一个
					if (curIndex == 0){
						scroll($len,"0");
					}
					else{ 
						$triggers.find("li.current").prev("li").trigger("click");
					};
				};
				return false;
			}
			var next = function(){

				var curIndex = $triggers.find("li.current").index();

				if(noMove()){
					//滚动到最后的时候跳到第一个
					if (curIndex == $len){
						scroll("0",$size2);
					}
					else{
						$triggers.find("li.current").next("li").trigger("click");
					};
				};
				return false;
			}

			//上下按钮
			$(ops.btnPrev).click(function(){
				prev();
			});
		
			$(ops.btnNext).click(function(){
				next();
			});

			//时间开关控制
			if(ops.autoChange===true && $child.length!=1 && noMove()){

				$autoScroll = setInterval(next,ops.autoTime);

				$this.hover(function(){
					clearInterval($autoScroll)
				},function(){
					$autoScroll = setInterval(next,ops.autoTime);
				});
			};
		}
	}
})(UE,document,window);
