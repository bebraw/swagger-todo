'use strict';


module.exports = {
    'get': {
        'description': 'Languages of the system',
        'responses': {
            '200': {
                'description': 'An array of languages',
                'schema': {
                    'type': 'array',
                    'items': {
                        '$ref': '#/definitions/Language'
                    }
                }
            },
            'default': {
                'description': 'Unexpected error',
                'schema': {
                    '$ref': '#/definitions/Error'
                }
            }
        }
    }
};
