"use strict";
/**
 * [依赖模块]
 * @type {[type]}
 */
var co 		= require("co");
var sql 	= require("../libs/sql.js");
var redis 	= require("../libs/redisSession.js");
var md 		= require("../libs/md5.js");
var app 	= require("koa")();

var authTokenValue,
	promiseRedis;

module.exports = {
	getIndex: function *(next){

		var self = this;

		yield next;

		if(!/auth_token/gi.test(this.request.header.cookie)){
			authTokenValue = md(Date.now()+"");
			this.cookies.set('auth_token', authTokenValue);

			promiseRedis = new Promise(function(success, error){
				redis.set(authTokenValue, "", function (err, res) {
					err && error(err);
					success(res);
				});
			});
			
			promiseRedis.then(function (res) {
				console.log(res);
				
			}, function (err) {
				console.log(err);
			});

		}else{
			this.request.header.cookie.split(";").forEach(function (e, i) {
				if(e.split("=")[0]==="auth_token"){
					return authTokenValue = e.split("=")[1];
				}
			});

			promiseRedis = new Promise(function(success, error){
				redis.get(authTokenValue, function (err, res) {
	    			err && error(err);
					success(res);
				});
			});

			promiseRedis.then(function (res) {
				if(res != null && !res){
					self.render("login", { basePath : self.basePath });
				}else{
					self.render('index', { basePath : self.basePath });
				}
			}, function (err) {
				console.log(err);
			});

		}


		// sql.User.build({
		// 	name: "townmi5",
		// 	ip: '127.0.0.1'
		// }).save().then(function (user) {
		// 	// console.log(user.get({
		// 	//     plain: true
		// 	// }));
		// }).catch(function (err) {
		// 	// console.log(err);
		// });

		// yield this.render('index', { basePath : this.basePath });
	},
	getLogin: function *(next){
		this.basePath = "http://10.100.142.95/admin2/build/";
		yield this.render("login", { basePath : this.basePath });
	}
}