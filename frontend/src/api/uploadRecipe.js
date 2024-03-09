import axios from "axios";

export const uploadRecipe = axios.create({
  baseURL: "http://localhost:5000/api/recipes",
});