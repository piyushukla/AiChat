import { GoogleGenerativeAI } from "@google/generative-ai";
import { DUMMYPROD } from "../assets/productList";

const apiKey = "AIzaSyDWNZhRpgtXmW2vAqxVd-bnKlVfGpxE79U"; // Replace with your API Key

const genAI = new GoogleGenerativeAI(apiKey);

export const analyzeImage = async (imageFile) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);

      reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1];

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const response = await model.generateContent({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "Analyze this image and suggest similar fashion products with image references.",
                },
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: base64Image,
                  },
                },
              ],
            },
          ],
        });

        const result = await response.response.text();
        console.log("📝 AI Response:", result);

        // 🔥 Call Google Search API to get similar images
        const similarImages = await fetchSimilarImages(result);
        resolve(similarImages);
      };

      reader.onerror = (error) => reject(error);
    } catch (error) {
      console.error("Error analyzing image:", error);
      reject(error);
    }
  });
};

// **Updated fetchSimilarImages function**
const fetchSimilarImages = async (query) => {
  const GOOGLE_SEARCH_API_KEY = "AIzaSyA8QSl8U7HgngXAhIIYEGQBW1UPILIwBHU";
  const SEARCH_ENGINE_ID = "b53682e67ab804978";

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
        query
      )}&searchType=image&key=${GOOGLE_SEARCH_API_KEY}&cx=${SEARCH_ENGINE_ID}`
    );

    const data = await response.json();
    console.log("🔍 Similar Images Found:", data.items);

    if (data.items) {
      // Extract image URLs
      return data.items.slice(0, 10).map((item) => item.link);
    } else {
      console.error("❌ No similar images found");
      return DUMMYPROD;
    }
  } catch (error) {
    console.error("❌ Error in AI Text Search:", error);

    // 🔥 CHECK FOR SERVER ERRORS (503, 500)
    if (error.response && error.response.status === 503) {
      alert(
        "🚨 AI service is temporarily unavailable (503 Error). Please try again later."
      );
    } else if (error.response && error.response.status >= 500) {
      alert("🚨 Server issue detected (500 Error). Try again after some time.");
    }
    // 🔥 CHECK FOR NETWORK ISSUES
    else if (
      error.message.includes("NetworkError") ||
      error.message.includes("Failed to fetch")
    ) {
      alert(
        "⚠️ Network issue detected. Please check your internet connection."
      );
    }
    // 🔥 OTHER ERRORS
    else {
      alert(
        "❌ Something went wrong while fetching results. Please try again."
      );
    }

    return null; // Return NULL if there's an error
  }
};

export const searchFashionProducts = async (query) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `List the top 5 similar fashion products for "${query}" in one short line, only brand & product names.`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 50, // 🔥 Limit response length
        temperature: 0.6, // 🔥 Keep response balanced & factual
      },
    });

    const result = await response.response.text();
    console.log("AI Text Search Response:", result);

    return result; // Now the response will be concise
  } catch (error) {
    console.error("❌ Error in AI Text Search:", error);

    // 🔥 CHECK FOR SERVER ERRORS (503, 500)
    if (error.response && error.response.status === 503) {
      alert(
        "🚨 AI service is temporarily unavailable (503 Error). Please try again later."
      );
    } else if (error.response && error.response.status >= 500) {
      alert("🚨 Server issue detected (500 Error). Try again after some time.");
    }
    // 🔥 CHECK FOR NETWORK ISSUES
    else if (
      error.message.includes("NetworkError") ||
      error.message.includes("Failed to fetch")
    ) {
      alert(
        "⚠️ Network issue detected. Please check your internet connection."
      );
    }
    // 🔥 OTHER ERRORS
    else {
      alert(
        "❌ Something went wrong while fetching results. Please try again."
      );
    }

    return null; // Return NULL if there's an error
  }
};
