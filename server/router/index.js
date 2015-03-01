var logger = require('./../utils/logger'), 
    Vehicle = require('./../models/vehicle');


var router = {};

router.models = {};

router.initialize = function(dbhandler, callback) {
    this.models.vehicle = new Vehicle(dbhandler);
    //no async operation yet
    callback(null, 1);
};

//uri example: /api/getVehicleById/5
router.serve = function(uri, res) {
    logger.debug(uri);
    //without paramater parsing
    this.routes.get['/api/getVehicleById/:id'].call(this, 5, res);
};


router.methods = {};

router.methods.getVehicleById = function(id, res) {
    this.models.vehicle.getVehicleById(id, function(error, vehicle) {
        if (error) {
            logger.error(error.message);
            return;
        }

        logger.debug(vehicle);
        res.end();
    })
};

//app api endpoints
router.routes = {
    get: {
    /*
        url: method
    */
        '/api/getVehicleById/:id': router.methods.getVehicleById
    },
    post: {},
    put: {},
    _delete: {}
};



module.exports = router;
