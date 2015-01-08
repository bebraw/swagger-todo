'use strict';

var express = require('express');
var cors = require('cors');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swaggerTools = require('swagger-tools');
var jwt = require('jsonwebtoken');

var auth = require('./routes/auth');
var config = require('./config');


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

    app.use(auth());

    // https://github.com/apigee-127/swagger-tools/blob/master/docs/QuickStart.md
    swaggerTools.initializeMiddleware(require('./spec'), function(middleware) {
        app.use(middleware.swaggerMetadata());

        app.use(middleware.swaggerSecurity({
            // adapted from express-jwt middleware
            jwt: function(req, authOrSecDef, scopes, cb) {
                var authorization = req.headers.authorization;
                var token;

                if(authorization) {
                    var parts = req.headers.authorization.split(' ');

                    if(parts.length === 2) {
                        var scheme = parts[0];
                        var credentials = parts[1];

                        if(/^Bearer$/i.test(scheme)) {
                            token = credentials;

                            console.log('token', token);
                        }
                        else {
                            cb(new Error('Format is Authorization: Bearer [token]'));
                        }
                    }
                }

                if(token) {
                    jwt.verify(token, config.jwtSecret, {}, function(err) {
                        if(err) {
                            return cb(new Error('Invalid token'));
                        }

                        cb();
                    });
                }
                else {
                    cb(new Error('No authorization token was found'));
                }
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
