/*
 * author : towne
 * version : 0.0.1
 * date : 2015.4.16
 *
*/

// js validate.js


var base = {
	username : /^[A-Za-z0-9\u4E00-\u9FA5]+$/,
	phone : /^1[3,4,5,7,8]{1}[0-9]{9}$/,
	email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	password:/^(?!\d+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,18}$/,
	nickname : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$|^1[3,4,5,7,8]{1}[0-9]{9}$/,
	identity : /^\d{17}[\d,x,X]$/,
	bankcard : /^\d{16,19}$/,
	chinname : /^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*$/,
	captcha : /^\w{6}$/,
	meassage : {
		username : ["用户名不能为空","用户名格式错误"],
		phone : ["手机号码不能为空！", "请输入正确手机号！"],
		email : ["邮箱格式有误"],
		password : ["密码不能为空！","密码格式错误","密码不正确"],
		nickname : ["昵称只能用中文、英文、数字组合"],
		identity : ["身份证格式错误"],
		checkIdCard : ["身份证号码错误"],
		bankcard : ["银行卡格式错误"],
		chinname : ["中文姓名格式有误"],
		captcha : ["验证码不能为空！","验证码格式错误！"]
	}
};

jQuery.fn.tip = function(config){

	// 默认参数集合
	var config = $.extend(true,{
		color : "#00589E",
		excursion_X : 0,
		excursion_Y : 0,
		beforeFun : function(){},
		afterFun : function(){},
		hide: false,
		destory : false
	}, config);

	config.beforeFun();

	var POS_KEY = $(this).attr("data-pos") ? $(this).attr("data-pos") : "right";
	var key_bool = "", ID = "";

	// 当前DOM元素有无指向ID，查找tipDOM元素
	if($(this).attr("direct")){
		key_bool = $(this).attr("direct");
		tip = $("#"+key_bool);
		if(config.destory){
			$(this).attr("direct","");
			return tip.remove();
		}
		if(config.hide){
			return tip.hide();
		}
	}else{
		if(config.destory || config.hide) return;
		var KEY = new Date().getTime();
		$(this).attr("direct","ui_tip"+KEY);
		ID = "ui_tip"+KEY;
	}
	// 当前DOM元素的POS
	var tar_L = $(this).offset().left;
	var tar_T = $(this).offset().top;
	var tar_W = $(this).outerWidth();
	var tar_H = $(this).outerHeight();
	
	if(!key_bool){
		// 如果这个dom元素没有绑定tip的话，生成一个
		var tip = $("<div>",{
			"class": "ui_tip",
			"style": "visibility: hidden;",
			"id": ID
		}).appendTo($("body"));

		$("<div>",{
			"class": "ui_arrow "+ POS_KEY
		}).appendTo(tip);

		$("<span>",{
			"class": "ui_content"
		}).appendTo(tip);

		tip.find(".ui_content").html($(this).attr("data-title"));

	}else{
		// 已经绑定过tip的直接跳过创建
		tip.find(".ui_content").html($(this).attr("data-title"));
		tip.find(".ui_arrow")[0].className = "ui_arrow "+ POS_KEY;

	}
	
	// tip内容变化, pos变化
	var tip_W = tip.outerWidth();
	var tip_H = tip.outerHeight();
	var tip_L, tip_T;

	switch(POS_KEY){
		case "left":
			tip_L = tar_L - tip_W - 10 + config.excursion_X;
			tip_T = tar_T - (tip_H-tar_H)/2 + config.excursion_Y;
			break;
		case "top":
			tip_L = tar_L - (tip_W-tar_W)/2 + config.excursion_X;
			tip_T = tar_T - tip_H - 10 + config.excursion_Y;
			break;
		case "right":
			tip_L = tar_L + tar_W + 10 + config.excursion_X;
			tip_T = tar_T - (tip_H-tar_H)/2 + config.excursion_Y;
			break;
		case "bottom":
			tip_L = tar_L - (tip_W-tar_W)/2 + config.excursion_X;
			tip_T = tar_T + tip_H + 10 + config.excursion_Y;
			break;
		default:
			tip_L = 0 + config.excursion_X;
			tip_T = 0 + config.excursion_Y;
	}	
	// 设置边框的颜色、文字的颜色。手动。
	tip.css({"border-color" : config.color}).find(".ui_content").css("color",config.color);
	tip.find(".ui_arrow").css("border-color", "transparent").css("border-"+POS_KEY+"-color", config.color);
	// 呈现tip
	tip.css({"left": tip_L, "top" : tip_T, "visibility" : "visible"}).hide().fadeIn(400,config.afterFun);

};















