import axios from "axios";

<<<<<<< HEAD

=======
// Replace with your OpenAI API Key from https://platform.openai.com/account/api-keys
>>>>>>> cb5cbce2950087d570ce1e178ba32340cb29c6a0
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
<<<<<<< HEAD
    console.log("Bot response extracted:",   botResponse);
=======
    console.log("Bot response extracted:", botResponse);
>>>>>>> cb5cbce2950087d570ce1e178ba32340cb29c6a0

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
