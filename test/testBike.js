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

describe('/bike/', function() {

    //bike get
    it('get returns bikes as a JSON array', function(done) {
        api.get('/bike/')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) return done(err);
            res.body[0].bikeID.should.be.equal('6A004A1589BC');
            res.body[0].dockID.should.be.equal('202481599488101');
            res.body[0].state.should.be.equal('in');
            res.body[0].isDamaged.should.be.equal(false);
            res.body.should.be.instanceOf(Array);
            done();
        });
    });

    //bike post
    it('post returns a 200 response meaning a bike was created', function(done) {
        var data = {
            bikeID: '123456789',
            dockID: 'ABCDEFGHIJK'
        };
        var firstNumber = 0;
        api.get('/bike/')
        .end(function (err, res) {
            if (err) return done(err);
            var firstNumber = res.body.length
            api.post('/bike')
            .send(data)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                api.get('/bike/')
                .end(function (err, res) {
                  if (err) return done(err);
                  res.body.length.should.be.equal(++firstNumber);
                  done();
                });
            });
        });
    });

    //bike get with bikeID
    it('get with a bike id returns the bike as a JSON object', function(done) {
        api.get('/bike/6A004A1589BC')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) return done(err);
            res.body.bikeID.should.be.equal('6A004A1589BC');
            res.body.dockID.should.be.equal('202481599488101');
            res.body.state.should.be.equal('in');
            res.body.isDamaged.should.be.equal(false);
            done();
        });
    });

    //bike put
    it('put updates the bike', function(done) {
      data = {
          dockID: "new dockID",
          location: "New Location",
          isDamaged: false,
          state: "in"
      };
      api.get('/bike/6A004A1589BC')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
          if (err) return done(err);
          var initialBike = res.body;
          api.put('/bike/6A004A1589BC')
          .send(data)
          .expect(200)
          .end(function(err, res) {
              if (err) return done(err);
              api.get('/bike/6A004A1589BC')
              .expect(200)
              .expect('Content-Type', /json/)
              .end(function(err, res) {
                if (err) return done(err);
                var finalBike = res.body;
                finalBike.bikeID.should.be.equal(initialBike.bikeID);
                finalBike.dockID.should.be.equal(data.dockID);
                finalBike.isDamaged.should.be.equal(data.isDamaged);
                finalBike.state.should.be.equal(data.state);
                done();
              });
          });
      });
    });

});
