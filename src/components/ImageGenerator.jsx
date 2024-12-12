import React, { useState } from "react";
import { sendMessageToChatGPT } from "../services/OpenAiServices";
// import { UserContext } from "../context/UserContext";

// Assuming you already have the OpenAI integration here
const ImageSearchComponent = () => {
  const [query, setQuery] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // OpenAI Image Generation Function
  const generateImage = async (query) => {
    setLoading(true);
    setError(""); // Reset error
    try {
      // Make OpenAI API call (you should already have this working in your code)
      const response = await sendMessageToChatGPT({
        prompt: query,
        n: 1,
        size: "512x512",
      });

      // Get the image URL
      const imageUrl = response.data[0].url;
      setImageUrl(imageUrl);
    } catch (err) {
      console.error("Error generating image:", err);
      setError("An error occurred while generating the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      generateImage(query);
    } else {
      setError("Please enter a valid query!");
    }
  };

  return (
    <div className="image-search-container">
      <h2>AI Image Generator</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter search query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "10px", width: "80%", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Generate Image
        </button>
      </div>

      {/* Display Loading State */}
      {loading && <p>Loading...</p>}

      {/* Display Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Image */}
      {imageUrl && (
        <div className="generated-image">
          <img src={imageUrl} alt="Generated" style={{ maxWidth: "100%", borderRadius: "10px" }} />
        </div>
      )}
    </div>
  );
};

export default ImageSearchComponent;
