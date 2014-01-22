

UE.Load.js([UE.jsPath+"jquery-1.8.3.min.js",UE.otherPath+"jquery.snippet.min.js",UE.otherPath+"demo.js"],function(){

	
	
	//加载Flash模块
	UE.Load.js(UE.modulePath + "UE.Flash.js",function(){
		//启动Flash Api
		UE.Flash.onChange({
			id : "#slider .view li",
	        thumbObj : "#slider .control li",  
	        thumbNowClass:"current", 
			btnPrev:"#btn_prev",  
			btnNext:"#btn_next",   
			slideTime: 1000,    
			autoChange: true,   
	        changeTime:3000,   
	    }); 
	});



	/*高亮设置*/
	UE.Load.css("css/jquery.snippet.min.css",function(){
		$("pre.lang-html").snippet("html",{style:"whitengrey"});
		$("pre.lang-css").snippet("css",{style:"acid"});
		$("pre.lang-js").snippet("JavaScript",{style:"berries-light"});
	});
});






















