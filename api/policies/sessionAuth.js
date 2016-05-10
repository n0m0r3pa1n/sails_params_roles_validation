/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function isAuthenticated(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller

  var allowedRoles = req.options.roles;
  var user = req.session.user
  if(!_.isEmpty(allowedRoles) && req.session.user != undefined) {
    for(i in allowedRoles) {
      var role = allowedRoles[i]
      if(_.indexOf(user.roles, role) == -1) {
        return res.serverError(new Error("You don't have the required role!"));
      }
    }
  }

  if (req.session.user) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};
