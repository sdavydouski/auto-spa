function Vehicle(dbhandler) {
    this.dbhandler = dbhandler;
}

Vehicle.prototype.getVehicleById(id) {

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