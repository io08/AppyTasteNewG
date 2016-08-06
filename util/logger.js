var cfg = require('../config.js')
  , winston = require('winston');

require('winston-loggly');
require('winston-mongodb').MongoDB;

winston.emitErrs = true;
winston.cli();

var logger = null;

// enable MongoDB and file logging for prod
if (cfg.ENV == 'PROD')
    logger = new winston.Logger({
        transports: [
            new winston.transports.MongoDB({
                level: 'debug',
                db: cfg.MongoDBLog.connectionString
            }),
            new winston.transports.File({
                level: 'debug',
                filename: cfg.Log.file,
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            }),
            new winston.transports.Loggly(cfg.loggly)
        ],
        exitOnError: false
    });

// enable console logging for dev
if (cfg.ENV == 'DEV') {
    logger = new winston.Logger({
        transports: [
            new winston.transports.MongoDB({
                level: 'debug',
                db: cfg.MongoDBLog.connectionString
            }),
            new winston.transports.File({
                level: 'debug',
                filename: cfg.Log.file,
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            }),
            new winston.transports.Loggly(cfg.loggly)
        ],
        exitOnError: false
    });
}
    
logger.cli();
logger.pdata = function (str, data) {
    logger.debug(str);
    return logger.data(data);
};

module.exports = logger;
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};