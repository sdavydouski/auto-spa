var db = require('./server/db/oracle'),
    config = require('./config'),
    logger = require('./server/utils/logger');

db.initialize(function(error, db) {
    if (error) {
        logger.fatal(error.message);
        return;
    }

    logger.debug(db.pool);

    db.pool.getConnection(function(error, connection) {
        if (error) {
            logger.fatal(error.message);
            return;
        }

        connection.execute('select * from vehicles where id = 3', function(error, result) {
            if (error) {
                logger.error(error.message);
                return;
            }

            logger.debug(result.rows);
        });
        
    });
    
});



/*oracledb.getConnection(
    {
        user: config.db.user,
        password: config.db.password,
        connectString: config.db.connectString
    }, function(err, connection) {
        if (err) {
            logger.fatal(err.message);
            return;
        }

        logger.debug('Connection has been successfully established!');
        
        connection.execute('select * from engine_transmission_info', function(err, result) {
		    if (err) {
			    logger.error(err.message);
				return;
			}

			console.log(result.rows);
		});
    }
);*/