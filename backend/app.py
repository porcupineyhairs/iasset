import pymongo
from flask import Flask, request, Response
from flask.ext.restful import Resource, Api, reqparse
from flask.ext.cors import CORS

import os
import ujson
import bson


# the application instance
app = Flask(__name__)
# the api instance
api = Api(app)
# cors support
cors = CORS(app)


class RestApi(Resource):
    def __init__(self):
        pass

    def get(self, collection):
        query = dict(request.args)
        for k, v in query.iteritems():
            query[k] = query[k][0]
        return self.get_collection(collection, query)

    def put(self, collection, id):
        print 'put', collection, id
        print  request.data
        return self.put_collection(collection, id, request.data)

    def delete(self, collection, id):
        db[collection].remove(bson.ObjectId(id))
        return {}, 204

    def post(self, collection):
        return self.post_collection(collection, request.data)

    def options(self, collection, id=None):
        resp = Response()
        resp.headers.add('Access-Control-Allow-Origin', '*')
        resp.headers.add('Access-Control-Allow-Methods', 'PUT, POST, DELETE')
        resp.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return resp

    def get_collection(self, collection, query):
        coll = [ obj for obj in db[collection].find(query) ]
        for obj in coll:
            for k, v in obj.iteritems():
                obj[k] = unicode(v)
            obj['id'] = str(obj['_id'])
        ret = { collection: coll }
        print ret
        return ret

    def put_collection(self, collection, id, data):
        data = ujson.loads(data)
        obj = data.values()[0]
        key = data.keys()[0]
        query = { '_id': bson.ObjectId(id) }
        modified_obj = db[collection].find_and_modify(query=query, update={'$set': obj}, upsert=False)
        for k, v in modified_obj.iteritems():
            modified_obj[k] = unicode(v)
        modified_obj['id'] = str(id)
        del modified_obj['_id']
        print modified_obj
        return { }, 201

    def post_collection(self, collection, data):
        data = ujson.loads(data)
        print data
        obj = data.values()[0]
        key = data.keys()[0]
        for k, v in obj.iteritems():
            obj[k] = unicode(v)
        id = db[collection].insert(obj)
        obj['id'] = str(id)
        del obj['_id']
        return { key: obj }, 201

class RestApi1(RestApi):
    pass

api.add_resource(RestApi, '/api/v1/<string:collection>', methods=['GET', 'POST', 'OPTIONS'])
api.add_resource(RestApi1, '/api/v1/<string:collection>/<string:id>', methods=['OPTIONS', 'PUT', 'DELETE'])

mongoclient = pymongo.Connection('mongodb://localhost/iasset')
db = mongoclient.iasset


if __name__ == '__main__':
    # most of this is for hosting on Heroku
    # several times while testing I orphaned
    # a server process and had to change the port
    # I was testing on so I added this default_port
    # which is used locally only
    default_port = 5000
    port = int(os.getenv('PORT', default_port))

    host = 'localhost'
    debug = True

    if not port == default_port:
        host = '0.0.0.0'
        debug = False

    app.run(host=host, port=port, debug=debug)
