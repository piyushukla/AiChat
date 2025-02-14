import React, { useState, useEffect } from "react";
import { analyzeImage, searchFashionProducts } from "../api/analyzeImage";
import PostResponseImage from "./ResponseImages";
import ChatInput from "./ChatInput";
import DisplayMsg from "./DisplayMsg";

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [responseImages, setResponseImages] = useState([]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setUploadedImage(null);
      setResponseImages([]);
      setInput("");
      setMessages([]);
    }
  }, [isOpen]);

  const startListening = () => {
    const recognition =
      new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = "en-US"; // Set language
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setListening(false);
    };
  };

  const handleTextSearch = async () => {
    if (!input.trim()) return;
    setResponseImages([]);
    setUploadedImage(null);
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]); // Add user message to chat
    setLoading(true);

    try {
      const response = await searchFashionProducts(input);
      const botMessage = {
        sender: "bot",
        text: response || "No results found!",
      };
      setMessages([...messages, userMessage, botMessage]); // Add AI response
      setInput("");
    } catch (error) {
      console.error("AI Text Search Error:", error);
    } finally {
      setLoading(false);
      setInput(""); // Clear input after sending
    }
  };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setMessages([]);
    setUploadedImage(null);
    setResponseImages([]);
    if (file) {
      setLoading(true);
      setUploadedImage(URL.createObjectURL(file));

      try {
        const imgResults = await analyzeImage(file);
        setResponseImages(imgResults || []);
      } catch (error) {
        console.error("Error processing image:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  console.log("mesage", messages);
  return (
    <>
      {/* Floating Action Button */}
      <div className="ai-fab" onClick={() => setIsOpen(!isOpen)}>
        <span className="ai-icon">AI Assistance 💬</span>
      </div>

      {/* AI Chat Modal */}
      {isOpen && (
        <div className="ai-modal">
          <div className="ai-modal-header">
            <h3>AI Chat Assistant</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <p className="loading-text">🔄 AI is analyzing your input...</p>
          )}

          {/* Placeholder */}
          {!uploadedImage && !loading && (
            <p className="placeholder-text">
              Upload an image to find similar fashion products
            </p>
          )}
          {/* Response Text Msg */}
          <DisplayMsg messages={messages} />

          {/* IMAGE UPLOAD & AI RESULTS SECTION */}
          <PostResponseImage
            uploadedImage={uploadedImage}
            responseImages={responseImages}
          />

          {/* Image Upload Section */}
          <ChatInput
            input={input}
            uploadedImage={uploadedImage}
            handleImageUpload={handleImageUpload}
            setInput={setInput}
            startListening={startListening}
            handleTextSearch={handleTextSearch}
            listening={listening}
          />
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
