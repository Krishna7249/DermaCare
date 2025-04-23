from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

cred = credentials.Certificate("skindiseasedetection-d25eb-firebase-adminsdk-fbsvc-abe639d9d4.json")
firebase_admin.initialize_app(cred)

load_dotenv()

api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is not set.")

client = genai.Client(api_key=api_key)

system_instruction = (
    "You are an expert dermatologist. Provide detailed, well-structured responses using paragraphs and bullet points where appropriate. "
    "Format your answers clearly, similar to a routine or list format, with headings and bullet points. "
    "Don't ask all questions together. Stick to skin-related questions only. "
    "When the user asks about something unrelated, apologize and say you can't answer. "
    "Every response should be polite and not rude. "
    "Suggest home remedies when user asks. "
    "Greet the user when user says thank you; it means they got the response they were seeking, so you have to say goodbye or another polite farewell message with the same meaning."
)

@app.route("/ai-response", methods=["POST"])
def ai_response():
    user_input = request.json.get("input")
    
    if not user_input:
        return jsonify({"error": "Input cannot be empty."}), 400

    contents = [
        types.Content(
            role="model",
            parts=[
                types.Part.from_text(text=system_instruction),
            ],
        ),
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=user_input),
            ],
        ),
    ]
    
    generate_content_config = types.GenerateContentConfig(
        temperature=1,
        top_p=0.95,
        top_k=40,
        max_output_tokens=8192,
        response_mime_type="text/plain",
    )

    response_text = ""
    try:
        for chunk in client.models.generate_content_stream(
            model="gemini-2.0-flash",
            contents=contents,
            config=generate_content_config,
        ):
            response_text += chunk.text
    except Exception as e:
        print(f"Error during AI response generation: {str(e)}")  
        return jsonify({"error": "Failed to generate AI response.", "details": str(e)}), 500

    return response_text.strip(), 200, {"Content-Type": "text/plain"}

@app.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()  
        email = data.get("email")
        password = data.get("password")
        name = data.get("name")

        user = auth.create_user(email=email, password=password)
        return jsonify({"message": "User  created successfully", "uid": user.uid}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        return jsonify({"message": ""}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/api/clinics", methods=["GET"])
def get_nearby_clinics():
    try:
        # Get latitude, longitude, and radius from query parameters
        lat = request.args.get("lat")
        lng = request.args.get("lng")
        radius = request.args.get("radius", 5000)  # Default radius is 5km

        if not lat or not lng:
            return jsonify({"error": "Latitude and longitude are required"}), 400

        # Google Places API URL
        google_places_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

        # API Parameters
        params = {
            "location": f"{lat},{lng}",
            "radius": radius,
            "type": "hospital",  # Fetch hospitals or clinics
            "keyword": "skin dermatology", 
            "key": os.environ.get("GOOGLE_MAPS_API_KEY"),  # Use environment variable for API key
        }

        # Make the API request
        response = requests.get(google_places_url, params=params)
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch clinics from Google Places API"}), 500

        data = response.json()

        # Filter results to include only skin-related clinics
        filtered_results = [
            clinic for clinic in data.get("results", [])
            if "skin" in clinic.get("name", "").lower() or "dermatology" in clinic.get("name", "").lower()
        ]

        return jsonify({"results": filtered_results}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)