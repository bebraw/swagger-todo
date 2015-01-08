'use strict';


module.exports = {
    'required': [
        'name'
    ],
    'properties': {
        'id': require('./id'),
        'name': {
            'type': 'string'
        },
        'done': {
            'type': 'boolean'
        },
        'createdAt': {
            'type': 'string',
            'format': 'date-time',
            'description': 'Day in which the Todo was created',
            'readOnly': true
        },
        'updatedAt': {
            'type': 'string',
            'format': 'date-time',
            'description': 'Day in which the Todo was updated',
            'readOnly': true
        }
    }
};
