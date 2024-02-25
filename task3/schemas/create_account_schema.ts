export default {
    'type': 'Array',
    'items': {
        'type': 'object',
        'properties': {
            'name': {
                'type': 'string',
            },
            'address': {
                'type': 'string',
            },
            'phone': {
                'type': 'string',
            },
            'email': {
                'type': 'string',
            }
        },
        'required': ['name', 'address', 'phone', 'email'],
    },
};