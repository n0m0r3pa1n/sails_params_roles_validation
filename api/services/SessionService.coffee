module.exports = (req) ->
  login: (username, password) ->
    User.findOne(username: username, isActive: true).then (user) ->
      throw new Error("ERR_INVALID_USER") if _.isEmpty(user)
      user.comparePassword(password).then (passwordMatch) ->
        throw new Error("INVALID_CREDENTIALS") unless passwordMatch

        req.session.user = user

        return user

  create: (username, password, roles) ->
    User.create({ username, password, roles })

  logout: ->
    req.session.user = null unless _.isEmpty(req.session.user )

  currentUser: ->
    req.session.user
