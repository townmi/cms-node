

var sql = require("../libs/sql.js");

module.exports = {
	getIndex: function *(next){

		yield next;

		this.cookies.set('name', 'townmi');

		sql.User.build({
			name: "townmi5",
			ip: '127.0.0.1'
		}).save().then(function (user) {
			// console.log(user.get({
			//     plain: true
			// }));
		}).catch(function (err) {
			console.log(err);
		});

		yield this.render('index', { basepath : this.basePath });
	},
	getLogin: function *(next){
		yield next;
		yield this.render("login", { basepath : this.basePath });
	}
}