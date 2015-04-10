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
	res.render("index");
});

router.post("/admin/reg", function (req, res){
	res.render("index");
});