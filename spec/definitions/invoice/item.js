'use strict';


module.exports = {
    'properties': {
        'description': {
            'type': 'string',
            'description': 'Description of the item to invoice'
        },
        'cost': {
            'type': 'number',
            'description': 'Basic cost of the item to invoice'
        },
        'vat': {
            'default': 0,
            'type': 'number',
            'description': 'Possible VAT of the item to invoice. Defaults to zero.'
        }
    }
};
