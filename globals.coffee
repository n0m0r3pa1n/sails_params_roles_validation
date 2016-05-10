dateFormat = require("dateformat")
Date.prototype.format = (formatter) ->
  dateFormat(@, formatter)

global._ = require("lodash")
global.Promise = require("bluebird")
global.Roles =
  ADMIN: "ADMIN"
  RETAILER: "RETAILER"

global.Joi = require("joi")
global.mongoose = require("mongoose")
global.mongoose.Promise = Promise
global.ObjectId = mongoose.Types.ObjectId

global.User = require("./api/models/user")

global.ValidationError = class ValidationError extends Error
  name: "ValidationError"
  constructor: (@message, data) ->
    @data = data if data?
    super(@message)
    Error.captureStackTrace(@, @constructor)
