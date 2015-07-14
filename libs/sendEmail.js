/*
 * author : towne
 * version : 0.0.1
 * date : 2015.4.17
 *
*/

var nodemailer = require('nodemailer');

module.exports = SendEmail;

function SendEmail(config){
	this.opt = {};
	this.auth = {};
	if(config){
		this.service = config.service ? config.service : "qq";
		if(config.auth){
			this.auth.user = config.auth.user ? config.auth.user : "xxxxxxx.qq.com";
			this.auth.pass = config.auth.pass ? config.auth.pass : "xxxxxxx";
		}else{
			this.auth = {
    			// 1047887945
        		user: "xxxxxxxx@qq.com", // 账号
        		pass: "xxxxxx" // 密码	
			}
		}
	}else{
		this.server = "qq";
		this.auth = {
    		// 1047887945
        	user: "xxxxxxxx@qq.com", // 账号
        	pass: "xxxxxx" // 密码	
		}
	}
	// 初始化服务
	this.init();
}

SendEmail.prototype.init = function() {
	this.transporter = nodemailer.createTransport({
		service: this.service,
		auth: {
			user: this.auth.user,
			pass: this.auth.pass
		}
	});
}

SendEmail.prototype.send = function (opt, cb){

	// 配置参数
	this.opt.from = opt.from ? opt.from : "默认<xxxxxxxxxx@qq.com>";
	this.opt.subject = opt.subject ? opt.subject : "默认配置";
	this.opt.text = opt.text ? opt.text : "默认配置";
	this.opt.html = opt.html ? opt.html : "<h2>默认配置</h2>";

	if(opt.to){
		this.opt.to = opt.to;
	}else{
		return cb({go: false, info: "目标邮箱为空"});
	}

	// sendEmail
	this.transporter.sendMail(this.opt, function(error, info){
	    if(error){
	    	return cb({go:false, info: error});
	    }else{
	        console.log('Message sent: ' + info.response);
	        return cb({go: true, info: info});
	    }
	});

}


