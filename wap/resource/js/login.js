$(function(){
	//登录输入内容后添加删除按钮
	$(".j-input").on("input focus",function(t) {
		var e = $(t.target),
		a = e.next("i");
		"" == e.val() ? a.removeClass("clean") : a.addClass("clean")
	});
	$(".j-clear-input").on("tap",function(t) {
		var e = $(t.target),
		a = e.prev("input");
		a.val(""),
		e.removeClass("clean");
	});

});

$(function(){
	//阅读服务协议radio checked
	$(".section-protocol").find("span").bind("tap",function(){
		$(this).toggleClass("on");
		fnRadio();
		
	});
	$(".section-protocol").find("label").bind("tap",function(){
		$(this).siblings("span").toggleClass("on");
		fnRadio();
	});
	
	
	function fnRadio(){
		if($(".ui-radio input").attr("checked")=="checked"){
			$(".ui-radio input").removeAttr("checked");
		}else{
			$(".ui-radio input").attr("checked","checked");
		}
	}
	
	
	
});