/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function modelValidation(req, res, next) {
  var schema = require('../validation/' + req.options.validation)
  if (!schema) {
    return res.serverErrorJson(new Error("Missing validation schema for " + req.options.controller + " " + req.options.action))
  }
  Joi.validate(req.body, schema.body, function (err, value) {
    if (err != null) {
      error = err.details[0]
      error.statusCode = 400
      return res.badRequest({ csrf: req.csrfToken(), error: error }, req.options.action);
    } else {
      return next();
    }
  })
};
