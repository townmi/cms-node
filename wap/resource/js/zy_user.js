$(function(){
	//登录输入内容后添加删除按钮
	$(".zy_allInput").on("input focus",function(t) {
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
	//新增收货地址页面-修改改变p为可输入的框
	$(".zy-edit")

});