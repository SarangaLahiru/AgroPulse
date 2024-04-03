from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Example data (replace with your actual data)
data = {'message': 'Hello from Flask API'}

@app.route('/api/data')
def get_data():
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
