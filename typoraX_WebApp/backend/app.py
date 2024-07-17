# Your backend application code
from flask import Flask, jsonify, request

app = Flask(__name__)

# Example route
@app.route('/')
def index():
    return jsonify(message='Welcome to TyporaX Web App!')

if __name__ == '__main__':
    app.run(debug=True)
