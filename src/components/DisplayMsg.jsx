import React from "react";

const DisplayMsg = ({ messages }) => {
  return (
    <div className="chat_container">
      {messages.map((msg, index) => (
        <div
          style={{
            whiteSpace: "pre-wrap",
            background: "#f3f4f6",
            padding: "10px",
            borderRadius: "8px",
            maxHeight: "200px",
            overflowY: "auto",
          }}
          key={index}
          className={`message ${msg.sender} ${
            msg.sender === "ai" ? "ai-response" : ""
          }`}
        >
          {msg.sender === "ai"
            ? // AI Response Styling
              msg.text
                .split("*")
                .map((item, i) =>
                  item.trim() ? <span key={i}>{item.trim()}</span> : null
                )
            : msg.text}
        </div>
      ))}
    </div>
  );
};
export default DisplayMsg;
