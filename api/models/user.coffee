bcrypt = require("bcrypt")

SALT_WORK_FACTOR = 10

UserSchema = new mongoose.Schema
  username:
    type: String
    required: true
    index: true
  password:
    type: String
    required: true
  roles:
    type: [String]
    required: true
  isActive:
    type: Boolean
    required: true
    index: true
    default: true


UserSchema.pre "save", (next) ->
  user = @

  # only hash the password if it has been modified (or is new)
  return next() unless user.isModified("password")

  # hash the password
  bcrypt.hash user.password, SALT_WORK_FACTOR, (err, passwordHash) ->
    return next(err) if err

    # override the cleartext password with the hashed one
    user.password = passwordHash
    next()


UserSchema.methods.comparePassword = (candidatePassword) ->
  Promise.promisify(bcrypt.compare)(candidatePassword, @password)


module.exports = mongoose.model("User", UserSchema)
