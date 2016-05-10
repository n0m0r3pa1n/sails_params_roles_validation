SessionService = require("../services/SessionService")

module.exports =
  getLogin: (req, res) ->
    res.view("login", { csrf: req.csrfToken() })

  login: (req, res) ->
    console.log("Login");
    username = req.param("username")
    password = req.param("password")

#    SessionService(req).create(username, password)
    SessionService(req).login(username, password)
    .then -> res.redirect("/home")
    .catch ->
      res.view("login", { csrf: req.csrfToken(), error: message: "Wrong username or password!" })

  logout: (req, res) ->
    SessionService(req).logout()
    res.redirect("/")
