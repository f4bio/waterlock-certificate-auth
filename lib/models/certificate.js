"use strict";
var _ = require("lodash");
var Promise = require("bluebird");


/**
 * attributes for certificate model
 * @param  {object} attributes user defined attributes
 * @return {object} template merged with attributes
 */
exports.attributes = function (attributes) {
	var _ = require("lodash");

	var template = {
		serial: "string",
		country: "string",
		state:"string",
		locality:"string",
		organization: "string",
		organizationUnit: "string",
		commonName: "string",
		emailAddress:"email",
		validityStart: "datetime",
		validityEnd: "datetime",
		fingerprint: {
			type: "string",
			size: 59
		},
		file: "string",
		owner: {
			model: "auth"
		}
	};

	return _.merge(template, attributes);
};

/**
 * used to generate a reset token along with it's time to expiry
 * @param  {object}   values
 * @param  {Function} cb
 */
exports.beforeCreate = function (values, cb) {
	if(_.isUndefined(values.file)) {
		return cb();
	}
	var fs = require("fs");
	var pem = require("pem");

	Promise.promisifyAll(pem);
	Promise.promisifyAll(fs);

	fs.readFileAsync(values.file).then(function(file) {
		Promise.join(
			pem.readCertificateInfoAsync(file).then(function(caInfo) {
				// console.log("caInfo: ", caInfo);
				return {
					serial: caInfo.serial,
					country: caInfo.country,
					state: caInfo.state,
					locality: caInfo.locality,
					organization: caInfo.organization,
					organizationUnit: caInfo.organizationUnit,
					commonName: caInfo.commonName,
					emailAddress: caInfo.emailAddress,
					validityStart: caInfo.validity.start,
					validityEnd: caInfo.validity.end
				};

			}), pem.getFingerprintAsync(file).then(function(fpInfo) {
				// console.log("fpInfo: ", fpInfo);
				return { fingerprint: fpInfo.fingerprint };

			}), function(ca, fp) {
				_.assign(values, ca);
				_.assign(values, fp);
				delete values.file;

				// console.log("values: ", values);
				return values;
			}
		).then(function(values) {
			// console.log("values: ", values);
			return cb(null, values);
		});

	}).catch(function(err) {
		return cb(err, null);
	});
};

/**
 * nothing to do for now...
 * @param  {object}   values
 * @param  {Function} cb
 */
exports.afterCreate = function (values, cb) {
	return cb();
};
