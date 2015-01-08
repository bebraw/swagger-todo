'use strict';

var express = require('express');
var cors = require('cors');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swaggerTools = require('swagger-tools');

var apikey = require('./config').apikey;


module.exports = function(cb) {
    var app = express();

    var env = process.env.NODE_ENV || 'development';
    if(env === 'development') {
        app.use(errorHandler());
        app.use(morgan('dev'));
    }

    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // https://github.com/apigee-127/swagger-tools/blob/master/docs/QuickStart.md
    swaggerTools.initializeMiddleware(require('./spec'), function(middleware) {
        app.use(middleware.swaggerMetadata());

        app.use(middleware.swaggerSecurity({
            apikey: function(req, authOrSecDef, scopes, cb) {
                if(req.query['api_key'] === apikey) {
                    return cb();
                }

                cb(new Error('Failed to authenticate'));
            }
        }));

        app.use(middleware.swaggerValidator({
            validateResponse: false
        }));

        app.use(middleware.swaggerRouter({
            controllers: './routes',
            useStubs: process.env.NODE_ENV === 'development'
        }));

        app.use(middleware.swaggerUi({
            apiDocs: '/v1/schema',
            swaggerUi: '/v1/docs'
        }));

        app.use(function(req, res) {
            res.status(404).json({
                message: 'NOT_FOUND',
                error: {}
            });
        });

        // important! Do not eliminate `next` as that will disable error handling
        app.use(function(err, req, res, next) {
            res.status(403).json({
                message: err.code,
                error: err.results && err.results.errors
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
