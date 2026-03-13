ChatBot_langchain is a conversational AI chatbot built using LangChain that enables intelligent question answering and contextual conversations. The system integrates language models with external data sources to provide more accurate and relevant responses.

Features

AI chatbot powered by LangChain

Context-aware conversations

Integration with LLM APIs

Retrieval-based question answering

Extendable architecture for knowledge-based systems

Tech Stack

Python

LangChain

OpenAI / LLM APIs

AI Chatbot Development

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
