import React from "react";

const ChatInput = ({
  uploadedImage,
  handleImageUpload,
  setInput,
  startListening,
  handleTextSearch,
  listening,
  input,
}) => {
  return (
    <div className="user_input ">
      <div style={{ textAlign: "left" }} className="file-upload-container">
        <label className="file-upload-label">
          📂 Choose File
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
        <span className="file-name">
          {uploadedImage ? uploadedImage.name : "No file chosen"}
        </span>
      </div>

      <div className="input_wrapper">
        <input
          type="text"
          placeholder={
            listening ? "Please speak....." : "Search for fashion products..."
          }
          className="ai_input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="mic-btn" onClick={startListening}>
          🎤
        </button>
        <button className="search-btn" onClick={() => handleTextSearch(input)}>
          🔍
        </button>
      </div>
    </div>
  );
};
export default ChatInput;
