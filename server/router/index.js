var url = require('url'),
    logger = require('./../utils/logger'), 
    Vehicle = require('./../models/vehicle');


var router = {};

router.models = {};

router.initialize = function(dbhandler, callback) {
    this.models.vehicle = new Vehicle(dbhandler);
    //no async operation yet
    callback(null, 1);
};

//uri example: /api/vehicle/5
router.serve = function(uri, req, res) {
    logger.debug(req.method + ' ' + uri);
    var array = uri.split('/');         //example: ["", "api", "vehicle", "5"]
    switch (req.method) {
        case 'GET':
            if ( this.routes.get[array[2]] ) {
                this.routes.get[array[2]].call(this, array[3], req, res);
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
            if ( this.routes.put[array[2]] ) {
                this.routes.put[array[2]].call(this, array[3], req, res);
            }
            else {
                this.methods.handleError(new Error('Wrong PUT method!'), 400, res);
            }
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

router.methods.getVehicleById = function(id, req, res) {
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

router.methods.getVehicleFullInfo = function(id, req, res) {
    var that = this;
    this.models.vehicle.getVehicleFullInfo(parseInt(id), function(error, vehicle) {
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

//without explicit ordering (for now)
router.methods.getVehicles = function(boundaries, req, res) {
    var that = this,
        boundaries = boundaries || '1-12',
        array = boundaries.split('-'),
        startWith = parseInt(array[0]),
        endWith = parseInt(array[1]);

    if (isNaN(startWith) || isNaN(endWith)) {
        return that.methods.handleError(new Error("Wrong boundaries!"), 400, res);
    }

    this.models.vehicle.getVehicles(startWith, endWith, function(error, vehicles) {
        if (error) {
            return that.methods.handleError(error, 500, res);
        }

        /*if (vehicles === null) {
            return that.methods.handleError(new Error("Wrong boundaries!"), 404, res);
        }*/

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(vehicles));
    })
};


router.methods.search = function(type, req, res) {
    var data = url.parse(req.url, true).query,
        that = this;

    switch(type) {
        case 'vehicle':
            this.models.vehicle.findVehicles(data, function(error, vehicles) {
                if (error) {
                    return that.methods.handleError(error, 500, res);
                }

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(vehicles));
            });
            break;
        default:
            logger.debug('search default type');
            res.end('yep');
            break;
    }

};

router.methods.updateVehicle = function(id, req, res) {
    var body = '',
        that = this;

    req.on('data', function(data) {
        body += data;

        // Too much data, kill the connection!
        if (body.length > 1e6) {
            req.connection.destroy();
        }
    });

    req.on('end', function() {
        //body = JSON.parse(body);

        that.models.vehicle.updateVehicle(body, function(error) {
            if (error) {
                return that.methods.handleError(error, 500, res);
            }

            res.end('ok');
        });

    });

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
        //vehicle: router.methods.getVehicleById,
        vehicle: router.methods.getVehicleFullInfo,
        vehicles: router.methods.getVehicles,
        search: router.methods.search
    },
    post: {},
    put: {
        vehicle: router.methods.updateVehicle
    },
    _delete: {}
};



module.exports = router;
