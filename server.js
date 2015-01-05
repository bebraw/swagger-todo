'use strict';

var express = require('express');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var swaggerTools = require('swagger-tools');

var config = require('./config');


main();

function main() {
    var app = express();

    var ip = config.ip;
    var port = config.port;

    var env = process.env.NODE_ENV || 'development';
    if(env === 'development') {
        app.use(errorHandler());
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // https://github.com/apigee-127/swagger-tools/blob/master/docs/QuickStart.md
    swaggerTools.initializeMiddleware(require('./spec'), function(middleware) {
        app.use(middleware.swaggerMetadata());
        app.use(middleware.swaggerValidator());

        app.use(middleware.swaggerRouter({
            controllers: './controllers',
            useStubs: process.env.NODE_ENV === 'development'
        }));

        app.use(middleware.swaggerUi());

        app.use(function(req, res) {
            res.status(404).json({
                message: 'Not Found',
                error: {}
            });
        });

        process.on('exit', terminator);

        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS',
        'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGPIPE', 'SIGTERM'
        ].forEach(function(element) {
            process.on(element, function() { terminator(element); });
        });

        app.listen(port, ip, function() {
            console.log('Node (version: %s) %s started on %s:%d ...', process.version, process.argv[1], ip, port);
        });
    });
}

function terminator(sig) {
    if(typeof sig === 'string') {
        console.log('%s: Received %s - terminating Node server ...',
            Date(Date.now()), sig);

        process.exit(1);
    }

    console.log('%s: Node server stopped.', Date(Date.now()) );
}
