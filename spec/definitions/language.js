'use strict';


module.exports = {
    'properties': {
        'id': require('./id'),
        'name': {
            'type': 'string',
            'enum': [
                'en-en',
                'fi-fi'
            ],
            'readOnly': true
        }
    }
};
