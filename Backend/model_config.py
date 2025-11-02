from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from dotenv import load_dotenv
import os

load_dotenv()

class Chat_Models:
    def __init__(self,llmModel="gemini"):
        if llmModel == "gemini":
            self.llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro")
        elif llmModel == "gpt":
            self.llm = ChatOpenAI(model="gpt-4o")
    def askGemini_Explain_stream(self,text):
        Template_llm = (
    {"text": RunnablePassthrough()} 
    | ChatPromptTemplate.from_template(
        "You are a helpful and knowledgeable AI assistant. "
        "Read the following question carefully and provide a clear, accurate, and concise answer.\n\n"
        "Question:\n````{text}````"
    )
    | self.llm
    | StrOutputParser()
    )
        return Template_llm