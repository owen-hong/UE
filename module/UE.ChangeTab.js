WNF.ChangeTab = {
	//通用切换tab组件
	commonTab : function(options){
		var ops = options || {};
		ops.event = ops.event || "click";
		ops.class = ops.class || "cur";

		$(ops.tabId).on(ops.event,function(){
			var $idx = $(this).index();
			$(this).addClass(ops.class).siblings().removeClass(ops.class);
			$(ops.contentId).children(ops.contentChild).eq($idx).show().siblings().hide();
		});
	},

	//显示tip组件
	showTip : function(options){
		var ops = options || {};

		//回调函数
        var overFn = ops.overFn || "";
        var outFn = ops.outFn || "";

		$(ops.id).hover(function(){
			var $top = $(this).position().top,
        	    $left = $(this).position().left,
				$Htip = $(this).outerHeight(true),
        	    $Wtip = $(ops.tipCls).width()/2;
        	
        	var overfn = typeof overFn == "string" ? overFn : overFn(); 

        	if(ops.tiptype=="more"){
        		$(this).siblings(ops.tipCls).show().css({
		            "left": $left - ($Wtip) + "px",
		            "top":$top + $Htip
		        });
        	}else{
        		$(ops.tipCls).show().css({
		            "left": $left - ($Wtip) + "px",
		            "top":$top + $Htip
		        });
        	}
        	
		},function(){
			//鼠标移除回调函数
			var outfn = typeof outFn == "string" ? outFn : outFn(); 
			$(ops.tipCls).hide();
		});

	},


}














































