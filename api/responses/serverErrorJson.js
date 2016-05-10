module.exports = function serverErrorJson(err) {
  if (sails.config.environment !== 'production' && arguments.length !== 1) {
    sails.log.error('res.serverError() called with no or more than one arguments!');
    throw new Error('res.serverError() called with no or more than one arguments!');
  }

  var errorData = { requestUrl: this.req.originalUrl, status: 500, message: err.message };

  sails.log.error('res.serverError(): sending 500 Server Error response:\n', errorData);
  if (typeof err.stack !== 'undefined') {
    sails.log.error(err.stack.red);
  }

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'production') {
    errorData.message = undefined;
  }

  return this.res.json(500, errorData);
};
