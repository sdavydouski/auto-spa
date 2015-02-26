var oracledb = require('oracledb'),
    config = require('./../../../config');

var Db = function(callback) {

    oracledb.outFormat = oracledb.OBJECT;
    
    if (Db.prototype._singletonInstance) {
        return Db.prototype._singletonInstance;
    }

    Db.prototype._singletonInstance = this;

    var that = this;

    this.initialize = function(callback) {
        oracledb.createPool({
            connectString: config.db.connectString,
            user: config.db.user,
            password: config.db.password,
            poolMax: config.db.poolMax
        }, function(error, pool) {
            if (error) {
                callback(error);
                return;
            }

            that.pool = pool;

            callback(null, that);
        });
    };
}

module.exports = new Db();