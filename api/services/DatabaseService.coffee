logger = sails.log

createConnectionUri = (host, port, dbName) ->
  "mongodb://#{host}" + (if port then ":#{port}" else "") + "/#{dbName}"


module.exports =

  mongoConnect: (dbConnSettings) ->
    connectionUri = createConnectionUri(dbConnSettings.host, null, dbConnSettings.dbName)
    connectionOptions =
      autoIndex: sails.config.environment is "development"

    mongoose.connection.on "connected", ->
      logger.info("DatabaseService: Mongoose connected to `#{connectionUri}`")

    mongoose.connection.on "error", (err) ->
      logger.error("DatabaseService: Mongoose connection error", err)

    mongoose.connection.on "disconnected", ->
      logger.warn("DatabaseService: Mongoose disconnected from `#{connectionUri}`")

    process.on "SIGINT", =>
      logger.warn("DatabaseService: SIGINT received")
      @mongoDisconnect().then ->
        process.exit(0)

    logger.verbose("DatabaseService: Mongoose connecting to `#{connectionUri}`")
    dbConnect = Promise.promisify(mongoose.connect, context: mongoose)
    dbConnect(connectionUri, connectionOptions)
      .then ->
        mongoose.connection
      .catch (err) ->
        logger.error("DatabaseService: Mongoose could not connect", err)
        process.exit(0)


  mongoDisconnect: ->
    { host, port, name } = mongoose.connection
    connectionUri = createConnectionUri(host, port, name)
    logger.verbose("DatabaseService: Mongoose disconnecting from `#{connectionUri}`")

    mongoose.connection.close()
