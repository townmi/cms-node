
module.exports = {
	getIndex: function *(next){
		yield next;

		yield this.render('index', { basepath : this.basePath });
	},
	getLogin: function *(next){
		yield next;

		yield this.render("login", { basepath : this.basePath });
	}
}