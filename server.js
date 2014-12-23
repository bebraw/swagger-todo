'use strict';

var express = require('express');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var swagger = require('swagger-n');

var config = require('./config');
var spec = require('./spec');
var handlers = require('./handlers');


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
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/v1/', swagger.router(spec, handlers));

    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function(err, req, res, next) {
        res.status(err.status || 500).json({
            message: err.message,
            error: err
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
}

function terminator(sig) {
    if(typeof sig === 'string') {
        console.log('%s: Received %s - terminating Node server ...',
            Date(Date.now()), sig);

        process.exit(1);
    }

    console.log('%s: Node server stopped.', Date(Date.now()) );
}
