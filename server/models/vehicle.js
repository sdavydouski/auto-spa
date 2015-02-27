function Vehicle(dbhandler) {
    this.dbhandler = dbhandler;
}

var method = Vehicle.prototype;

method.getVehicleById = function(id, callback) {
    this.dbhandler.getVehicleById(id, function(error, result) {
         if (error) {
            return callback(error);
        }

        callback(null, result.rows[0]);
    });
}


module.exports = Vehicle;

/*

vehicle
----general
--------vin
--------model
--------manufacturer
--------...
----engine_transmission
--------...
----...

*/