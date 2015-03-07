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
router.serve = function(uri, req, res) {
    logger.debug(uri);
    var array = uri.split('/');         //example: ["", "api", "getVehicleById", "42"]
    switch (req.method) {
        case 'GET':
            if ( this.routes.get[array[2]] ) {
                this.routes.get[array[2]].call(this, array[3], res);
            }
            else {
                this.methods.handleError(new Error('Wrong GET method!'), 400, res);
            }
            break;
        case 'POST':
            logger.debug('POST method');
            res.end();
            break;
        case 'PUT':
            logger.debug('PUT method');
            res.end();
            break;
        case 'DELETE':
            logger.debug('DELETE method');
            res.end();
            break;
        default:
            logger.debug('default method');
            res.end();
            break;
    }
};


router.methods = {};

router.methods.getVehicleById = function(id, res) {
    var that = this;
    this.models.vehicle.getVehicleById(parseInt(id), function(error, vehicle) {
        if (error) {
            return that.methods.handleError(error, 500, res);
        }

        if (vehicle === null) {
            return that.methods.handleError(new Error("Entry with such id doesn't exist!"), 404, res);
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(vehicle));
    })
};

router.methods.handleError = function(error, statusCode, res) {
    logger.error(error.message);
    res.statusCode = statusCode;
    res.statusMessage = error.message;
    res.end(error.message);
};

//app api endpoints
router.routes = {
    get: {
    /*
        url: method
    */
        getVehicleById: router.methods.getVehicleById
    },
    post: {},
    put: {},
    _delete: {}
};



module.exports = router;
