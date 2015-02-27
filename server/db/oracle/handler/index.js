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
            connection.execute('select * from vehicles where id = :id', [id], callback);
        }
        ], function(error, result) {
            if (error) {
                return callback(error);
            }

            callback(null, result);
    });
};


module.exports = Dbhandler;