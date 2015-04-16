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
var basePath = "http://10.106.90.230:3000/";
// exports
module.exports = router;

router.get("/admin/resource/:id", function (req, res){

	var title = {imgs: "图片", word: "文本", excel: "表格", music: "音乐"}

	if(!title[req.params.id]) return res.redirect("/");

	var SQL = 'SELECT * FROM resource WHERE type="'+req.params.id+'"';

	var read = new Read(SQL);

	read.get(function (rows){
		var list = [];
		rows.forEach(function (e, i){
			var o = {};
			o.id = e.id;
			o.path = e.path;
			o.size = e.size;
			o.upload_user = e.upload_user;
			var d = new Date(e.upload_time);
			o.upload_time = d.getFullYear()+"-"+addZero(d.getMonth()+1)+"-"+addZero(d.getDate())+" "+addZero(d.getHours())+":"+
							addZero(d.getMinutes())+":"+addZero(d.getSeconds());
			list.push(o);
		});

		res.render("admin", {title: title[req.params.id], url: "resource", resource: list});

	});

});

router.post("/admin/resource", function (req, res){

	var form = new formidable.IncomingForm();

	form.uploadDir = "./public/upload/";

    form.parse(req, function (err, fields, files){

		var dir, path, type;

    	if(/image/gi.test(files.file.type)){

    		dir = "./public/upload/imgs/";
    		path = basePath + "upload/imgs/";
    		type = "imgs";

    	}else if(/sheet/gi.test(files.file.type)){

    		dir = "./public/upload/excel/";
    		path = basePath + "upload/excel/";
    		type = "excel";

    	}else if(/document/gi.test(files.file.type)){

    		dir = "./public/upload/word/";
    		path = basePath + "upload/word/";
    		type = "word";

    	}else if(/audio/gi.test(files.file.type)){

    		dir = "./public/upload/music/";
    		path = basePath + "upload/music/";
    		type = "music";

    	}else{
    		return res.send({target: false});
    	}

    	var newPath = dir + files.file.path.split("_")[1] + "." + files.file.name.split(".")[1];
		
		path = path + files.file.path.split("_")[1] + "." + files.file.name.split(".")[1];

    	fs.renameSync(files.file.path, newPath);

    	var STR = '"'+path+'","'+(files.file.size/1024).toFixed(2)+"KB"+'","'+'admin'+'","'+type+'"';

    	var SQL = 'INSERT INTO resource(path, size, upload_user, type) values('+STR+')';

		var read = new Read(SQL);

		read.get(function (rows){

			res.send({"target": true});

		});

    });

});

// 删除
router.post("/admin/resource/delete", function (req, res){

	// 读库
	var SQL = 'SELECT path FROM resource WHERE id="'+req.body.key+'"';

	var read = new Read(SQL);

	read.get(function (rows){

		// 删除文件
		if(fs.existsSync("./public/upload"+rows[0].path.split("upload")[1])){
			fs.unlinkSync("./public/upload"+rows[0].path.split("upload")[1]);
		}
		var SQL = 'DELETE FROM resource WHERE id="'+req.body.key+'"';
		
		// 把记录从库里面删掉
		read.get(function(){

			res.send({target: true});

		}, SQL);

	})

})

function addZero(num){
	var num = parseInt(num);

	if(num<10){
		return "0"+num;
	}else{
		return ""+num;
	}
}
