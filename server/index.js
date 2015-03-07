var http = require('http'),
    url = require('url'),
    node_static = require('node-static'),
    fileServer = new node_static.Server(),
    apiRouter = require('./router');

var server = http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    //rest service
    if (pathname.indexOf('/api/') > -1) {
        apiRouter.serve(pathname, req, res);
        return;
    }
    //static file server
    req.addListener('end', function() {
        fileServer.serve(req, res);
    }).resume();
});

server.initialize = function(dbhandler, callback) {
    apiRouter.initialize(dbhandler, callback);
    //more stuff later
};

module.exports = server;
