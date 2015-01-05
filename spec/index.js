'use strict';


module.exports = {
    'swagger': '2.0',
    'info': {
        'title': 'Koodilehto CRM API',
        'description': 'Manage your clients and invoices using Koodilehto CRM API',
        'version': '1.0.0'
    },
    'host': 'api.koodilehto.fi',
    'schemes': [
        'https'
    ],
    'basePath': '/v1',
    'produces': [
        'application/json'
    ],
    'paths': require('./paths'),
    'definitions': require('./definitions')
};
