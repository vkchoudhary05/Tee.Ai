import React, { useState } from "react";
import { PDFDocument } from "pdf-lib"; // For PDF parsing
import { sendMessageToChatGPT } from "../services/OpenAiServices"; // Import the API helper function

const PdfUploader = () => {
  const [pdfText, setPdfText] = useState(""); // Extracted text from the PDF
  const [responseText, setResponseText] = useState(""); // ChatGPT's response
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError("Please upload a valid PDF file.");
      return;
    }

    try {
      setError("");
      setIsLoading(true);

      // Read and parse the PDF
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const extractedText = pages.map((page) => page.getTextContent()).join("\n");
      setPdfText(extractedText);

      // Send extracted text to ChatGPT
      const botResponse = await sendMessageToChatGPT(
        `Extract meaningful information from the following text:\n\n${extractedText}`
      );

      setResponseText(botResponse);
    } catch (err) {
      console.error("Error processing the file:", err);
      setError("Failed to process the PDF file or communicate with Tee.Ai.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Upload PDF </h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        style={{ margin: "10px 0" }}
      />

      {pdfText && (
        <div style={{ marginTop: "10px" }}>
          <h2>Extracted PDF Text:</h2>
          <textarea
            rows="10"
            cols="50"
            value={pdfText}
            readOnly
            style={{ width: "100%", resize: "none" }}
          />
        </div>
      )}

      {isLoading && <p>Processing...</p>}

      {responseText && (
        <div style={{ marginTop: "10px" }}>
          <h2>ChatGPT Response:</h2>
          <textarea
            rows="10"
            cols="50"
            value={responseText}
            readOnly
            style={{ width: "100%", resize: "none" }}
          />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PdfUploader;
