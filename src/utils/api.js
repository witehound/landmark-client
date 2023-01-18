import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getAllpins = async () => {
  try {
    const res = axios.get(`${baseUrl}/pin`);
    return res;
  } catch (err) {
    console.log(err.message);
  }
};
