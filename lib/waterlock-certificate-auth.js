"use strict";

var path = require("path");
var _ = require("lodash");

exports.authType = "certificate";

/**
 * [installPath description]
 * @type {[type]}
 */
//exports.installPath = path.normalize(path.join(__dirname, "..", "..", ".."));
exports.installPath = path.normalize(__dirname+"/../../../");
/**
 * Conditionally export mail trasport data if
 * user has opted for password tokens i.e. password
 * resets
 */
//var configPath = path.normalize(path.join(__dirname, "..", "..", "..", "config", "waterlock.js"));
var configPath = path.normalize(__dirname+"/../../../config/waterlock.js");
var wlconfig = require(configPath).waterlock;
var method = {};
if (_.isArray(wlconfig.authMethod)) {
	method = _.findWhere(wlconfig.authMethod, {name: "waterlock-certificate-auth"});
} else {
	method = wlconfig.authMethod;
}

/**
 * the entire config
 */
exports.config = wlconfig;

/**
 * the config for this method
 */
exports.authConfig = method;

//if (_.isObject(method) && !_.isUndefined(method.certificate) &&
//	method.certificate.file) {
//}

/**
 * [actions description]
 * @type {[type]}
 */
exports.actions = require("./controllers");

/**
 * [model description]
 * @type {[type]}
 */
exports.model = require("./models");
