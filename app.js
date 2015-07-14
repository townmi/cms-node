/**
 * Module dependencies.
 */
var path = require("path");

var logger = require('koa-logger');

var router = require('koa-router')();

var parse = require('koa-body');

var koa = require('koa');

var app = koa();

var render = require('koa-ejs');

var hbs = require('koa-hbs');


// "database"

var posts = ["1","2"];

// middleware

app.use(logger());

// setup views mapping .html
// to the swig template engine
app.use(hbs.middleware({
    viewPath: __dirname + '/views'
}));

// router middleware

// app.use(router.get('/', list));
// app.use(router.get('/post/new', add));
// app.use(router.get('/post/:id', show));
// app.use(router.post('/post', create));


router.get('/', list);
router.get('/post/new', add);
router.get('/post/:id', show);
router.post('/post', create);

app.use(router.routes()).use(router.allowedMethods());

// route definitions

/**
 * Post listing.
 */

function *list() {
    yield this.render('list', { a : "index" });
}

/**
 * Show creation form.
 */

function *add() {
  this.body = yield this.render('new');
}

/**
 * Show post :id.
 */

function *show(id) {
  var post = posts[id];
  if (!post) this.throw(404, 'invalid post id');
  this.body = yield this.render('show', { post: post });
}

/**
 * Create a post.
 */

function *create() {
  var post = yield parse(this);
  var id = posts.push(post) - 1;
  post.created_at = new Date;
  post.id = id;
  this.redirect('/');
}

// listen

app.listen(3000);
console.log('listening on port 3000');