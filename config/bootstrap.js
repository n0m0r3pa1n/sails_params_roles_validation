/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

/*global sails,DatabaseService,Promise,mongoose*/

require('../globals');

module.exports.bootstrap = function bootstrap(bootstrapCallback) {
  DatabaseService.mongoConnect(sails.config.connections.mongodb);

  // Configure Mongoose
  mongoose.set('debug', process.env.MONGOOSE_DEBUG === '1');

  // Configure Bluebird
  if (process.env.NODE_ENV !== 'production') {
    Promise.config({
      longStackTraces: true,
      warnings: {
        wForgottenReturn: false
      }
    });
  }
  Promise.onPossiblyUnhandledRejection(sails.log.error.bind(sails.log.error, 'onPossiblyUnhandledRejection'));

  // Tweak express/connect headers
  sails.hooks.http.app.disable('etag'); // disable generation of ETag headers
  sails.hooks.http.app.disable('x-powered-by'); // remove "X-Powered-By: Express" response header (security)

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap! (otherwise your server will never lift, since it's waiting on the bootstrap)
  bootstrapCallback();
};
