module.exports.routes = {
  'get /': "AuthController.getLogin",
  'post /': { controller: "AuthController", action: "login", validation: "login" },
  'get /logout': "AuthController.logout",
  'get /analytics': { controller: "HomeController", action: "getDashboard", roles: [Roles.RETAILER] }
};
