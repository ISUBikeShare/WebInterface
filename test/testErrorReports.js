/**
 *
 * Unit tests for Bikes
 *
 */

var should = require('chai').should();
var supertest = require('supertest');
var api = supertest('http://localhost:8080/api/');

beforeEach(function(done){
  api.get('setupdemo').end(function () {
    done();
  });
});

describe('/errorreports/', function () {

    //error report get
    it('get returns error reports as JSON array', function (done) {
        api.get('/errorreport/')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.instanceOf(Array);
                done();
            });
    });

    //error report  post
    it('post returns a 200 response meaning a error report was created', function (done) {
        var data = {
            trace: 'This is an error',
            date: Date.now(),
            dockID: 'ErrorDock',
            type: 'Client'
        };

        api.post('/errorreport/')
            .send(data)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.status.should.equal(200);
                done();
            });
    });

    //error report get with dockID
    it('get with a dock id returns the bike as a Json object', function (done) {
        var data = {
            dockID: 'ErrorDock'
        };
        api.get('/errorreport/')
            .send(data)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.instanceOf(Array);
                done();
            });
    });

});
