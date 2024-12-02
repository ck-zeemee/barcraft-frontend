import axios from "axios";

// Set up the base URL for your backend
const API = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your backend URL
});

export const fetchCocktails = async (index = 0, limit = 10, query = "") => {
  const response = await API.get("/search", {
    params: { index, limit, query },
  });
  return response.data;
};

export const fetchCocktailDetails = async (id) => {
  const response = await API.get("/detail", { params: { id } });
  return response.data;
};
