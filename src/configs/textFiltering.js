import axios from "axios";

export const handleModerationTest = async (text) => {
  const options = {
    method: "GET",
    url: "https://community-purgomalum.p.rapidapi.com/json",
    params: { text },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
      "x-rapidapi-host": process.env.NEXT_PUBLIC_X_RAPID_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error calling moderation API:", error);
    throw error;
  }
};
