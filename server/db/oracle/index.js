var oracledb = require('oracledb'),
    config = require('./../../../config'),
    Dbhandler = require('./handler');

var Db = function(callback) {
    
    if (Db.prototype._singletonInstance) {
        return Db.prototype._singletonInstance;
    }

    Db.prototype._singletonInstance = this;

    oracledb.outFormat = oracledb.OBJECT;
    oracledb.maxRows = config.db.maxRows;

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

            that.handler = new Dbhandler(pool);

            callback(null, that);
        });
    };
}

module.exports = new Db();
