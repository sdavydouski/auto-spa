var helper = require('./helper');

function Client(dbhandler) {
    this.dbhandler = dbhandler;
}

var method = Client.prototype;

method.getClients = function(startWith, endWith, callback) {
    this.dbhandler.getClients(startWith, endWith, function(error, result) {
        if (error) {
            return callback(error);
        }

        if (result.rows.length > 0) {
            callback( null, helper.objsInArrayKeysToLowerCase(result.rows) );
        }
        else {
            callback( null, [] );
        }

    });
};


module.exports = Client;
