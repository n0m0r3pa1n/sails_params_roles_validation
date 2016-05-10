module.exports.routes = {
  'get /': "AuthController.getLogin",
  'post /': { controller: "AuthController", action: "login", validation: "login" },
  'get /logout': "AuthController.logout",
  'get /home': { controller: "HomeController", action: "getDashboard", roles: [Roles.ADMIN] }
};
