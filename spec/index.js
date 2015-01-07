'use strict';
var config = require('../config');
var version = require('../package.json').version;


module.exports = {
    swagger: '2.0',
    info: {
        title: 'Koodilehto CRM API',
        description: 'Manage your clients and invoices using Koodilehto CRM API',
        version: version
    },
    host: config.ip + ':' + config.port,
    schemes: [
        'http', // TODO: disable in production
        'https'
    ],
    basePath: '/v1',
    produces: [
        'application/json'
    ],
    security: [
        {
            apikey: []
        }
    ],
    paths: require('./paths'),
    definitions: require('./definitions'),
    securityDefinitions: require('./security_definitions')
};
