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
            'type': ['boolean', 'null']
        },
        'createdAt': require('./created'),
        'updatedAt': require('./updated')
    }
};
