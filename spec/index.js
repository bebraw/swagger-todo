'use strict';
var config = require('../config');
var version = require('../package.json').version;


module.exports = {
    swagger: '2.0',
    info: {
        title: 'Swagger Todo API',
        description: 'Manage your todos using this API',
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
    paths: require('./paths'),
    definitions: require('./definitions')
};
