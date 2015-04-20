var url = require('url'),
    fs = require('fs'),
    formidable = require('formidable'),
    path = require('path'),
    config = require('./../../config'),
    rootDir = path.dirname(require.main.filename),
    logger = require('./../utils/logger'), 
    Vehicle = require('./../models/vehicle'),
    Client = require('./../models/client');


var router = {};

router.models = {};

router.initialize = function(dbhandler, callback) {
    this.models.vehicle = new Vehicle(dbhandler);
    this.models.client = new Client(dbhandler);
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
            if ( this.routes.post[array[2]] ) {
                this.routes.post[array[2]].call(this, array[3], req, res);
            }
            else {
                this.methods.handleError(new Error('Wrong POST method!'), 400, res);
            }
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
            if ( this.routes._delete[array[2]] ) {
                this.routes._delete[array[2]].call(this, array[3], req, res);
            }
            else {
                this.methods.handleError(new Error('Wrong DELETE method!'), 400, res);
            }
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
router.methods.getVehicles = function(boundaries, req, res) {   //boundaries are always empty!
    var that = this,
        query = url.parse( req.url, true ).query,
        pageNumber,
        startWith,
        endWith;

    if ( query.startPage && query.endPage ) {
        startWith = config.router.vehiclesForPage * ( query.startPage - 1 ) + 1;
        endWith = config.router.vehiclesForPage * query.endPage;
    }
    else {
        pageNumber = query.page || 1;
        startWith = config.router.vehiclesForPage * ( pageNumber - 1 ) + 1;
        endWith = startWith + config.router.vehiclesForPage - 1;
    }

    this.models.vehicle.getVehicles(startWith, endWith, function(error, vehicles) {
        if (error) {
            return that.methods.handleError(error, 500, res);
        }

        if (vehicles === null) {
            return that.methods.handleError(new Error("Wrong boundaries!"), 404, res);
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(vehicles));
    })
};

router.methods.getClients = function(boundaries, req, res) {
    var that = this,
        query = url.parse( req.url, true ).query,
        pageNumber,
        startWith,
        endWith;

    //put in a function?
    if ( query.startPage && query.endPage ) {
        startWith = config.router.clientsForPage * ( query.startPage - 1 ) + 1;
        endWith = config.router.clientsForPage * query.endPage;
    }
    else {
        pageNumber = query.page || 1;
        startWith = config.router.clientsForPage * ( pageNumber - 1 ) + 1;
        endWith = startWith + config.router.clientsForPage - 1;
    }

    this.models.client.getClients(startWith, endWith, function(error, clients) {
        if (error) {
            return that.methods.handleError(error, 500, res);
        }

        if (clients === null) {
            return that.methods.handleError(new Error("Wrong boundaries!"), 404, res);
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(clients));
    })
};

router.methods.insertClient = function(id, req, res) {  //id ?
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

        that.models.client.insertClient(body, function(error, client_id) {
            if (error) {
                return that.methods.handleError(error, 500, res);
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify( { client_id: client_id } ));
        });

    });

};

router.methods.updateClient = function(id, req, res) {
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

        that.models.client.updateClient(body, function(error) {
            if (error) {
                return that.methods.handleError(error, 500, res);
            }

            res.end('client updated');
        });

    });

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

        that.models.vehicle.updateVehicle(body, function(error) {
            if (error) {
                return that.methods.handleError(error, 500, res);
            }

            res.end('ok');
        });

    });

};

router.methods.insertVehicles = function(id, req, res) {
    var form = new formidable.IncomingForm(),
        that = this,
        now = Date.now(),
        fileNames = {
            goodsFileName: 'goods_import_' + now + '.csv',
            vehiclesFileName: 'vehicles_import_' + now + '.csv',
            engineTransmissionFileName: 'engine_transmission_import_' + now + '.csv',
            dimensionsCapacityFileName: 'dimensions_capacity_import_' + now + '.csv',
            exteriorFileName: 'exterior_import_' + now + '.csv',
            interiorFileName: 'interior_import_' + now + '.csv',
            safetyFeaturesFileName: 'safety_features_import_' + now + '.csv'
        };

    form.encoding = 'utf-8';
    form.uploadDir = path.join(rootDir, 'assets');
    form.keepExtensions = true;
    form.maxFieldsSize = 5 * 1024 * 1024 * 1024;     //max file size: 5 GB

    form.parse(req, function(error, fields, files) {
        if (error) {
            return that.methods.handleError(error, 500, res);
        }
    });

    form.on('file', function(field, file) {
        //rename the incoming file to the file's name
        if ( /goods/.test(file.name) ) {
            fs.rename( file.path, path.join(form.uploadDir, fileNames.goodsFileName) );
        }
        else if ( /vehicles/.test(file.name) ) {
            fs.rename( file.path, path.join(form.uploadDir, fileNames.vehiclesFileName) );
        }
        else if ( /engine/.test(file.name) ) {
            fs.rename( file.path, path.join(form.uploadDir, fileNames.engineTransmissionFileName) );
        }
        else if ( /dimensions/.test(file.name) ) {
            fs.rename( file.path, path.join(form.uploadDir, fileNames.dimensionsCapacityFileName) );
        }
        else if ( /exterior/.test(file.name) ) {
            fs.rename( file.path, path.join(form.uploadDir, fileNames.exteriorFileName) );
        }
        else if ( /interior/.test(file.name) ) {
            fs.rename( file.path, path.join(form.uploadDir, fileNames.interiorFileName) );
        }
        else if ( /safety/.test(file.name) ) {
            fs.rename( file.path, path.join(form.uploadDir, fileNames.safetyFeaturesFileName) );
        }
        
    });

    form.on('progress', function(bytesReceived, bytesExpected) {
        var percentComplete = (bytesReceived / bytesExpected) * 100;
        //logger.info(percentComplete.toFixed(2));
    });

    form.on('error', function(error) {
        logger.error(error);
        res.end('error');
    });

    form.on('end', function() {
        var time = Date.now();
        that.models.vehicle.insertVehicles(fileNames, function(error) {
            if (error) {
                return that.methods.handleError(error, 500, res);
            }

            var delta = Date.now() - time;
            logger.info('Elapsed time:');
            logger.info(delta);

            res.end('insertion complete');
        });
    });
    
};

router.methods.deleteVehicle = function(id, req, res) {
    var that = this;
    this.models.vehicle.deleteVehicle(parseInt(id), function(error) {
        if (error) {
            return that.methods.handleError(error, 500, res);
        }

        res.end('deletion complete');
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
        //vehicle: router.methods.getVehicleById,
        vehicle: router.methods.getVehicleFullInfo,
        vehicles: router.methods.getVehicles,
        clients: router.methods.getClients,
        search: router.methods.search
    },
    post: {
        vehicles: router.methods.insertVehicles,
        client: router.methods.insertClient
    },
    put: {
        vehicle: router.methods.updateVehicle,
        client: router.methods.updateClient
    },
    _delete: {
        vehicle: router.methods.deleteVehicle
    }
};



module.exports = router;
