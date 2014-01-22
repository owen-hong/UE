$(function(){
	//exe example
	$(".btnExe").click(function(){
		var _$this = $(this),
		    $code_ID = $(this).attr("data-code-selector"),
		    $code = $($code_ID).next("pre").text();

		eval($code);
	});
	
	//append html
	// $(".htmlAppended").each(function(i, ele){
	// 	var _$this = $(ele),
	// 		code = $(_$this.data("code-selector")).text();
		
	// 	_$this.parent().after(_$this.html());

	// 	eval(code);
	// });
	
	// //auto exe code
	// $(".autoCode").each(function(i, ele){
	// 	var _$this = $(ele),
	// 		code = _$this.text();
			
	// 	eval(code);
	// });
	
});

//高亮
$(function(){
	$("pre.lang-html").snippet("html",{style:"whitengrey"});
	$("pre.lang-css").snippet("css",{style:"acid"});
	$("pre.lang-js").snippet("JavaScript",{style:"berries-light"});
})