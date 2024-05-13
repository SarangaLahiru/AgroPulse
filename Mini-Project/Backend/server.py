from flask import Flask, jsonify, request, redirect, session
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import re
import pytesseract
from PIL import Image
import re
import bcrypt
from vonage import Client, Sms
from detection import predict,details,get_solutions,getDetails
from translate import translations
from datetime import datetime




app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# client = Client(key="5e68450e", secret="CX3mEEXHz1cIzQZn")
client = Client(key="b7faa0b9", secret="zi6PY2HKl3wL5zAu") 
sms = Sms(client)

client = MongoClient('mongodb://localhost:27017/')
db = client['usersdb']
users_collection = db['users']  # Assuming you have a collection named 'users'
contacts_collection = db['contacts'] # Have a collection named contacts

def validate_password(password):
     # At least one uppercase letter
    if not re.search(r'[A-Z]', password):
        return "Password must contain at least one uppercase letter."
    
    # At least one lowercase letter
    if not re.search(r'[a-z]', password):
        return "Password must contain at least one lowercase letter."
    
    # At least one digit
    if not re.search(r'\d', password):
        return "Password must contain at least one digit."
    
    # At least one special character
    if not re.search(r'[^a-zA-Z0-9]', password):
        return "Password must contain at least one special character."
    
    # Minimum length of 8 characters
    if len(password) < 8:
        return "Password must be at least 8 characters long."
    
    return True  # Password is valid
    
    
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
    
    password_validation_result = validate_password(user_data.get('password'))
    if password_validation_result is not True:
        return jsonify({'error': password_validation_result}), 400
    
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


@app.route('/api/detection', methods=['POST'])
def detection():
    # Check if the request contains an image file
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    # Get the image file from the request
    image_file = request.files['image']
    
    # Call the predict function and pass the image file
    result = predict(image_file)
    details1= details(result)
     # Get details and solutions for the detected pest
    solutions = get_solutions(result)
    
    # Return the result along with details and solutions as a JSON response
    return jsonify({'result': result,'details':details1, 'solution1': solutions[0], 'solution2': solutions[1], 'solution3': solutions[2]})

@app.route('/api/detection_details', methods=['POST'])
def detection_details():
    
    details = request.json
    
    # Call the predict function and pass the image file
    
    dis= getDetails(details)
    # Return the predicted class as a JSON response
    return jsonify({'solution_details': dis})
    


@app.route('/change-language', methods=['POST'])
def change_language():
    language = request.json.get('language', 'en')
    session['language'] = language
    return {'success': True}

@app.route('/get-translations', methods=['POST', 'GET'])
def get_translations():
    if request.method == 'POST':
        language = request.json.get('language', 'en')  # Get language from JSON data in POST request
    else:
        language = request.args.get('language', 'en')  # Get language from query parameter in GET request
    
    return jsonify(translations.get(language, translations['en']))


# Get the Contact Form Details
@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    date_time = datetime.now()

    if name and email and message:
        contacts_collection.insert_one({
            'name': name,
            'email': email,
            'message': message,
            'date_time': date_time
        })
        return jsonify({'message': 'Message sent successfully!'}), 201
    else:
        return jsonify({'error': 'All fields are required!'}), 400







if __name__ == '__main__':
    app.secret_key = 'your_secret_key' 
    app.run(debug=True)
