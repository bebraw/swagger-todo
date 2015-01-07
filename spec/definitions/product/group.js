'use strict';


module.exports = {
    'required': [
        'name',
        'description'
    ],
    'properties': {
        'id': require('../id'),
        'name': {
            'type': 'string'
        },
        'description': {
            'type': 'string'
        },
        'createdAt': {
            'type': 'string',
            'format': 'date-time',
            'description': 'Day in which the group was created at',
            'readOnly': true
        },
        'updatedAt': {
            'type': 'string',
            'format': 'date-time',
            'description': 'Day in which the group was updated',
            'readOnly': true
        }
    }
};
