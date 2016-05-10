module.exports.body = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.number().required(),
  _csrf: Joi.string().required()
})
