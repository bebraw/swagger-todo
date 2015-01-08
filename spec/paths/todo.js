'use strict';


module.exports = {
    'get': {
        'description': 'Get available Todos',
        'responses': {
            '200': {
                'description': 'An array of todos',
                'schema': {
                    'type': 'array',
                    'items': {
                        '$ref': '#/definitions/Todo'
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
        'description': 'Create a new Todo',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'description': 'Todo JSON you want to POST',
                'schema': {
                    '$ref': '#/definitions/Todo'
                },
                'required': true
            }
        ],
        'responses': {
            '200': {
                'description': 'Id of the created Todo',
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
        'description': 'Update a Todo',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'description': 'Todo JSON you want to PUT',
                'schema': {
                    '$ref': '#/definitions/Todo'
                },
                'required': true
            }
        ],
        'responses': {
            '200': {
                'description': 'Id of the updated Todo',
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
