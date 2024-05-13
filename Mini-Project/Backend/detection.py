from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import google.generativeai as genai

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

def details(pestName):
    
        pest = pestName
        
        # Configure the API key for authentication
        genai.configure(api_key="AIzaSyA6Bkhpmh6MY2-whmHejhRUsnA286YsExI")

        # Set up the model
        generation_config = {
            "temperature": 0.9,
            "top_p": 1,
            "top_k": 1,
            "max_output_tokens": 2048,
        }

        safety_settings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            
        ]

        model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                      generation_config=generation_config,
                                      safety_settings=safety_settings)

        # Start a conversation with Gemini using the user prompt
        user_prompt = f"I'm experiencing issues with {pest}. Can you help me with a given valueable details of about this pest as can understand farmers in 100 words?"
        convo = model.start_chat(history=[
  {
    "role": "user",
    "parts": ["car"]
  },
  {
    "role": "model",
    "parts": ["**Noun**\n\n1. A motor vehicle with four wheels, an engine that powers it, and seats for one to eight people.\n2. A railway carriage for passengers.\n3. A cable car or funicular railway.\n4. (informal) A stolen vehicle.\n\n**Verb**\n\n1. To transport or drive (someone or something) in a car.\n2. (slang) To steal (a car).\n\n**Examples**\n\n1. We drove to the beach in my new car.\n2. The car was parked illegally.\n3. The car was stolen from the driveway.\n4. The thief was arrested for car theft.\n\n**Synonyms**\n\n* Automobile\n* Vehicle\n* Motor car\n* Coach\n* Saloon\n* Sedan\n* Coupe\n* Hatchback\n* Estate car\n* Station wagon\n* SUV\n* Crossover"]
  },
])

        # Send the user query and receive the response
        convo.send_message(user_prompt)
        gemini_response=convo.last.text
        # format_text = gemini_response.replace("**", "<h2>").replace("\n\n", "<br>").replace("\n", " ").replace("<br><br>", "<br>").replace("</h2>", "</h2><br>")  # Adjusting line breaks and closing tags
        print(convo.last.text)

        return convo.last.text
 
#         pest = pestName
        
#         # Configure the API key for authentication
#         genai.configure(api_key="AIzaSyA6Bkhpmh6MY2-whmHejhRUsnA286YsExI")

#         # Set up the model
#         generation_config = {
#             "temperature": 0.9,
#             "top_p": 1,
#             "top_k": 1,
#             "max_output_tokens": 2048,
#         }

#         safety_settings = [
#             {
#                 "category": "HARM_CATEGORY_HARASSMENT",
#                 "threshold": "BLOCK_MEDIUM_AND_ABOVE"
#             },
#             {
#                 "category": "HARM_CATEGORY_HATE_SPEECH",
#                 "threshold": "BLOCK_MEDIUM_AND_ABOVE"
#             },
#             {
#                 "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
#                 "threshold": "BLOCK_MEDIUM_AND_ABOVE"
#             },
#             {
#                 "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
#                 "threshold": "BLOCK_MEDIUM_AND_ABOVE"
#             },
#         ]

#         model = genai.GenerativeModel(model_name="gemini-1.0-pro",
#                                       generation_config=generation_config,
#                                       safety_settings=safety_settings)

#         # Start a conversation with Gemini using the user prompt
#         model = genai.GenerativeModel(model_name="gemini-1.0-pro",
#                                       generation_config=generation_config,
#                                       safety_settings=safety_settings)

#         # Start a conversation with Gemini using the user prompt
#         user_prompt = f"I'm experiencing issues with {pest}. can you give me another better natural only one solution farmers can do with 50 words only"

#         convo = model.start_chat(history=[
#   {
#     "role": "user",
#     "parts": ["car"]
#   },
#   {
#     "role": "model",
#     "parts": ["**Noun**\n\n1. A motor vehicle with four wheels, an engine that powers it, and seats for one to eight people.\n2. A railway carriage for passengers.\n3. A cable car or funicular railway.\n4. (informal) A stolen vehicle.\n\n**Verb**\n\n1. To transport or drive (someone or something) in a car.\n2. (slang) To steal (a car).\n\n**Examples**\n\n1. We drove to the beach in my new car.\n2. The car was parked illegally.\n3. The car was stolen from the driveway.\n4. The thief was arrested for car theft.\n\n**Synonyms**\n\n* Automobile\n* Vehicle\n* Motor car\n* Coach\n* Saloon\n* Sedan\n* Coupe\n* Hatchback\n* Estate car\n* Station wagon\n* SUV\n* Crossover"]
#   },
# ])

#         # Send the user query and receive the response
#         convo.send_message(user_prompt)
#         gemini_response=convo.last.text
#         # format_text = gemini_response.replace("**", "<h2>").replace("\n\n", "<br>").replace("\n", " ").replace("<br><br>", "<br>").replace("</h2>", "</h2><br>")  # Adjusting line breaks and closing tags
#         print(convo.last.text)

#         return gemini_response
def get_solutions(pest_name):
    pest = pest_name
    
    # Configure the API key for authentication
    genai.configure(api_key="AIzaSyA6Bkhpmh6MY2-whmHejhRUsnA286YsExI")
 # Set up the model
    generation_config = {
        "temperature": 0.9,
        "top_p": 1,
        "top_k": 1,
        "max_output_tokens": 2048,
    }

    safety_settings = [
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        
    ]

    model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                  generation_config=generation_config,
                                  safety_settings=safety_settings)
    
    solutions = []

    
    for i in range(3):
        # Modify the user prompt slightly for each iteration
        user_prompt = f"I'm experiencing issues with {pest}. Can you provide solution {i + 1} with this names and 50 word summary to address this pest problem?"

        # Add previous solutions to the prompt to encourage diversity
        if i > 0:
            user_prompt += f" Here are the previous solutions: {' '.join(solutions[:i])}"

        convo = model.start_chat(history=[
            {
                "role": "user",
                "parts": [user_prompt]
            },
            {
                "role": "model",
                "parts": ["I'm here to help."]
            }
        ])

        # Send the user query and receive the response
        convo.send_message(user_prompt)
        gemini_response = convo.last.text

        # Ensure the response is unique by comparing with previous solutions
        while gemini_response in solutions:
            convo.send_message(user_prompt)
            gemini_response = convo.last.text

        solutions.append(gemini_response)
        print(f"Solution {i + 1}: {gemini_response}")

    return solutions
def getDetails(pestName):
        pest = pestName
        
        # Configure the API key for authentication
        genai.configure(api_key="AIzaSyA6Bkhpmh6MY2-whmHejhRUsnA286YsExI")

        # Set up the model
        generation_config = {
            "temperature": 0.9,
            "top_p": 1,
            "top_k": 1,
            "max_output_tokens": 2048,
        }

        safety_settings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
           
        ]

        model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                      generation_config=generation_config,
                                      safety_settings=safety_settings)

        # Start a conversation with Gemini using the user prompt
        user_prompt = f"I'm have as solution {pest}. can you give me clearly step by step how to do this solution"
        convo = model.start_chat(history=[
  {
    "role": "user",
    "parts": ["car"]
  },
  {
    "role": "model",
    "parts": ["**Noun**\n\n1. A motor vehicle with four wheels, an engine that powers it, and seats for one to eight people.\n2. A railway carriage for passengers.\n3. A cable car or funicular railway.\n4. (informal) A stolen vehicle.\n\n**Verb**\n\n1. To transport or drive (someone or something) in a car.\n2. (slang) To steal (a car).\n\n**Examples**\n\n1. We drove to the beach in my new car.\n2. The car was parked illegally.\n3. The car was stolen from the driveway.\n4. The thief was arrested for car theft.\n\n**Synonyms**\n\n* Automobile\n* Vehicle\n* Motor car\n* Coach\n* Saloon\n* Sedan\n* Coupe\n* Hatchback\n* Estate car\n* Station wagon\n* SUV\n* Crossover"]
  },
])

        # Send the user query and receive the response
        convo.send_message(user_prompt)
        gemini_response=convo.last.text
        # format_text = gemini_response.replace("**", "<h2>").replace("\n\n", "<br>").replace("\n", " ").replace("<br><br>", "<br>").replace("</h2>", "</h2><br>")  # Adjusting line breaks and closing tags
        print(convo.last.text)

        return gemini_response