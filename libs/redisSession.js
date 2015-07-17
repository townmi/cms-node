"use strict";
var redis = require("redis");

var client = redis.createClient(6379, "10.100.142.95");

client.on("error", function (err) {
	console.error(err);
});

module.exports = client;