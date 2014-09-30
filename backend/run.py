from eve import Eve
from eve.endpoints import item_endpoint
from flask import send_from_directory, Flask
import os.path
import json

app = Eve()
#app.add_url_rule('/localhost:5000/api/v1/', 'users|item_additional_lookup', view_func=item_endpoint,
#                 methods=['GET', 'PUT', 'DELETE', 'POST', 'OPTIONS'])


@app.route('/<path:path>')
def main(path):
    return send_from_directory(os.path.abspath('static'), path)


if __name__ == '__main__':
    app.run()
