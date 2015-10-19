"use strict";
var _ = require("lodash");
var authConfig = require("./waterlock-certificate-auth").authConfig;

/**
 * TODO these can be refactored later
 * @type {Object}
 */

module.exports = function(Auth, engine) {
	var def = Auth.definition;

	if (!_.isUndefined(def.certificate)) {
		return generateScope("certificate", engine);

	} else {
		var error = new Error("Auth model must have certificate attribute");
		throw error;
	}
};

function generateScope(scopeKey, engine) {
	return {
		type: scopeKey,
		engine: engine,

		getUserAuthObject: function(attributes, req, cb) {
			var attr = {fingerprint: attributes.fingerprint};
			// TODO:
			// attr[scopeKey] = attributes[scopeKey];

			// var criteria = {};
			// criteria[scopeKey] = attr[scopeKey];

			this.engine.findAuth(attr, cb);
		}
	};
}
