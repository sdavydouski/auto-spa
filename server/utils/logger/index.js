var log4js = require('log4js'),
    path = require('path'),
    rootDir = path.dirname(require.main.filename);

log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: path.join(rootDir, 'logs/log_file.log') }
    ]
});

var logger = log4js.getLogger();

//add dev/prod diff
logger.setLevel('TRACE');

module.exports = logger;