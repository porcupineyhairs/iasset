MONGO_HOST = 'localhost'
MONGO_PORT = 27017
MONGO_DBNAME = 'iasset'
X_DOMAINS = '*'
X_HEADERS = '*'
RESOURCE_METHODS = ['GET', 'POST', 'DELETE']
ITEM_METHODS = ['GET', 'PATCH', 'PUT', 'DELETE']
schema = {
    'id': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'name': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'phone': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'address': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'email': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
}
Clients = {
    'item_title': 'client',
    'additional_lookup': {
        'url': 'regex("[\w]+")',
        'field': 'name'
    },
    'cache-control': 'max-age=10,must-revalidate',
    'cache-expire': 10,
    'resource_methods': ['GET', 'POST'],
    'schema': schema
}
DOMAIN = {
    'clients': Clients
}

RESOURCE_METHODS = ['GET', 'POST', 'DELETE']
ITEM_METHODS = ['GET', 'PATCH', 'PUT', 'DELETE']
