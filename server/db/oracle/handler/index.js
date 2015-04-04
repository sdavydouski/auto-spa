var db = require('./../../oracle'),
    async = require('async');

function Dbhandler(pool) {
    this.pool = pool;
}

var method = Dbhandler.prototype;

method.getVehicleById = function(id, callback) {
    var that = this,
        _connection,
        _result;
    
    async.waterfall([
        function(callback) {
            that.pool.getConnection(callback);
        },
        function(connection, callback) {
            _connection = connection;
            connection.execute('select * from vehicles where id = :id', { id: id }, callback);
        },
        function(result, callback) {
            _result = result;
            _connection.release(callback);
        }
        ], function(error) {
            if (error) {
                return callback(error);
            }

            callback(null, _result);
    });
};

//for now - without explicit ordering
//start, end - reserved words in oracle
method.getVehicles = function(startWith, endWith, callback) {
    var that = this,
        _connection,
        _result;

    async.waterfall([
        function(callback) {
            that.pool.getConnection(callback);
        },
        function(connection, callback) {
            _connection = connection;
            connection.execute('select * ' +
                                    'from ( select a.*, rownum as rnum ' +
                                        'from ( select t1.*, t2.* from vehicles t1, goods t2 ' + 
                                                    'where t2.product_id = t1.product_id_fk order by t1.vehicle_id ) a ' +
                                    'where rownum <= :endWith ) ' +
                                'where rnum >= :startWith', { startWith: startWith, endWith: endWith }, callback);
        },
        function(result, callback) {
            _result = result;
            _connection.release(callback);
        }
        ], function(error) {
            if (error) {
                return callback(error);
            }

            callback(null, _result);
    });
};

method.getVehicleFullInfo = function(id, callback) {
    var that = this,
        _connection,
        _result;

    async.waterfall([
        function(callback) {
            that.pool.getConnection(callback);
        },
        function(connection, callback) {
            _connection = connection;
            connection.execute('select t1.*, t2.*, t3.*, t4.*, t5.*, t6.*, t7.* ' +
                'from vehicles t1 ' +
                'join engine_transmission_info t2 on t1.vehicle_id = t2.vehicle_id ' +
                'join dimensions_capacity_info t3 on t1.vehicle_id = t3.vehicle_id ' +
                'join exterior_info t4 on t1.vehicle_id = t4.vehicle_id ' +
                'join interior_info t5 on t1.vehicle_id = t5.vehicle_id ' +
                'join safety_features_info t6 on t1.vehicle_id = t6.vehicle_id ' +
                'join goods t7 on t1.product_id_fk = t7.product_id ' +
                'where t1.vehicle_id = :id', { id: id }, callback);
        },
        function(result, callback) {
            _result = result;
            _connection.release(callback);
        }
        ], function(error) {
            if (error) {
                return callback(error);
            }

            callback(null, _result);
    });
};

//for now - without pagination
method.findVehicles = function(data, callback) {
    var that = this,
        _connection,
        _result,
        params = {
            minPrice: data.minPrice ? data.minPrice: 0,
            maxPrice: data.maxPrice ? data.maxPrice: 99999999999,
            countryManufacturer: data.countryManufacturer ? '%' + data.countryManufacturer.toLowerCase() + '%' : '%',
            manufacturer: data.manufacturer ? '%' + data.manufacturer.toLowerCase() + '%' : '%',
            model: data.model ? '%' + data.model.toLowerCase() + '%' : '%',
            modelYear: data.modelYear ? data.modelYear : '%',
            bodyStyle: data.bodyStyle ? '%' + data.bodyStyle.toLowerCase() + '%' : '%',
            seating: data.seating ? data.seating : '%',
            doors: data.doors ? data.doors : '%',

            standardEngine: data.standardEngine ? '%' + data.standardEngine.toLowerCase() + '%' : '%',
            fuelType: data.fuelType ? '%' + data.fuelType.toLowerCase() + '%' : '%',
            transmission: data.transmission ? '%' + data.transmission.toLowerCase() + '%' : '%',
            drivetrain: data.drivetrain ? '%' + data.drivetrain.toLowerCase() + '%' : '%',

            airConditioning: data.airConditioning ? '(Standard|Optional)' : '.*',
            cruiseControl: data.cruiseControl ? '(Standard|Optional)' : '.*',
            cupHolder: data.cupHolder ? '(Standard|Optional)' : '.*',
            navigationSystem: data.navigationSystem ? 'Standard|Optional' : '.*',
            handsFreePhone: data.handsFreePhone ? '(Standard|Optional)' : '.*',
            powerSeats: data.powerSeats ? '(Standard|Optional)' : '.*',
            dvdEntertainmentSystem: data.dvdEntertainmentSystem ? '(Standard|Optional)' : '.*'
        };

    async.waterfall([
        function(callback) {
            that.pool.getConnection(callback);
        },
        function(connection, callback) {
            _connection = connection;
            connection.execute('select t1.*, t2.*, t3.*, t4.*, t5.*, t6.*, t7.* ' +
                'from vehicles t1 ' +
                'join engine_transmission_info t2 on t1.vehicle_id = t2.vehicle_id ' +
                'join dimensions_capacity_info t3 on t1.vehicle_id = t3.vehicle_id ' +
                'join exterior_info t4 on t1.vehicle_id = t4.vehicle_id ' +
                'join interior_info t5 on t1.vehicle_id = t5.vehicle_id ' +
                'join safety_features_info t6 on t1.vehicle_id = t6.vehicle_id ' +
                'join goods t7 on t1.product_id_fk = t7.product_id ' +

                'where t7.price >= :minPrice and t7.price <= :maxPrice ' +
                'and LOWER(t1.country_manufacturer) like :countryManufacturer ' +
                'and LOWER(t1.manufacturer) like :manufacturer ' + 
                'and LOWER(t1.model) like :model ' +
                'and t1.model_year like :modelYear ' +
                'and LOWER(t1.body_style) like :bodyStyle ' +
                'and t1.seating like :seating ' +
                'and t1.doors like :doors ' +

                'and LOWER(t2.standard_engine) like :standardEngine ' +
                'and LOWER(t2.fuel_type) like :fuelType ' +
                'and LOWER(t2.transmission) like :transmission ' +
                'and LOWER(t2.drivetrain) like :drivetrain ' +

                'and regexp_like (t5.front_air_conditioning, :airConditioning) ' +
                'and regexp_like (t5.cruise_control, :cruiseControl) ' +
                'and regexp_like (t5.cup_holder, :cupHolder) ' +
                'and regexp_like (t5.navigation_system, :navigationSystem) ' +
                'and regexp_like (t5.hands_free_phone, :handsFreePhone) ' +
                'and regexp_like (t5.power_seats, :powerSeats) ' +
                'and regexp_like (t5.dvd_entertainment_system, :dvdEntertainmentSystem)', params, callback);
        },
        function(result, callback) {
            _result = result;
            _connection.release(callback);
        }
        ], function(error) {
            if (error) {
                return callback(error);
            }

            callback(null, _result);
    });
};


module.exports = Dbhandler;
