import os, sys
sys.path.insert(0, 'lib/') # adds the 'lib' in zip file to path


import pymongo
from flask import Flask, request, Response, send_from_directory, send_file
from flask.ext.restful import Resource, Api, reqparse
from flask.ext.cors import CORS
from werkzeug import secure_filename

import subprocess
import ujson
import bson
import zipfile


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


class SigninApi(RestApi):
    def post(self):
        from md5 import md5
        hasher = md5()
        loginReq = ujson.loads(request.data)
        user = db.users.find_one({'username': loginReq['username']})
        hasher.update(loginReq['password'])
        print hasher.hexdigest(), user['password']
        if (hasher.hexdigest() == user['password']):
            user['id'] = str(user['_id'])
            del user['_id']
            return {'user': user, 'token': '42'}, 200
        else:
            return {}, 505

    def options(self):
        resp = Response()
        resp.headers.add('Access-Control-Allow-Origin', '*')
        resp.headers.add('Access-Control-Allow-Methods', 'POST')
        resp.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return resp


@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def frontend(path):
    print path
    if path in ['', '/']:
        path = 'index.html'
    #return send_from_directory('.', path)
    dirname = os.path.dirname(__file__)

    if zipfile.is_zipfile(dirname):
        zf = zipfile.ZipFile(dirname, 'r')
        # TODO this does not work yet, getmtime fail
        return send_file(zf.open(path))
    else:
        return send_file(path)


@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    UPLOAD_FOLDER = "/home/quant/iasset/tmp"
    if request.method == 'POST':
        file = request.files['file']
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return 'uploaded!'

    return '''
<!doctype html>
<html><body>
    <title>Upload file</title>
    <h1>Upload file</h1>
    <form action="" method=post enctype=multipart/form-data>
        <p><input type=file name=file>
           <input type=submit value=Upload>
    </form>
</body></html>
    '''


@app.route('/execute/<cmd>')
def execute(cmd):
    args = request._args.getlist('args')
    output = subprocess.check_output(cmd + ' ' + ' '.join(args), shell=True)
    return output


@app.route('/download/<path:path>')
def download(path):
    print path
    return send_from_directory('/home/quant/', path)


@app.route('/wssh')
def wssh():
    return render_template('wssh.html')


@app.route('/wssh/<hostname>/<username>')
def wssh_connect(hostname, username):
    app.logger.debug('{remote} -> {username}@{hostname}: {command}'.format(
            remote=request.remote_addr,
            username=username,
            hostname=hostname,
            command=request.args['run'] if 'run' in request.args else
                '[interactive shell]'
        ))

    # Abort if this is not a websocket request
    if not request.environ.get('wsgi.websocket'):
        app.logger.error('Abort: Request is not WebSocket upgradable')
        raise BadRequest()

    bridge = wssh.WSSHBridge(request.environ['wsgi.websocket'])
    try:
        bridge.open(
            hostname=hostname,
            username=username,
            password=request.args.get('password'),
            private_key=request.args.get('private_key'),
            key_passphrase=request.args.get('key_passphrase'),
            allow_agent=app.config.get('WSSH_ALLOW_SSH_AGENT', False))
    except Exception as e:
        app.logger.exception('Error while connecting to {0}: {1}'.format(
            hostname, e.message))
        request.environ['wsgi.websocket'].close()
        return str()
    if 'run' in request.args:
        bridge.execute(request.args)
    else:
        bridge.shell()

    # We have to manually close the websocket and return an empty response,
    # otherwise flask will complain about not returning a response and will
    # throw a 500 at our websocket client
    request.environ['wsgi.websocket'].close()
    return str()


if __name__ == '__main__':
    import config
    api.add_resource(RestApi, '/api/v1/<string:collection>', methods=['GET', 'POST', 'OPTIONS'])
    api.add_resource(RestApi1, '/api/v1/<string:collection>/<string:id>', methods=['OPTIONS', 'PUT', 'DELETE'])
    api.add_resource(SigninApi, '/signin', methods=['OPTIONS', 'POST'])

    mongoclient = pymongo.Connection(config.MONGO_PATH)
    db = mongoclient.iasset

    host = config.HOST
    port = config.PORT
    debug = config.DEBUG

    app.run(host=host, port=port, debug=debug)
