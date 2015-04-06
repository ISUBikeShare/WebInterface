/**
 *
 * Unit tests for Bikes
 *
 */

var should = require('chai').should();
var supertest = require('supertest');
var api = supertest('http://localhost:8080/api/');


describe('/bike/', function() {

    //bike get
    it('get returns bikes as JSON array', function(done) {
        api.get('/bike/')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceOf(Array);
                done();
            });
    });

    //bike post
    it('post returns a 200 response meaning a bike was created', function(done) {
        var data = {
            bikeID: 'NewBikeHere',
            dockID: 'dockID'
        };

        api.post('/bike')
            .send(data)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.status.should.equal(200);
                done();
            });
    });

    //bike get with bikeID
    it('get with a bike id returns the bike as a Json object', function(done) {
        var data = {
            bikeID: 'NewBikeHere'
        };
        api.get('/bike/')
            .send(data)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceOf(Array);
                done();
            });
    });

    //bike put
    it('put returns a 200 response meaning a bike was updated', function(done) {
        var data = {
            dockID: 'NewDockID',
            state: 'In'
        };

        api.put('/bike/NewBikeHere', data)
            .send(data)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.status.should.equal(200);
                done();
            });
    });
});