/**
 * Development environment settings
 */

module.exports = {

  connections: {
    mongodb: {
      host: process.env.DB_HOST || [
        '127.0.0.1:27171'
        // '127.0.0.1:27171',
        // '127.0.0.1:27172'
      ].join(),
      dbName: process.env.DB_NAME || 'test_123'
    }
  },

  session: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    secret: '037473f222e80958f348d1641478b026',
    key: 'sid_dev' // will be used instead of `sails.sid`
  },
  app: {
    fileUploadTempDir: '/tmp/getti-web-uploads',
    fileUploadDestDir: '/app/getti-web/uploads'
  },
  port: process.env.PORT || 3338

};
