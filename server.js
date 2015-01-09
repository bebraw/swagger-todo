'use strict';

var express = require('express');
var cors = require('cors');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swaggerTools = require('swagger-tools');
var terminator = require('t1000');

var auth = require('./routes/auth');
var config = require('./config');
var jwt = require('./lib/jwt');


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
            jwt: function(req, authOrSecDef, scopes, cb) {
                jwt(config.jwtSecret, req, cb);
            }
        }));

        app.use(middleware.swaggerValidator({
            validateResponse: false
        }));

        app.use(middleware.swaggerRouter({
            controllers: './routes',
            useStubs: env === 'development'
        }));

        app.use(middleware.swaggerUi({
            apiDocs: '/v1/schema',
            swaggerUi: '/v1/docs'
        }));

        app.use(function(req, res) {
            res.status(404).json({
                message: 'NOT_FOUND',
                payload: {}
            });
        });

        // important! Do not eliminate `next` as that will disable error handling
        app.use(function(err, req, res, next) {
            // TODO: this should handle cases beyond 403
            res.status(403).json({
                message: err.code,
                payload: err.results && err.results.errors
            });
        });

        terminator();

        cb(app);
    });
};
