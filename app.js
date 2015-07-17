"use strict";
/**
 * [依赖模块]
 * @type {[type]}
 */
var path 		= require("path");
var logger 		= require('koa-logger');
// var session 	= require('koa-session');
var router 		= require('koa-router')();
var parse 		= require('koa-body');
var koa 		= require('koa');
var app 		= koa();
var render 		= require('koa-ejs');
var indexRoute 	= require("./routes/index.js");


var session = require('koa-generic-session');
var redisStore = require('koa-redis');

var KeyGrip = require('keygrip');


/**
 * [启用日志]
 */
app.use(logger());

/**
 * [模版引擎设置]
 * @type {[type]}
 */
render(app, {
	root: path.join(__dirname, 'views'),
	layout: false,
	viewExt: 'html'
});

/**
 * [路由转发列表]
 */
router.get("/", indexRoute.getIndex);
router.get("/login", indexRoute.getLogin);
router.post("/")

app.use(router.routes()).use(router.allowedMethods());

/**
 * [初始化参数｜redis消息存储中间件]
 * @param {String} 	this.basePath 	[全局static文件路径]
 * @param {Boolean} this.authLogin	[redis记录是否存在: false(不存在), true(存在)]
 */
app.use(function *(next){

	console.log(33333)
	this.basePath = "http://10.100.142.95/admin2/build/";

	yield next;
	

});


// app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

// app.name = 'koa-session-test';
app.keys = ['keys', 'keykeys'];

// app.use(session({key: "cms-node"},app));

// console.log(redisStore({host: "10.100.142.95", port: 6379}))

// app.use(session({
// 	key : "cms-node",
// 	store : redisStore({host: "10.100.142.95", port: 6379})
// }));

/**
 * [监听端口绑定]
 */
app.listen(3000);
console.log('listening on port 3000');

