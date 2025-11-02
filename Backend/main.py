from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model_config import Chat_Models  

app = FastAPI()
class GetLlmModel(BaseModel):
    text: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
ChatBot = Chat_Models()

@app.get("/")
def main_root():
    return {"message": "Model initialized successfully"}

@app.post("/explain/stream")
def chat_stream(request: GetLlmModel):
    def generate():
        try:
            chain = ChatBot.askGemini_Explain_stream(request.text)
            for chunk in chain.stream(request.text):
                yield chunk
        except Exception as e:
            yield f"[Error] {str(e)}"

    return StreamingResponse(generate(), media_type="text/plain")

@app.post("/change_model")
def change_model(req: GetLlmModel):
    global ChatBot
    text = req.text.lower().strip()

    if text not in {"gemini", "gpt"}:
        return {"error": f"Model not found: {text}"}

    ChatBot = Chat_Models(text)
    return {"message": f"Model changed to {text}"}
