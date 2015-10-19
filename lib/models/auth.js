"use strict";

var _ = require("lodash");

exports.attributes = function (attr) {
	var template = {
		certificate: {
			model: "certificate",
			required: false
		},
		fingerprint: {
			type: "string",
	 		size: 59
		}
	};

	_.merge(template, attr);
	_.merge(attr, template);
};

/**
 * used to hash the password
 * @param  {object}   values
 * @param  {Function} cb
 */
exports.beforeCreate = function (values) {};

/**
 * used to update the password hash if user is trying to update password
 * @param  {object}   values
 * @param  {Function} cb
 */
exports.beforeUpdate = function (values) {};
