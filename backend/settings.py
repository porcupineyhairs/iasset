URL_PREFIX = 'api'
API_VERSION = 'v1'
ALLOWED_WRITE_ROLES = []
MONGO_HOST = 'localhost'
MONGO_PORT = 27017
MONGO_DBNAME = 'iasset'
X_DOMAINS = '*'
X_HEADERS = ['Content-Type']
IF_MATCH = False
RESOURCE_METHODS = ['GET', 'POST', 'DELETE']
ITEM_METHODS = ['GET', 'PATCH', 'DELETE', 'PUT']

Users_schema = {
    'id': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'username': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'password': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
}
Clients_schema = {
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
Deals_schema = {
    'id': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'dealCode': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'counterpartyName': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'dealDate': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'expiryDate': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'ulSymbol': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'ulName': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'ulQuantity': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'warningLevel': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'dangerLevel': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
}

Users = {
    'item_title': 'user',
    'additional_lookup': {
        'url': 'regex("[\w]+")',
        'field': 'username'
    },
    'cache-control': 'max-age=10,must-revalidate',
    'cache-expire': 10,
    'resource_methods': ['GET', 'DELETE', 'POST'],
    'schema': Users_schema
}
Clients = {
    'item_title': 'client',
    'additional_lookup': {
        'url': 'regex("[\w]+")',
        'field': 'name'
    },
    'cache-control': 'max-age=10,must-revalidate',
    'cache-expire': 10,
    'resource_methods': ['GET', 'DELETE', 'POST'],
    'schema': Clients_schema
}
Deals = {
    'item_title': 'deal',
    'additional_lookup': {
        'url': 'regex("[\w]+")',
        'field': 'id'
    },
    'cache-control': 'max-age=10,must-revalidate',
    'cache-expire': 10,
    'schema': Deals_schema
}

DOMAIN = {
    'users': Users,
    'clients': Clients,
    'deals': Deals
}
