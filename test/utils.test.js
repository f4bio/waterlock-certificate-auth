var testHelper = require('./test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock_certificate;
var proxyquire = testHelper.proxyquire;

describe('utils', function () {
	var utils = proxyquire("../lib/utils",
		{
			'./waterlock': waterlock,
			'path': {
				normalize: function (str) {
					return __dirname + "/ca-crt.pem";
				}
			}
		});
	//
	describe('getCertificate', function () {
		it('should exist', function (done) {
			utils.should.have.property('getCertificate');
			done();
		});

		it('should return certificate', function (done) {
			utils.getCertificate.then(function(ca) {
				//console.log("-->", ca);
				ca.should.be.Object;
			}).catch(function(err) {
				//console.log("-->", err);
			}).finally(function() {
				done();
			});
		});
	});

	describe('getFingerprint', function () {
		it('should exist', function (done) {
			utils.should.have.property('getFingerprint');
			done();
		});

		it('should return fingerprint', function (done) {
			utils.getFingerprint.then(function(ca) {
				//console.log("-->", ca);
				ca.should.be.String;
			}).finally(function() {
				done();
			});
		});
	});
});
