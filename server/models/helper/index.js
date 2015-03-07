var helper = {};

helper.objKeysToLowerCase = function(obj) {
    var key, 
    keys = Object.keys(obj),
    n = keys.length,
    i = 0,
    newObj={};

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
        safety_features: {}
    };

    while (i < n) {
        key = keys[i];

        if ( 0 <= i && i <= 11 ) {
            newObj.general[key.toLowerCase()] = obj[key];
        }
        //i = 12 - vehicle_id (fk)
        else if ( 13 <= i && i <= 23 ) {
            newObj.engine_transmission[key.toLowerCase()] = obj[key];
        }
        else if ( 24 <= i && i <= 40 ) {
            newObj.dimension_capacity[key.toLowerCase()] = obj[key];
        }
        else if ( 41 <= i && i <= 46 ) {
            newObj.exterior[key.toLowerCase()] = obj[key];
        }
        else if ( 47 <= i && i <= 75 ) {
            newObj.interior[key.toLowerCase()] = obj[key];
        }
        else if ( 76 <= i && i <= 81 ) {
            newObj.safety_features[key.toLowerCase()] = obj[key];
        }

        i++;
    }

    return newObj;
}

module.exports = helper;
