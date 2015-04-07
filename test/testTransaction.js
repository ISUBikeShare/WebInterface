/**
 *
 * Unit tests for transaction
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

describe('/transaction/', function() {

    //transaction report get
    it('get returns transaction as JSON array', function(done) {
        api.get('/transaction/')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceOf(Array);
                done();
            });
    });

});
