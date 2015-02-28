var db = require('./server/db/oracle'),
    config = require('./config'),
    logger = require('./server/utils/logger'),
    Vehicle = require('./server/models/vehicle');


db.initialize(function(error, db) {
    if (error) {
        logger.fatal(error.message);
        return;
    }

    var vehicle = new Vehicle(db.handler);

    vehicle.getVehicleFullInfo(4, function(error, result) {
        if (error) {
            logger.error(error.message);
            return;
        }

        logger.debug(result);
    });
    
});