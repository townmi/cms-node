var express = require('express');

var Read = require("../src/readSQL.js");

var app = express();
var router = express.Router();

// exports
module.exports = router;

router.get("/admin", function (req, res){
	res.render("admin");
})
