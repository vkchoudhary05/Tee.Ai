import axios from "axios";

const OPENAI_API_KEY = "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"



const endpoint = "https://openrouter.ai/api/v1/chat/completions";

export const sendMessageToChatGPT = async (message) => {
  try {
   

    const response = await axios.post(
      endpoint,
      {
        model: "openai/gpt-3.5-turbo", // Use the appropriate GPT model
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API response received:", response.data);

    const botResponse =
      response?.data?.choices?.[0]?.message?.content || "No response from GPT";
    console.log("Bot response extracted:",   botResponse);

    return botResponse;
  } catch (error) {
    console.error("Error during communication with ChatGPT API:", error);

    // Handle specific errors
    if (error.response) {
      console.error("Server responded with error status:", error.response.status);
      console.error("Error response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received from server.");
    } else {
      console.error("Error setting up the request:", error.message);
    }

    return "Something went wrong.";
  }
};
