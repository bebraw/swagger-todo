'use strict';


module.exports = {
    'get': {
        'description': 'The Invoices endpoint returns information about invoices the user is affiliated with. The response includes basic details of each invoice, such as sender and receiver information, and includes information about its state in chronological order.\n',
        'responses': {
            '200': {
                'description': 'An array of invoices',
                'schema': {
                    'type': 'array',
                    'items': {
                        '$ref': '#/definitions/Invoice'
                    }
                }
            },
            'default': {
                'description': 'Unexpected error',
                'schema': {
                    '$ref': '#/definitions/Error'
                }
            }
        }
    },
    'post': {
        'description': 'The Invoices endpoint allows you to create a new client to the system.\n',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'description': 'The Invoice JSON you want to POST',
                'schema': {
                    '$ref': '#/definitions/Invoice'
                },
                'required': true
            }
        ],
        'responses': {
            '200': {
                'description': 'Id of the created invoice',
                'schema': {
                    '$ref': '#/definitions/Id'
                }
            },
            'default': {
                'description': 'Unexpected error',
                'schema': {
                    '$ref': '#/definitions/Error'
                }
            }
        }
    },
    'put': {
        'description': 'The Invoices endpoint allows you to update an invoice already existing in the system.\n',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'description': 'The Invoice JSON you want to PUT',
                'schema': {
                    '$ref': '#/definitions/Invoice'
                },
                'required': true
            }
        ],
        'responses': {
            '200': {
                'description': 'Id of the updated invoice',
                'schema': {
                    '$ref': '#/definitions/Id'
                }
            },
            'default': {
                'description': 'Unexpected error',
                'schema': {
                    '$ref': '#/definitions/Error'
                }
            }
        }
    }
};
