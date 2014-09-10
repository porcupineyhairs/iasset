from flask import Flask
app = Flask("iasset")

@app.route("/")
def main():
    return "Hello World!"

if __name__ == "__main__":
    app.run()