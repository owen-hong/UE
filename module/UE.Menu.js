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