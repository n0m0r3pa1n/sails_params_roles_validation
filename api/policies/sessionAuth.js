/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
function userMissesRole(userRoles, role){
  return _.indexOf(userRoles, role) == -1;
}

function routeRequiresRoles(allowedRoles) {
  return !_.isEmpty(allowedRoles)
}

function userIsLoggedIn(req) {
  return req.session.user != undefined && req.session.user != null;
}

module.exports = function isAuthenticated(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller

  if(_.isEmpty(req.session) || _.isEmpty(req.session.user)) {
    return res.forbidden('You are not permitted to perform this action.');
  }

  var allowedRoles = req.options.roles;
  var user = req.session.user

  if(routeRequiresRoles(allowedRoles) && userIsLoggedIn(req)) {
    for(var index in allowedRoles) {
      var role = allowedRoles[index]
      if(userMissesRole(user.roles, role)) {
        return res.serverError(new Error("You don't have the required role!"));
      }
    }
  }

  if (userIsLoggedIn(req)) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};
