from flask import Flask, jsonify, request, redirect, session
from flask_cors import CORS
from pymongo import MongoClient
import re
import pytesseract
from PIL import Image
import re
import bcrypt
from vonage import Client, Sms
from google.oauth2 import id_token
from google.auth.transport import requests


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

GOOGLE_CLIENT_ID = "796659410119-6p76ghbvl4tmcpmngk1v97u8h0n2g6d0.apps.googleusercontent.com"

client = Client(key="5e68450e", secret="CX3mEEXHz1cIzQZn")
sms = Sms(client)
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
def extract_name_and_mobile(ocr_text):
    # Define the regular expression patterns for extracting name and mobile number
    name_pattern = re.compile(r'Name:\s*(.*)', re.IGNORECASE)
    mobile_pattern = re.compile(r'No::\s*(.*)', re.IGNORECASE)
    
    # Search for the patterns in the OCR text
    name_match = name_pattern.search(ocr_text)
    mobile_match = mobile_pattern.search(ocr_text)
    
    # Extract the name and mobile number if found
    name = name_match.group(1).strip() if name_match else None
    mobile = mobile_match.group(1).strip() if mobile_match else None
    
    return name, mobile
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
    
    return jsonify({'message': 'User signed up successfully',
                     'user': {
            'id': user_data['id'],
            'name': user_data['name'],
            'email': user_data['email']
            # Add more user data fields as needed
        }
                    
                    }), 201


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

@app.route('/api/perform_text_detection', methods=['POST'])
def perform_text_detection():
    try:
        # Get the uploaded image file
        image_file = request.files['image']

        # Perform OCR
        img = Image.open(image_file)
        ocr_text = pytesseract.image_to_string(img)

        # Extract name and mobile number from OCR text
        name, mobile = extract_name_and_mobile(ocr_text)

        # Return the extracted values as JSON response
        return jsonify({
            'name': name,
            'mobile': mobile
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/signupWithImage', methods=['POST'])
def signupImage():
    user_data = request.json
    
    
    required_fields = ['name', 'id', 'Phone','password']
    # Validation
    for field in required_fields:
      if field not in user_data or not user_data[field]:
        return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Check if the email is already registered
    
    if users_collection.find_one({'id': user_data['id']}):
        return jsonify({'error': 'National ID card already used'}), 400
    
    # Check if the phone number starts with "94"
    if not user_data['Phone'].startswith("+94"):
        return jsonify({'error': 'Phone number must start with "+94"'}), 400
    
    
    
     # Hash the password
    user_password=user_data['password']
    hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt())
    user_data['password'] = hashed_password.decode('utf-8')
    
    users_collection.insert_one(user_data)
    # Insert user data into MongoDB
    success = send_sms_message(user_data['Phone'], f"Your new password is: {user_password}")
    if success:
        return jsonify({'message': 'User signed up successfully',
                        'user': {
            'id': user_data['id'],
            'name': user_data['name'],
            'email': user_data['email']
                        }
                        
                        }), 201
    else:
        return jsonify({'error': 'Failed to send SMS. Please try again later.'}), 500

def send_sms_message(phone, message):

    try:
        # Send the SMS message
        response = sms.send_message({
            "from": "Vonage APIs",
            "to": phone,
            "text": message
        })
        
        # Check if the message was sent successfully
        if response["messages"][0]["status"] == "0":
            return True
        else:
            print(f"Failed to send SMS: {response['messages'][0]['error-text']}")
            return False
    except Exception as e:
        print(f"Failed to send SMS: {e}")
        return False


    # Validate Google ID token
    id_token_raw = request.args.get('id_token')
    if not id_token_raw:
        return jsonify({'error': 'Missing Google ID token'}), 400
    
    try:
        id_info = id_token.verify_oauth2_token(id_token_raw, requests.Request(), GOOGLE_CLIENT_ID)
        user_email = id_info['email']
        
        # Check if the user already exists in the database
        user = users_collection.find_one({'email': user_email})
        if user:
            # User exists, generate JWT token or session and return
            # Example: session['user'] = user_email
            return jsonify({'message': 'User logged in successfully'}), 200
        else:
            # User does not exist, create a new user account
            # You can also redirect the user to a signup page with prefilled data
            return jsonify({'error': 'User does not exist. Please sign up.'}), 404
    
    except ValueError as e:
        return jsonify({'error': 'Invalid Google ID token'}), 400

@app.route('/api/google_signup', methods=['POST'])
def signup_google():
    token = request.json.get('token')
    if not token:
        return jsonify({'error': 'Token is required'}), 400
    
    try:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        # You can extract user details from id_info and save to database
        # Example: name = id_info['name'], email = id_info['email']
        return jsonify({'message': 'User signed up successfully'}), 200
    except ValueError as e:
        return jsonify({'error': 'Invalid token'}), 400
if __name__ == '__main__':
    app.run(debug=True)
