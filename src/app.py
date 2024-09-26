from flask import Flask, jsonify, request, send_from_directory,send_file
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS
from fpdf import FPDF
import json
import os

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/hotels_db'
app.config['UPLOAD_FOLDER'] = 'D:/New folder/GlowGetaway/src/frontend/images/Hotel'  # Directory where images are stored

mongo = PyMongo(app)
CORS(app)

# Load itinerary data from JSON file
def load_itinerary_data():
    with open('trip_plans_fixed.json', 'r') as f:
        return json.load(f)

itineraries = load_itinerary_data()

# Define a custom PDF class with headers and footers
class CustomPDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 16)
        self.set_text_color(30, 144, 255)  # Dodger blue color for the header
        self.cell(0, 10, 'Travel Itinerary', ln=True, align='C')
        self.set_draw_color(50, 50, 50)  # Grey line color
        self.set_line_width(0.5)
        self.line(10, 20, 200, 20)  # Draw a line below the header

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 10)
        self.set_text_color(128, 128, 128)  # Grey color for the footer
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

def create_itinerary_pdf(itinerary, source, destination, days):
    # Create an instance of the CustomPDF class
    pdf = CustomPDF()

    # Add the first page for the title
    pdf.add_page()

    # Add background image
    pdf.image('D:/New folder/GlowGetaway/public/images/background.jpg', x=0, y=0, w=pdf.w, h=pdf.h)

    # Set the font for the title
    pdf.set_font("Arial", 'B', 24)  # Larger font size for the title
    pdf.set_text_color(0, 0, 128)  # Navy blue text color

    # Calculate the height for centering
    page_height = pdf.h  # Total height of the page
    line1_height = 50  # Height of the first line
    line2_height = 10   # Height of the second line
    total_text_height = line1_height + line2_height

    # Calculate the vertical position to center the text
    vertical_position = (page_height - total_text_height) / 2

    # Set the position and add the text
    pdf.set_y(vertical_position)  # Move the cursor to the calculated vertical position
    pdf.cell(0, line1_height, txt=f"Your Itinerary from {source} to {destination}", ln=True, align='C')  # First line
    pdf.cell(0, line2_height, txt=f"For {days} days", ln=True, align='C')  # Second line
    pdf.ln(10)  # Optional: add a small space after the title section


    # Iterate through the itinerary and add each day's activities
    for index, day in enumerate(itinerary, 1):
        pdf.add_page()  # Add a new page for each day

        # Add background image for each day
        pdf.image('D:/New folder/GlowGetaway/public/images/background.jpg', x=0, y=0, w=pdf.w, h=pdf.h)

        # Set title for the day
        pdf.set_text_color(255, 255, 255)
        pdf.set_font("Arial", 'B', 18)  # Slightly smaller font for daily titles
        pdf.cell(0, 10, txt=f"Day {index}:", ln=True, align='L')

        # Split day activities
        day_title, *activities = day.split(':')
        
        pdf.set_font("Arial", size=20)  # Regular font size for activities
        # pdf.set_text_color(0, 0, 0)  # Black color for activity text
        if activities:
            page_height = pdf.h  # Total height of the page
            line1_height = 50  # Height of the first line
            line2_height = 10   # Height of the second line
            total_text_height = line1_height + line2_height

            # Calculate the vertical position to center the text
            vertical_position = (page_height - total_text_height) / 2 - 10

            # Set the position and add the text
            pdf.set_y(vertical_position)  # Move the cursor to the calculated vertical position
            activities_str = ':'.join(activities)  # Join the list into a string
            for activity in activities_str.split(','):  # Split the joined string by commas
                pdf.cell(0, 10, txt=f"- {activity.strip()}", ln=True, align='L')
        pdf.ln(5)  # Add some space after each day's section

    # Save the generated PDF
    pdf_file = f"itinerary_from_{source}_to_{destination}.pdf".replace(" ", "_").replace("/", "_")
    pdf.output(pdf_file)
    return pdf_file


# Endpoint to generate and download the PDF
@app.route('/api/download-itinerary', methods=['POST'])
def download_itinerary():
    data = request.get_json()
    itinerary = data.get('itinerary', [])
    source = data.get('source', '')
    destination = data.get('destination', '')
    days = data.get('days', 1)

    if not itinerary:
        return jsonify({'error': 'Itinerary data is missing.'}), 400

    # Generate the PDF
    pdf_file = create_itinerary_pdf(itinerary, source, destination, days)

    # Send the generated PDF file with the correct download name
    return send_file(pdf_file, as_attachment=True)

# Get list of all hotels
@app.route('/api/hotels', methods=['GET'])
def get_hotels():
    hotels = mongo.db.hotels.find()
    result = []
    for hotel in hotels:
        result.append({
            'id': str(hotel['_id']),
            'name': hotel['name'],
            'location': hotel['location'],
            'image': f'{hotel["image"]}',  # Serve image from static directory
            'reviews': hotel['reviews'],
            'description': hotel.get('description', 'No description available')
        })
    return jsonify(result)

# Get a single hotel by ID
@app.route('/api/hotels/<id>', methods=['GET'])
def get_hotel(id):
    hotel = mongo.db.hotels.find_one({'_id': ObjectId(id)})
    if hotel:
        return jsonify({
            'id': str(hotel['_id']),
            'name': hotel['name'],
            'location': hotel['location'],
            'image': f'{hotel["image"]}',  # Serve image from static directory
            'reviews': hotel['reviews'],
            'description': hotel.get('description', 'No description available')
        })
    return jsonify({'error': 'Hotel not found'}), 404

# Serve static files (images)
@app.route('/static/images/Hotel/<path:filename>', methods=['GET'])
def serve_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Get itinerary based on source, destination, and days
@app.route('/api/itinerary', methods=['POST'])
def get_itinerary():
    try:
        data = request.get_json()
        source = data.get('source')
        destination = data.get('destination')
        days = data.get('days')

        # Validate inputs
        if not source or not destination or not days:
            return jsonify({'error': 'Source, destination, and days are required.'}), 400

        try:
            days = int(days)
            if days <= 0:
                return jsonify({'error': 'Days must be a positive number.'}), 400
        except ValueError:
            return jsonify({'error': 'Days must be a valid number.'}), 400

        # Find the itinerary matching source, destination, and days
        result = next((item for item in itineraries
                       if item['source'].lower() == source.lower()
                       and item['destination'].lower() == destination.lower()
                       and item['days'] == days),
                      None)

        # Return the result
        if result:
            return jsonify({'itinerary': result.get('itinerary', [])})
        else:
            return jsonify({'itinerary': [], 'error': 'No itinerary found for the selected route.'}), 404

    except Exception as e:
        # Log the exception for debugging
        app.logger.error(f"An error occurred: {e}")
        return jsonify({'error': 'An unexpected error occurred.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
