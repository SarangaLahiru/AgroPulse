from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import re
import bcrypt


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['usersdb']
users_collection = db['users']  # Assuming you have a collection named 'users'

def validate_password(password):
    # At least one uppercase letter
    if not re.search(r'[A-Z]', password):
        return False
    
    # At least one lowercase letter
    if not re.search(r'[a-z]', password):
        return False
    
    # At least one digit
    if not re.search(r'\d', password):
        return False
    
    # At least one special character
    if not re.search(r'[^a-zA-Z0-9]', password):
        return False
    
    # Minimum length of 8 characters
    if len(password) < 8:
        return False
    
    return True

@app.route('/api/data')
def get_data():
    data = {'message': 'Hello from Flask API'}
    return jsonify(data)

@app.route('/api/signup', methods=['POST'])
def signup():
    user_data = request.json
    
    
    required_fields = ['name', 'id', 'email', 'password', 'confirmPassword']
    # Validation
    for field in required_fields:
      if field not in user_data or not user_data[field]:
        return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Check if the email is already registered
    if users_collection.find_one({'email': user_data['email']}):
        return jsonify({'error': 'Email already exists'}), 400
    
    if users_collection.find_one({'id': user_data['id']}):
        return jsonify({'error': 'National ID card already used'}), 400
    
    # Check if passwords match
    if user_data['password'] != user_data['confirmPassword']:
        return jsonify({'error': 'Passwords do not match'}), 400
    
    # Validate password
    if not validate_password(user_data['password']):
        return jsonify({'error': 'Invalid password'}), 400
    
     # Hash the password
    hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt())
    user_data['password'] = hashed_password.decode('utf-8')
    
    
    # Insert user data into MongoDB
    users_collection.insert_one(user_data)
    
    return jsonify({'message': 'User signed up successfully'}), 201


@app.route('/api/signin', methods=['POST'])
def signin():
    user_data = request.json
    
    # Validation
    required_fields = ['id','password']
    for field in required_fields:
        if field not in user_data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
 
    # Check if user exists in the database
    user = users_collection.find_one({'id': user_data['id']})
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
     # Verify password
    if not bcrypt.checkpw(user_data['password'].encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({'error': 'Incorrect password'}), 401
    
    # Return success message
    return jsonify({'message': 'User signed in successfully',
                    'user': {
            'id': user['id'],
            'name': user['name'],
            'email': user['email']
            # Add more user data fields as needed
        }
                    }), 200


   

if __name__ == '__main__':
    app.run(debug=True)
