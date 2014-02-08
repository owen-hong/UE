/*
*Date: 2013-10-06
*Email:520ued.com@gmail.com
*Visit http://www.520ued.com/UE/ for more info.
*(c) 2013-2014 owenhong, http://www.520ued.com/
*github:https://github.com/owen-hong/UE
*versions:1.0.0
*/
UE.Menu = {
	multistep : function(options){
		'use strict';

		var ops = options || {};
		ops.close = false || ops.close;
		$(ops.id).on({
			click : function(){
				if(ops.close===true){
					$(this).parent("li").siblings("li").children(ops.two,ops.three).hide();
				}
				$(this).siblings('ul').toggle();
			},
		});
	},
	ganged : function(options){
		'use strict';

		var ops = options || {};

		$(ops.id).hover(function() {
			$(this).children('ul').show();
		}, function() {
			$(this).children('ul').hide();
		});
	},
}