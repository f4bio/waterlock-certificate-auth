'use strict';

var pem = require("pem");
var fs = require("fs");
var Promise = require("bluebird");
var path = require('path');

Promise.promisifyAll(pem);
Promise.promisifyAll(fs);

/**
 * Returns the email jade template as html
 * @param  {Token} token
 * @return {String} html
 */
exports.getCertificate = new Promise(function (resolve, reject) {
	var config = require("./waterlock-certificate-auth").config;
	var authConfig = require("./waterlock-certificate-auth").authConfig;
	if (typeof config === "undefined") {
		throw "No config file defined, try running [waterlock install config]";
	}
	var caFile = path.normalize(__dirname + '../../../' + authConfig.certificate.file);

	fs.readFileAsync(caFile).then(function (file) {
		pem.readCertificateInfoAsync(file).then(function (caInfo) {
			//console.log("caInfo: ", caInfo);
			//return caInfo;
			resolve(caInfo)
		}).catch(function (err) {
			//console.log("ERROR caInfo: ", err);
			//return err;
			reject(err);
		});
	}).catch(function (err) {
		//console.log("ERROR file: ", err);
		//return err;
		reject(err);
	});
});

exports.getFingerprint = new Promise(function (resolve, reject) {
	var config = require("./waterlock-certificate-auth").config;
	var authConfig = require("./waterlock-certificate-auth").authConfig;
	if (typeof config === "undefined") {
		throw "No config file defined, try running [waterlock install config]";
	}

	var caFile = path.normalize(__dirname + '../../../' + authConfig.certificate.file);

	fs.readFileAsync(caFile).then(function (file) {
		pem.getFingerprintAsync(file).then(function (fpInfo) {
			//console.log("fpInfo: ", fpInfo);
			resolve(fpInfo.fingerprint);
		}).catch(function (err) {
			//console.log("ERROR fpInfo: ", err);
			reject(err);
		});

	}).catch(function (err) {
		//console.log("ERROR file: ", err);
		reject(err);
	});
});
