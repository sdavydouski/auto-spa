var db = require('./../../oracle'),
    async = require('async');

function Dbhandler(pool) {
    this.pool = pool;
}

var method = Dbhandler.prototype;

method.getVehicleById = function(id, callback) {
    var that = this;
    async.waterfall([
        function(callback) {
            that.pool.getConnection(callback);
        },
        function(connection, callback) {
            connection.execute('select * from vehicles where id = :id', { id: id }, callback);
        }
        ], function(error, result) {
            if (error) {
                return callback(error);
            }

            callback(null, result);
    });
};

//for now - without explicit ordering
//start, end - reserved words in oracle
method.getVehicles = function(startWith, endWith, callback) {
    var that = this;
    async.waterfall([
        function(callback) {
            that.pool.getConnection(callback);
        },
        function(connection, callback) {
            connection.execute('select * ' +
                                    'from ( select a.*, rownum as rnum ' +
                                        'from ( select * from vehicles order by id ) a ' +
                                    'where rownum <= :endWith ) ' +
                                'where rnum >= :startWith', { startWith: startWith, endWith: endWith }, callback);
        }
        ], function(error, result) {
            if (error) {
                return callback(error);
            }

            callback(null, result);
    });
};

method.getVehicleFullInfo = function(id, callback) {
    var that = this;
    async.waterfall([
        function(callback) {
            that.pool.getConnection(callback);
        },
        function(connection, callback) {
            connection.execute('select t1.*, t2.*, t3.*, t4.*, t5.*, t6.* ' +
                'from vehicles t1 ' +
                    'join engine_transmission_info t2 on t1.id = t2.vehicle_id ' +
                    'join dimensions_capacity_info t3 on t1.id = t3.vehicle_id ' +
                    'join exterior_info t4 on t1.id = t4.vehicle_id ' +
                    'join interior_info t5 on t1.id = t5.vehicle_id ' +
                    'join safety_features_info t6 on t1.id = t6.vehicle_id ' +
                'where t1.id = :id', { id: id }, callback);
        }
        ], function(error, result) {
            if (error) {
                return callback(error);
            }

            callback(null, result);
    });
};


module.exports = Dbhandler;