/*
 * author : towne
 * version : 0.0.1
 * date : 2015.4.16
 *
*/

var fs = require("fs");

var express = require('express');
var formidable = require('formidable');

var Read = require("../src/readSQL.js");

var app = express();
var router = express.Router();
var basePath = "http://10.106.88.43:3000/";
// exports
module.exports = router;

router.get("/admin", function (req, res){
	var login = req.session.login,
		username = req.session.username,
		team = req.session.team,
		email = req.session.email;
	res.render("index", {login: login, username: username, team: team, email: email})
})

// router.get("/admin", function (req, res){

// 	res.render("admin",{title: "admin"});

// });

// router.post("/admin", function (req, res){
// 	// console.log(req);
// 	res.send({data: "ok"});
// })

router.post("/resource", function (req, res){

	var form = new formidable.IncomingForm();

	form.uploadDir = "./public/upload/";

    form.parse(req, function (err, fields, files){

   		var dir = "./public/upload/imgs/";

    	fs.renameSync(files.file.path, dir+files.file.name);

    	var STR = '"'+basePath+"upload/imgs/"+files.file.name+'","'+(files.file.size/1024)+"KB"+'","'+'admin'+'"';

    	var SQL = 'INSERT INTO resource_img(path, size, upload_user) values('+STR+')';

		var read = new Read(SQL);

		read.get(function (rows){

			res.send({"target": true});

		});

    });

});

function addZero(num){
	var num = parseInt(num);
	if(num<10){
		return "0"+num;
	}else{
		return ""+num;
	}
}
