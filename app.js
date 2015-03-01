var db = require('./server/db/oracle'),
    config = require('./config'),
    logger = require('./server/utils/logger'),
    server = require('./server'),
    async = require('async');

async.waterfall([
    function(callback) {
        db.initialize(callback);
    },
    function(db, callback) {
        server.initialize(db.handler, callback);
    }
    ], function(error, result) {
        if (error) {
            logger.fatal(error.message);
            return;
        }

        server.listen(config.server.port);
        logger.info('Server started at port ' + config.server.port);
});
