'use strict';


module.exports = {
    'get': {
        'description': 'The Todos endpoint returns information about todos. The response includes basic details of each todo, such as name, in chronological order.\n',
        'parameters': [
            {
                'in': 'query',
                'name': 'sortBy',
                'description': 'Name of field to sort with. Add - in front for inverse',
                'required': false,
                'type': 'string'
            },
            {
                'in': 'query',
                'name': 'page',
                'description': 'The index of page to show',
                'required': false,
                'type': 'integer',
                'default': 0
            },
            {
                'in': 'query',
                'name': 'perPage',
                'description': 'The amount of todos per page',
                'required': false,
                'type': 'integer',
                'default': 10
            }
        ],
        'responses': {
            '200': {
                'description': 'An array of todos',
                'schema': {
                    'type': 'array',
                    'items': {
                        '$ref': '#/definitions/Todo'
                    }
                },
                'headers': {
                    'Total-Count': {
                        'description': 'Total count',
                        'type': 'integer'
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
        'description': 'The Todos endpoint allows you to create a new todo to the system.\n',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'description': 'The Todo JSON you want to POST',
                'schema': {
                    '$ref': '#/definitions/Todo'
                },
                'required': true
            }
        ],
        'responses': {
            '200': {
                'description': 'Id of the created todo',
                'schema': {
                    'properties': {
                        'id': {
                            '$ref': '#/definitions/Id'
                        }
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
    'put': {
        'description': 'The Todos endpoint allows you to update a todo already existing in the system.\n',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'description': 'The Todo JSON you want to PUT',
                'schema': {
                    '$ref': '#/definitions/Todo'
                },
                'required': true
            }
        ],
        'responses': {
            '200': {
                'description': 'Id of the updated todo',
                'schema': {
                    'properties': {
                        'id': {
                            '$ref': '#/definitions/Id'
                        }
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
    }
};
