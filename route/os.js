/*
 * author : towne
 * version : 0.0.1
 * date : 2015.4.16
 *
*/

var fs = require("fs");

var express = require('express');

var Read = require("../src/readSQL.js");

var app = express();
var router = express.Router();
var basePath = "http://10.106.88.43:3000/";
// exports
module.exports = router;

router.get("/admin/os", function (req, res){

});
