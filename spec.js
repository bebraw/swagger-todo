'use strict';


module.exports = {
    swagger: 2.0,
    info: {
        title: 'Koodilehto CRM API'
    },
    paths: {
        '/clients': {
            get: {
                summary: 'Get clients',
                operationId: 'getClients'
            }
        }
    }
};
