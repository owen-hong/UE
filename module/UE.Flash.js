UE.Flash = {
	swipe : function(options){
		'use strict';
		
		var ops = options || {};

		UE.Load.js(UE.externalPath + "swipe.min.js",function(){
			var doc = document,
				bullets = doc.getElementById(ops.position).getElementsByTagName('li'),
				wrap_id = doc.getElementById(ops.wrap_id);

		    var banner = Swipe(wrap_id, {
		        auto: ops.auto,
		        continuous: true,
		        disableScroll:false,
		        callback: function(pos) {
		            var i = bullets.length;
		            while (i--) {
		              bullets[i].className = '';
		            }
		            bullets[pos].className = 'cur';
		        }
		    });
		});
	},
	/*渐变切换*/
	onChange : function(options){

		var ops = typeof options=="undefined" ? {} : options;

		var defaults={
			thumbObj: null,
			btnPrev: null,
			btnNext: null,
			thumbNowClass: "current",
			thumbOverEvent: true,
			slideTime: 1000,
			autoChange: true,
			clickFalse: true,
			overStop: true,
			changeTime: 5000,
			delayTime: 300
		},
			$obj = $.extend(defaults,ops),
			$this = $(ops.id),
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
				if ($obj.thumbObj != null) {
					$($obj.thumbObj).removeClass($obj.thumbNowClass).eq(g).addClass($obj.thumbNowClass)
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
					c = setInterval(j, $obj.changeTime)
				}
			}
		}

		if ($obj.thumbObj != null) {
			i = $($obj.thumbObj);
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
			c = setInterval(j, $obj.changeTime);

			if ($obj.overStop == true) {
				$this.mouseenter(function() {
					clearInterval(c)
				});
				$this.mouseleave(function() {
					c = setInterval(j, $obj.changeTime)
				})
			}
		}
	},
}
