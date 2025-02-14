import React from "react";

const responseImages = ({ uploadedImage, responseImages = [] }) => {
  return (
    <div className="image-section">
      {/* Uploaded Image */}
      {uploadedImage && (
        <div className="uploaded-image-container">
          {/* <p className="image-label">Uploaded Image</p> */}
          <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
        </div>
      )}

      {/* AI Response Images in Grid */}
      {responseImages.length > 0 && (
        <div className="response-images-container">
          <p className="image-label">Similar Results</p>
          <div className="image-grid">
            {responseImages.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`Similar ${index}`}
                className="response-img"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default responseImages;
