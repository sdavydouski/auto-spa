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

method.insertClient = function(client, callback) {
    this.dbhandler.insertClient(client, function(error, result) {
        if (error) {
            return callback(error);
        }

        callback(null, result.outBinds.generated_client_id);
    });
};

method.updateClient = function(client, callback) {
    this.dbhandler.updateClient(client, function(error) {
        if (error) {
            return callback(error);
        }

        callback(null);
    });
};


module.exports = Client;
