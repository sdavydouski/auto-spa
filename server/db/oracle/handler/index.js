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


module.exports = Dbhandler;
