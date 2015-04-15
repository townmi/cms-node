var express = require('express');

var Read = require("../src/readSQL.js");

var app = express();
var router = express.Router();

// exports
module.exports = router;

router.get("/admin/login", function (req, res){
	res.render("login_reg", {title: "登陆"});
});

router.get("/admin/reg", function (req, res){
	res.render("login_reg", {title: "注册"});
});

router.post("/admin/login", function (req, res){

	var username = req.body.username,
		password = req.body.password;
	var SQL = 'select username,password from user where username="'+username+'"or(email="'+username+'")';
	var read = new Read(SQL);

	read.get(function (rows){
		if(rows.length){
			if(rows[0].password === password){
				return res.send({pass: "ok"})
			}
		}
	});

	return;
	res.render("index");
});

router.post("/admin/reg", function (req, res){
	res.render("index");
});