var should = require('chai').should();
var supertest = require('supertest');
var api = supertest('http://localhost:8080/api/');


//Bike tests
describe('/bike/', function () {

	//bike get
	it('get returns bikes as JSON array', function (done) {
		api.get('/bike/')
		.expect(200)
		.expect('Content-Type', /json/)
		.end(function(err, res) {
			if (err) return done(err);
			res.body.should.be.instanceof(Array);
			done();
		});
	});
});