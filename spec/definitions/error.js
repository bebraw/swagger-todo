'use strict';


module.exports = {
    'properties': {
        'message': {
            'type': 'string'
        },
        'errors': {
            'type': 'array',
            'items': {
                'type': 'object'
            }
        },
        'warnings': {
            'type': 'array',
            'items': {
                'type': 'object'
            }
        }
    }
};
