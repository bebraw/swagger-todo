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
            'type': 'string',
            'description': 'Name of the product'
        },
        'description': {
            'type': 'string',
            'description': 'Description of the product'
        },
        'purchasePrice': {
            'type': 'number',
            'description': 'Purchase price of the product'
        },
        'sellingPrice': {
            'type': 'number',
            'description': 'Selling price of the product'
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
            '$ref': '#/definitions/ProductGroup',
            'description': 'Group of the product'
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
