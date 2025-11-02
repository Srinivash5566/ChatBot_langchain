<!-- Backend Setup (FastAPI) -->

### Create and activate a virtual environment

cd Backend
python -m venv venv
source venv/bin/activate # macOS/Linux
venv\Scripts\activate # Windows

### Install dependencies

pip install -r requirements.txt

### Create a .env file

GOOGLE_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

### Run the FastAPI server

uvicorn main:app --reload

<!-- Frontend Setup (Next.js) -->

### Navigate to your React folder

cd Frontend

### Install dependencies

npm install

### Start the development server

npm start
