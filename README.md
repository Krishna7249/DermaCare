# DermaCare

**DermaCare** is a skin disease detection system that uses machine learning to help users identify skin conditions from images. The system analyzes the uploaded image and provides accurate results along with recommendations for medical attention if necessary. It also features an AI-powered chatbot that can offer personalized skincare recommendations based on the detected disease.

## Features

- **Skin Disease Detection**: Upload an image of your skin to get real-time disease detection results with 99% accuracy.
- **AI Chatbot**: Chat with an expert dermatologist powered by OpenAI for personalized skincare advice.
- **Clinic Finder**: Get recommendations for nearby skin clinics and hospitals using a Maps API in case of emergency.
- **User History**: The system stores user history for future reference, allowing you to track past diagnoses.

## Technologies Used

- **Machine Learning**: SVM, LSTM, CNN, KNN, and Linear Regression for disease detection.
- **Backend**: Flask for serving the machine learning model.
- **Frontend**: React and Tailwind CSS for a responsive, user-friendly interface.
- **Authentication & Storage**: Firebase for user authentication and storing history.
- **Maps API**: Fetches clinic information to display nearby hospitals and clinics.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/dermacare.git
2. Install the dependencies: Navigate to the project directory and install the required dependencies.
    ```bash
    cd dermacare
    pip install -r requirements.txt
3. Set up Firebase:

- **Create a Firebase project and set up Firebase Authentication and Firestore.**

- **Replace the Firebase credentials in the appropriate files (firebaseConfig.js for frontend and backend).**

4. **Run the Flask Backend**: Start the Flask server to serve the model.
   ```bash
   python app.py
                   
5. **Run the React Frontend**: In a new terminal, navigate to the `frontend` directory and start the React app.
   ```bash
   cd frontend
   npm start

6.Access the application: Open your browser and go to http://localhost:3000.

## Contributing
Feel free to fork this repository and create a pull request with improvements, bug fixes, or new features.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
