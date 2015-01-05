'use strict';


module.exports = {
    'properties': {
        'id': require('./id'),
        'name': {
            'type': 'string',
            'description': 'Full name of the user'
        },
        'invoicingId': {
            'type': 'number',
            'description': 'Invoicing id that is unique per user'
        }
    }
};
