'use strict';


module.exports = {
    'properties': {
        'id': require('./id'),
        'name': {
            'type': ['string', 'null'],
            'description': 'Name of the client'
        },
        'address': {
            'type': ['string', 'null'],
            'description': 'Address of the client'
        },
        'city': {
            'type': ['string', 'null'],
            'description': 'City of the client'
        },
        'postalCode': {
            'type': ['string', 'null'],
            'description': 'Postal code of the client'
        },
        'phone': {
            'type': ['string', 'null'],
            'description': 'Phone number of the client'
        },
        'companyId': {
            'type': ['string', 'null'],
            'description': 'Company id of the client'
        },
        'iban': {
            'type': ['string', 'null'],
            'description': 'IBAN code of the client'
        },
        'bic': {
            'type': ['string', 'null'],
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
