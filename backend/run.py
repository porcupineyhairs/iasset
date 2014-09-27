from eve import Eve
from flask import send_from_directory, Flask
import os.path
import json

app = Eve()


@app.route('/<path:path>')
def main(path):
    return send_from_directory(os.path.abspath('static'), path)


if __name__ == '__main__':
    app.run()
