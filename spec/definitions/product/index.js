'use strict';


module.exports = {
    'required': [
        'name',
        'description',
        'purchasePrice',
        'sellingPrice',
        'priceChanged',
        'vat',
        'group',
        'inStock'
    ],
    'properties': {
        'id': require('../id'),
        'name': {
            'type': 'string'
        },
        'description': {
            'type': 'string'
        },
        'purchasePrice': {
            'type': 'number'
        },
        'sellingPrice': {
            'type': 'number'
        },
        'priceChanged': {
            'type': 'string',
            'format': 'date-time',
            'description': 'Date when price of the product changed'
        },
        'vat': {
            'type': 'number',
            'description': 'VAT of the product'
        },
        'group': {
            '$ref': '#/definitions/ProductGroup'
        },
        'inStock': {
            'type': 'boolean',
            'description': 'Is the product in the stock'
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
