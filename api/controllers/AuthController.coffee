SessionService = require("../services/SessionService")

module.exports =
  getLogin: (req, res) ->
    SessionService(req).create("gmirchev90", "1234", Roles.ADMIN)
    res.view("login")

  login: (req, res) ->
    username = req.param("username")
    password = req.param("password")

    SessionService(req).login(username, password)
    .then -> res.redirect("/home")
    .catch (e) ->
      console.log(e)
      res.view("login", { error: message: "Wrong username or password!" })

  logout: (req, res) ->
    SessionService(req).logout()
    res.redirect("/")
