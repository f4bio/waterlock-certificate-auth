"use strict";
//var bcryptjs = require('bcryptjs');

/**
 * Login action
 */
module.exports = function (req, res) {

	waterlock.cycle.loginSuccess(req, res, {});

	var scope = require("../../scope")(waterlock.Auth, waterlock.engine);
	var params = req.params.all();

	var PREFIX = "waterlock-certificate-auth.controller.login():";

	if (typeof params[scope.type] === "undefined" || typeof params.certificate === "undefined") {
		waterlock.cycle.loginFailure(req, res, null,
			{error: "Invalid scop '" + scope.type + "' or certificate"});
	} else {
		//var pass = params.certificate;
		scope.getUserAuthObject(params, req, function (err, user) {
			if (err) {
				if (err.code === "E_VALIDATION") {
					return res.status(400).json(err);
				} else {
					return res.serverError(err);
				}
			}
			if (user) {
				waterlock.cycle.loginSuccess(req, res, user);
				// TODO:
				//if (bcrypt.compareSync(fingerprint, user.auth.fingerprint)) {
				//	waterlock.cycle.loginSuccess(req, res, user);
				//} else {
				//	waterlock.cycle.loginFailure(req, res, user,
				//		{error: 'Invalid scop \'' + scope.type + '\' or certificate\''});
				//}

			} else {
				//TODO redirect to register
				waterlock.cycle.loginFailure(req, res, null, {error: "user not found"});
			}
		});
	}
};
