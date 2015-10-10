'use strict';
var _ = require('lodash');
var authConfig = require('./waterlock-certificate-auth').authConfig;

/**
 * TODO these can be refactored later
 * @type {Object}
 */

module.exports = function(Auth, engine){
  var def = Auth.definition;

  if(!_.isUndefined(def.fingerprint)){
    return generateScope('fingerprint', engine);
  }else{
    var error = new Error('Auth model must have a certificate attribute');
    throw error;
  }
};

function generateScope(scopeKey, engine){
  return {
    type: scopeKey,
    engine: engine,
    getUserAuthObject: function(attributes, req, cb){
      var attr = {fingerprint: attributes.fingerprint};
      attr[scopeKey] = attributes[scopeKey];

      var criteria = {};
      criteria[scopeKey] = attr[scopeKey];

      if(authConfig.createOnNotFound){
        this.engine.findOrCreateAuth(criteria, attr, cb);
      }else{
        this.engine.findAuth(criteria, cb);
      }
    }
  };
}
