var oracledb = require('oracledb'),
    config = require('./config');


oracledb.getConnection(
    {
        user: config.db.user,
        password: config.db.password,
        connectString: config.db.connectString
    }, function(err, connection) {
        if (err) {
            console.error(err.message);
            return;
        }
        
        connection.execute('select * from engine_transmission_info', function(err, result) {
		    if (err) {
			    console.log(err.message);
				return;
			}

			console.log(result.rows);
		});
    }
);