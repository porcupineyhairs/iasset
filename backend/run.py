from eve import Eve
from flask import send_from_directory
import os.path
import json

app = Eve()


@app.route('/<path:path>')
def main(path):
    return send_from_directory(os.path.abspath('static'), path)


@app.route('/login/<username>/<password>')
def login(username, password):
    print username, password
    user = {'status': 'login', 'username': 'Ralph'}
    return json.dumps(user)


if __name__ == '__main__':
    app.run()
