/*
 * author : towne
 * version : 0.0.1
 * date : 2015.4.16
 *
*/

var should = require('should');
var app = require('../app');
var supertest = require('supertest');
// superagent 的 API 进行调用
var request = supertest(app);

describe('router testing', function () {

    // it('router login get', function (done) {
    //     request.get('/admin/login')
    //         .end(function(err, res){
    //             if (err) throw err;
    //             should.exist(res.headers);
    //             done();
    //         });
    // });

    it('router login post', function (done) {
        request.post("/admin/login")
            .send({
                username : 'test',
                password: 'test1234',
            })
            .expect(200, function (err, res) {
                res.pass.should.containEql("notok");
                done(err);
            });
    });
});