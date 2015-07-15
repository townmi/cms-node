/**
 * [依赖模块]
 * @type {[type]}
 */
var path = require("path");
var logger = require('koa-logger');
var router = require('koa-router')();
var parse = require('koa-body');
var koa = require('koa');
var app = koa();
var render = require('koa-ejs');
var indexRoute = require("./routes/index.js");

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
router.get('/', indexRoute.getIndex);
router.get('/login', indexRoute.getLogin);

app.use(router.routes()).use(router.allowedMethods());


app.use(function *(next){
	this.basePath = "http://10.100.142.95/admin2/build/";
	yield next;
});

/**
 * [监听端口绑定]
 */
app.listen(3000);
console.log('listening on port 3000');

