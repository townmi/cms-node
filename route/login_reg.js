/*
 * author : towne
 * version : 0.0.1
 * date : 2015.4.16
 *
*/
var crypto = require("crypto");
var Buffer = require("buffer").Buffer;

var express = require('express');
var ccap = require("ccap")();

var Read = require("../src/readSQL.js");
var md = require("../src/md5.js");

var app = express();
var router = express.Router();
// 全局ccap储存
var ccap_value;

// exports
module.exports = router;

// 登录
router.get("/admin/login", function (req, res){
	var ccap_arr = ccap.get();
	ccap_value = ccap_arr[0];
	res.render("login_reg", {title: "登陆", id: "login", ccap_img: ccap_arr[1].toString("base64")});
});

// 注册
router.get("/admin/reg", function (req, res){
	var ccap_arr = ccap.get();
	ccap_value = ccap_arr[0];
	res.render("login_reg", {title: "注册", id: "reg", ccap_img: ccap_arr[1].toString("base64")});
});

// 验证码
router.get("/admin/captcha", function (req, res){
	var ccap_arr = ccap.get();
	ccap_value = ccap_arr[0];
	res.send({src: "data:image/png;base64,"+ccap_arr[1].toString("base64"), val: ccap_value});
});

// 登录提交
router.post("/admin/login", function (req, res){

	var username = req.body.username,
		password = req.body.password,
		captcha = req.body.captcha;

	// 值验证

	if(captcha != ccap_value) return res.send({target:false, info: "验证码错误", method: "captcha"});

	var SQL = 'select username,password,team,email from user where username="'+username+'"or(email="'+username+'")';
	var read = new Read(SQL);

	read.get(function (rows){
		if(rows.length){
			if(rows[0].password === password){
				//
				req.session.login = true;
				req.session.username = username;
				req.session.team = rows[0].team;
				req.session.email = rows[0].email;

				res.send({target: true});
			}else{
				res.send({target: false, info: "密码不正确", method: "password"});
			}
		}else{
			return res.send({target: false, info: "用户名不正确", method: "username"});
		}
	});

});

router.post("/admin/reg", function (req, res){

	var email = req.body.email,
		password = req.body.password,
		captcha = req.body.captcha;

	// 值验证

	if(captcha != ccap_value) return res.send({target:false, info: "验证码错误", method: "captcha"});

	var SQL = 'select username,team,email from user where email="'+email+'"';
	var read = new Read(SQL);

	read.get(function (rows){
		if(rows.length){
			return res.send({target:false, info:"邮箱已注册", method: "email"});
		}else{
			return res.send({target:true, info:"注册成功"});
		}
	});
});


// 登出
router.post("/admin/logout", function (req, res){
	req.session.login = null;
	req.session.username = null;
	req.session.team = null;
	req.session.email = null;

	res.send({target:true,req: req.headers});
})






