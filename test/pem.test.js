var pem = require('pem');
var fs = require("fs");
var Promise = require("bluebird");
Promise.promisifyAll(pem);
Promise.promisifyAll(fs);

function pemTest() {
	var f = "../../certs/ca-crt.pem";
	//pem.readCertificateInfo(f, function(err, ca) {
	//	console.log(err);
	//	console.log(ca);
	//});
	fs.readFileAsync(f).then(function (file) {
		pem.readCertificateInfoAsync(file).then(function (caInfo) {
			console.log("caInfo: ", caInfo);
			this.certificate = caInfo;
		}).catch(function (err) {
			console.log("ERROR caInfo: ", err);
			this.certificate = err;
		});

		pem.getFingerprintAsync(file).then(function (fpInfo) {
			console.log("fpInfo: ", fpInfo);
			this.fingerprint = fpInfo;
		}).catch(function (err) {
			console.log("ERROR fpInfo: ", err);
			this.fingerprint = err.message;
		});
	}).catch(function (err) {
		console.log("ERROR file: ", err);
		this.certificate = undefined;
		this.fingerprint = undefined;
	});

	this.test = "test";
	this.should = require('should');
	return this;
}

