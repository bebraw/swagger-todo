'use strict';


module.exports = {
    'properties': {
        'id': require('./id'),
        'name': {
            'type': 'string',
            'description': 'Name of the client'
        },
        'address': {
            'type': 'string',
            'description': 'Address of the client'
        },
        'city': {
            'type': 'string',
            'description': 'City of the client'
        },
        'postalCode': {
            'type': 'string',
            'description': 'Postal code of the client'
        },
        'phone': {
            'type': 'string',
            'description': 'Phone number of the client'
        },
        'companyId': {
            'type': 'string',
            'description': 'Company id of the client'
        },
        'iban': {
            'type': 'string',
            'description': 'IBAN code of the client'
        },
        'bic': {
            'type': 'string',
            'description': 'BIC/SWIFT code of the client'
        },
        'language': {
            '$ref': '#/definitions/Language',
            'description': 'Language of the client'
        },
        'createdAt': {
            'type': 'string',
            'format': 'date-time',
            'description': 'Day in which the invoice was created at',
            'readOnly': true
        },
        'updatedAt': {
            'type': 'string',
            'format': 'date-time',
            'description': 'Day in which the invoice was updated',
            'readOnly': true
        }
    }
};
