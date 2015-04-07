/**
 *
 * Unit tests for Docks
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

describe('/dock/', function() {

    //dock get
    it('get returns docks as JSON array', function(done) {
        api.get('/dock/')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceOf(Array);
                done();
            });
    });

    //dock post
    it('post returns a 200 response meaning a dock was created', function(done) {
        var data = {
            dockID: 'NewDockID',
            location: 'A galaxy far, far away',
            status: true
        };

        api.post('/dock')
            .send(data)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.status.should.equal(200);
                done();
            });
    });

    //dock get with dockID
    it('get with a dock id returns the bike as a Json object', function(done) {
        var data = {
            dockID: 'NewDockID'
        };
        api.get('/bike/')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceOf(Array);
                done();
            });
    });

    //dock put
    it('put returns a 200 response meaning a dock was updated', function(done) {
        var data = {
            location: 'NewDockLocation',
            state: 'in',
            bikeID: null
        };

        api.put('/dock/NewDockID')
            .send(data)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.status.should.equal(200);
                done();
            });
    });
});
