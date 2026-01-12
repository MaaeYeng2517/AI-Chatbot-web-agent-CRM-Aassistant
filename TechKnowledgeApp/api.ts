import axios from "axios";

const API_URL = "https://api.example.com"; // เปลี่ยนเป็น backend ของคุณ

export const fetchSolutions = async () => {
  try {
    const response = await axios.get(`${API_URL}/solutions`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchResources = async () => {
  try {
    const response = await axios.get(`${API_URL}/resources`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
