var express = require('express');
var mysql = require("mysql");
var config = require("../config/config.js");
var app = express();
var router = express.Router();

// exports
module.exports = router;

var pool = mysql.createPool({
	connectionLimit : 10,
	host : config.host,
	port : config.port,
	user : config.user,
	database : 'cms',
	password : config.password,
	multipleStatements : true
})


router.get("/", function (req, res){

	

});
