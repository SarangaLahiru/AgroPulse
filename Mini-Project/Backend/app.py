import pytesseract
from PIL import Image
import re

def extract_name_and_mobile(ocr_text):
    # Define the regular expression patterns for extracting name and mobile number
    name_pattern = re.compile(r'Name:-\s*(.*)', re.IGNORECASE)
    mobile_pattern = re.compile(r'D.OB:-\s*(.*)', re.IGNORECASE)
    
    # Search for the patterns in the OCR text
    name_match = name_pattern.search(ocr_text)
    mobile_match = mobile_pattern.search(ocr_text)
    
    # Extract the name and mobile number if found
    name = name_match.group(1).strip() if name_match else None
    mobile = mobile_match.group(1).strip() if mobile_match else None
    
    return name, mobile

def perform_text_detection(image_path):
    try:
        # Open the image file
        img = Image.open(image_path)
        
        # Perform OCR
        ocr_text = pytesseract.image_to_string(img)
        
        # Extract and print the name and mobile number
        name, mobile = extract_name_and_mobile(ocr_text)
        
        if name:
            print("Name:", name)
        else:
            print("Name not found in the OCR text.")
        
        if mobile:
            print("Mobile Number:", mobile)
        else:
            print("Mobile number not found in the OCR text.")
        
    except Exception as e:
        print("Error:", e)

# Example usage
image_path = './1.jpg'
perform_text_detection(image_path)
