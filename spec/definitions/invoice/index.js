'use strict';


module.exports = {
    'required': [
        'sender',
        'receiver',
        'items',
        'due',
        'paymentDays'
    ],
    'properties': {
        'id': require('../id'),
        'invoiceId': {
            'type': 'number',
            'description': 'Unique invoice id generated internally by the backend',
            'readOnly': true
        },
        'status': {
            '$ref': '#/definitions/InvoiceStatus',
            'readOnly': true
        },
        'sender': {
            '$ref': '#/definitions/User'
        },
        'receiver': {
            '$ref': '#/definitions/Client'
        },
        'items': {
            'type': 'array',
            'description': 'Billable items attached to the invoice',
            'minItems': 1,
            'items': {
                '$ref': '#/definitions/InvoiceItem'
            }
        },
        'due': {
            'type': 'string',
            'description': 'Day in which the invoice is due'
        },
        'paymentDays': {
            'type': 'number',
            'description': 'Amount of days to pay the bill',
            'default': 8
        }
    }
};
