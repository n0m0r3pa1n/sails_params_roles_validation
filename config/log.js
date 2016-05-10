/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#/documentation/concepts/Logging
 */

var winston = require('winston');
var moment = require('moment');

var getCustomLogger = function getCustomLogger (logFileName) {
  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: 'silly',
        colorize: true,
        timestamp: function () {
          return moment().format('YYYY-MM-DD HH:mm:ss.SSS'); // '2016-01-13 16:45:14.370'
        }
      }),
      new winston.transports.File({
        level: 'info',
        colorize: true,
        timestamp: function () {
          return moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'); // ISO8601: '2016-01-13T16:45:14.370+02:00'
        },
        json: false,
        filename: logFileName,
        maxsize: 1024 * 1024 * 5 // 5 MiB
      })
    ]
  });
};

// configure log filename depending on environment
/*eslint-disable indent */
var logFileName = (function(env) {
  switch (env) {
    case 'development':
    default:
      return './web-shop-cms-dev.log';
  }
})(process.env.NODE_ENV);
/*eslint-enable indent */


module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to 'silent' to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/

  filename: logFileName, // custom property to expose log filename for use by other code

  level: 'info',
  colors: false, // get clean logs without prefixes or color codings
  custom: getCustomLogger(logFileName)

};
