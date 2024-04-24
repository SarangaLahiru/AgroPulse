from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

# Load the trained machine learning model
model = load_model('insect_model1.h5')

# Define class names
class_names = [
    'Africanized Honey Bees (Killer Bees)',
    'Aphids',
    'Armyworms',
    'Brown Marmorated Stink Bugs',
    'Cabbage Loopers',
    'Citrus Canker',
    'Colorado Potato Beetles',
    'Corn Borers',
    'Corn Earworms',
    'Fall Armyworms',
    'Fruit Flies',
    'Spider Mites',
    'Thrips',
    'Tomato Hornworms',
    'Western Corn Rootworms'
]

# Create a dictionary to map numeric index to class names
index_to_class = {i: class_name for i, class_name in enumerate(class_names)}

# Function to preprocess image data
def preprocess_image(img):
    # Preprocess the image as required by your model
    img = image.load_img(img, target_size=(224, 224))  # Resize the image to match input shape
    img = image.img_to_array(img)
    img = img / 255.0  # Normalize pixel values
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

def predict(image_file):
    # Save the image temporarily
    img_path = os.path.join('uploads', image_file.filename)
    image_file.save(img_path)
    
    # Preprocess the image
    processed_img = preprocess_image(img_path)
    
    # Make prediction
    prediction = model.predict(processed_img)
    
    # Get the predicted class
    predicted_index = np.argmax(prediction)
    predicted_class = index_to_class.get(predicted_index, "Unknown")
    
    # Remove the temporary image file
    # os.remove(img_path)
    
    return predicted_class
