"use strict";
var _ = require("lodash");

/**
 * Login action
 */
module.exports = function(req, res) {

	var scope = require("../../scope")(waterlock.Auth, waterlock.engine);
	var params = req.connection;

	//var PREFIX = "waterlock-certificate-auth.controller.login():";

	if (_.isUndefined(params) || _.isUndefined(params.getPeerCertificate())) {
		//console.log(PREFIX, req.connection.getPeerCertificate());
		waterlock.cycle.loginFailure(req, res, null,
			{error: "Invalid scope '" + scope.type + "' or no certificate found"});
	} else {
		var cert = params.getPeerCertificate();
		scope.getUserAuthObject(cert, req, function(err, user) {
			if (err) {
				console.log(PREFIX, err);
				if (err.code === "E_VALIDATION") {
					return res.badRequest(err);
				} else {
					return res.serverError(err);
				}
			}
			if (user) {
				if (cert.fingerprint === user.auth.fingerprint) { // not really nessesary I guess?!
					waterlock.cycle.loginSuccess(req, res, user);
				} else {
					waterlock.cycle.loginFailure(req, res, user,
						{error: "Invalid fingerprint '" + cert.fingerprint + "'"});
				}
			} else {
				waterlock.cycle.loginFailure(req, res, null, {error: "fingerprint or user not found"});
			}
		});
	}
};
