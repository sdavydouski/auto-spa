var helper = require('./helper');

function Product(dbhandler) {
    this.dbhandler = dbhandler;
}

var method = Product.prototype;

method.assignProductToClient = function(ids, callback) {
    this.dbhandler.assignProductToClient(ids, function(error) {
        if (error) {
            return callback(error);
        }

        callback(null);
    });
};

method.removeProductFromClient = function(ids, callback) {
    this.dbhandler.removeProductFromClient(ids, function(error) {
        if (error) {
            return callback(error);
        }

        callback(null);
    });
};


module.exports = Product;
