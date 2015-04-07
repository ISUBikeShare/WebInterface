/**
 *
 * Unit tests for the Application
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

describe('/checkout/', function() {

    //basic checkout
    it('post returns a 200 meaning a successful checkout', function(done) {
        data = {
            cardString: '1234567',
            dockID: 'NewDockID',
            bikeID: 'NewBikeHere'
        };

        api.post('/checkout/')
            .send(data)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.status.should.equal(200);
                done();
            });
    });
});

describe('/checkin/', function() {

    //basic check in
    it('post returns a 200 meaning a successful checkin', function(done) {
        data = {
            dockID: 'NewDockID',
            bikeID: 'NewBikeHere'
        };

        api.post('/checkin/')
            .send(data)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.status.should.equal(200);
                done();
            });
    });
});
