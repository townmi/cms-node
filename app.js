var http = require('http');
var path = require("path");

var express = require('express');
var favicon = require('serve-favicon');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./route/index');
var admin = require('./route/admin');
var resource = require("./route/resource");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.disable("x-powered-by");

// set port
app.set('port', process.env.PROT || 3000);

// body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))


app.use(cookieParser('keyboard cat'));
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({ 
    secret: 'keyboard cat', 
    key: 'sid', 
    cookie: { secure: false }
}));

// favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// route
app.get("/", index);


// 后台路由
app.get("/admin", admin);
// 资源管理
app.get("/admin/resource", resource);
app.post("/admin/resource", resource);
app.post("/admin/resource/delete", resource);
app.get("/admin/resource/:id", resource)



// 404
app.use(function(req, res, next){
	var err = new ERROR('NOT FOUND');
	err.status = 404;
	next(err);
});


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port' + app.get('port'));
});