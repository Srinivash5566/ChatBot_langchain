"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./page.module.css";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:8000/explain/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botReply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        botReply += decoder.decode(value);
        setMessages([...newMessages, { role: "assistant", content: botReply }]);
      }
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: `Error: ${err.message}` },
      ]);
    }
  };

  // 🔽 when model is changed
  const handleModelChange = async (e) => {
    const newModel = e.target.value;
    setSelectedModel(newModel);

    try {
      const res = await fetch("http://127.0.0.1:8000/change_model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newModel }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Model changed:", data);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Model changed to ${newModel}` },
        ]);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      console.error("Error changing model:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `❌ Failed to change model: ${err.message}`,
        },
      ]);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <select
          className={styles.select}
          name="ModelChoice"
          value={selectedModel}
          onChange={handleModelChange}
        >
          <option value="gemini">Gemini</option>
          <option value="gpt">ChatGPT</option>
        </select>
        Chat-Bot
        <div className={styles.placeholder}></div>
      </header>

      <main className={styles.chatArea}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.message} ${
              msg.role === "user" ? styles.user : styles.bot
            }`}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
      </main>

      <footer className={styles.footer}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className={styles.button} onClick={sendMessage}>
          Send
        </button>
      </footer>
    </div>
  );
}
