'use strict';

var express = require('express');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var swaggerTools = require('swagger-tools');


module.exports = function(cb) {
    var app = express();

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
                message: 'NOT_FOUND',
                error: {}
            });
        });

        process.on('exit', terminator);

        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS',
        'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGPIPE', 'SIGTERM'
        ].forEach(function(element) {
            process.on(element, function() { terminator(element); });
        });

        cb(app);
    });
};

function terminator(sig) {
    if(typeof sig === 'string') {
        console.log('%s: Received %s - terminating Node server ...',
            Date(Date.now()), sig);

        process.exit(1);
    }

    console.log('%s: Node server stopped.', Date(Date.now()) );
}
