var helper = {};

helper.objKeysToLowerCase = function(obj) {
    var key,
        keys = Object.keys(obj),
        n = keys.length,
        i = 0,
        newObj = {};

    while (i < n) {
        key = keys[i];
        newObj[key.toLowerCase()] = obj[key];
        i++;
    }

    return newObj;
};

helper.objsInArrayKeysToLowerCase = function(array) {
    var newArray = [],
        n = array.length,
        i = 0;

    while (i < n) {
        newArray.push( this.objKeysToLowerCase(array[i]) );
        i++;
    }

    return newArray;
};

helper.createVehicleStructure = function(obj) {
    var key, 
        keys = Object.keys(obj),
        n = keys.length,
        i = 0,
        newObj={
            general: {},
            engine_transmission: {},
            dimension_capacity: {},
            exterior: {},
            interior: {},
            safety_features: {},
            product: {}
        };

    while (i < n) {
        key = keys[i];

        if ( 0 <= i && i <= 10 ) {
            newObj.general[key.toLowerCase()] = obj[key];
        }
        //i = 11 - vehicle_id (fk)
        else if ( 12 <= i && i <= 22 ) {
            newObj.engine_transmission[key.toLowerCase()] = obj[key];
        }
        else if ( 23 <= i && i <= 39 ) {
            newObj.dimension_capacity[key.toLowerCase()] = obj[key];
        }
        else if ( 40 <= i && i <= 45 ) {
            newObj.exterior[key.toLowerCase()] = obj[key];
        }
        else if ( 46 <= i && i <= 74 ) {
            newObj.interior[key.toLowerCase()] = obj[key];
        }
        else if ( 75 <= i && i <= 80 ) {
            newObj.safety_features[key.toLowerCase()] = obj[key];
        }
        else if ( 81 <= i && i <= 87 ) {
            newObj.product[key.toLowerCase()] = obj[key];
        }

        i++;
    }

    return newObj;
}

helper.createArrayVehicleStructure = function(array) {
    var that = this;
    return array.map(function(item) {
        return that.createVehicleStructure(item);
    });
}

module.exports = helper;
