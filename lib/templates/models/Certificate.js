/**
 * ResetToken
 *
 * @module      :: Model
 * @description :: Describes a users reset token
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require("waterlock").models.certificate.attributes({

    /* e.g.
    nickname: 'string'
    */

  }),

  beforeCreate: require("waterlock").models.certificate.beforeCreate,
  afterCreate: require("waterlock").models.certificate.afterCreate
};
