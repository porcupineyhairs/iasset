from eve import Eve
import pymongo

app = Eve()

@app.route('/')
def main():
    pass

if __name__ == '__main__':
    app.run()
