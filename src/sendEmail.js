/*
 * author : towne
 * version : 0.0.1
 * date : 2015.4.17
 *
*/

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
    	// 1047887945
        user: "xxxxxxxx@qq.com", // 账号
        pass: "xxxxxx" // 密码
    }
});

var mailOptions = {
    from: 'TEST <xxxxxxxxx@qq.com>', // sender address
    to: req.body.email, // list of receivers
    subject: 'Hello World✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b> <b>form Nodejs ✔</b>' // html body
}

// console.log(req.body);
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        // console.log(error);
        res.send(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});